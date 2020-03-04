import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:checked_mobile_application/services/live_services.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:get_it/get_it.dart';


class AnalysisBoard extends StatefulWidget {

  
  @override
  _AnalysisBoardState createState() => _AnalysisBoardState();
}

class _AnalysisBoardState extends State<AnalysisBoard> {
  

  List<charts.Series<Entry,int>> _SeriesLineData;
  LiveData get service => GetIt.I<LiveData>();
  APIResponse _apiresponse;
  APIResponse _apiResponseByZone;
  int index =0;
  List<Entry> Linedata =[];

  _getTemperatureByzone(String zone) async {
    _apiResponseByZone = await service.getTemperatureByZone(zone);
    return _apiResponseByZone.data;
  }

  //getting the data from the backend
  _generateData()async {
    _apiresponse = await service.getTemperature();
    print(_apiresponse.data.length);
    Linedata.clear();
    for (var entry in _apiresponse.data) {
      Linedata.add(Entry(value: entry["value"],time: entry["time"],index: index));
      index++;
    }

    _SeriesLineData.add(
      charts.Series(
        id: "Temperature Reading",
        data:Linedata,
        domainFn: (Entry entry,_)=> entry.index,
        measureFn: (Entry entry,_)=> entry.value,
      ),
    );

    return _SeriesLineData;
  }
  Material makeCard(Container func, String  heading){
    return Material(
      color: Colors.white,
      elevation: 14.0,
      shadowColor: Color(0x802196F3),
      borderRadius: BorderRadius.circular(25.0),
      child: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Column(
              children: <Widget>[
                SizedBox(height: 10,),
                Text(heading,
                  style: TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w700
                  ),
                ),
                Expanded(
                  child: Container(
                   child:FutureBuilder<Widget>(
                     future: null,
                     builder: (context, snapshot) {
                       return func;
                     }
                   ),
                  ),
                )
              ],
            )
          ],
        ),
      ),
    );
  }

  @override
  void initState(){
    // TODO: implement initState
    super.initState();
    _SeriesLineData = List<charts.Series<Entry,int>>();
    _generateData();
  
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Analysis board",
          style: TextStyle(
            color: Colors.white
          ),
        ),
      ),
      body:
      Container(
        color: Colors.orange[400],
        child: StaggeredGridView.count(
          crossAxisCount: 2,
          crossAxisSpacing: 12.0,
          mainAxisSpacing: 12.0,
          padding: EdgeInsets.symmetric(vertical: 16.0,horizontal: 8.0), 
          children: <Widget>[
            makeCard(buildTemperatureChart(),"Temperature"),
            makeCard(buildContainer(),"Light Levels"),
            makeCard(buildTemperatureReading("1"),"Zone 1"),
            makeCard(buildTemperatureReading("2"),"Zone 2"),
            makeCard(buildTemperatureReading("4"),"Zone 4"),
            makeCard(buildTemperatureReading("3"),"Zone 5"),
            makeCard(buildTemperatureReading("3"),"Zone 7"),
            makeCard(buildTemperatureReading("3"),"Zone 6"),
            makeCard(buildTemperatureChart(),"Historical data"),
          ],
          staggeredTiles: [
            StaggeredTile.extent(2, 300.0),
            StaggeredTile.extent(1, 215.0),
            StaggeredTile.extent(1, 100.0),
            StaggeredTile.extent(1, 100.0),
            StaggeredTile.extent(1, 100.0),
            StaggeredTile.extent(1, 100.0),
            StaggeredTile.extent(1, 100.0),
            StaggeredTile.extent(1, 100.0),

            StaggeredTile.extent(2, 290.0),
          ],
        ),
      ),
    );
  }
  Container buildContainer(){
    return Container();
  }
  Container buildTemperatureReading(String zone){
    int temperatureNum = 0;
    return Container(
      child: Center(
        child: Column(
          children: <Widget>[
            Container(
              child:Text("Temperature",
                style: TextStyle(
                  fontSize: 15,
                  color: Colors.blue[400],
                ),
              ),
            ),
            SizedBox(height: 0.0,),
            FutureBuilder<Object>(
              future: _getTemperatureByzone(zone),
              builder: (BuildContext context, snapshot) {
              if(snapshot.connectionState == ConnectionState.done){
                var data = snapshot.data as Map;
                  return Container(
                    child:Text(data["value"].toString(),
                      style: TextStyle(
                        fontSize: 25
                      ),
                    ),
                  );
                }else {
                  return buildContainer();
                }
              },
            ),
          ],
        ),
      ),
    );
  }
  Container buildTemperatureChart() {
    return Container(
      child: Center(
        child: Column(
          children: <Widget>[
            SizedBox(height:10.0),
            Container(
              height: 200,
              width: MediaQuery.of(context).size.width-80,
              child: charts.LineChart(
                _SeriesLineData,
                defaultRenderer: charts.LineRendererConfig(
                  includeArea: true,
                  stacked: false,
                  ),
                  animate: true,
                  behaviors: [
                    charts.ChartTitle(
                      "Temperature", 
                      behaviorPosition: charts.BehaviorPosition.start,
                      titleOutsideJustification: charts.OutsideJustification.middleDrawArea,
                      layoutPreferredSize: 10
                    ),
                    charts.ChartTitle(
                      "Entries", 
                      behaviorPosition: charts.BehaviorPosition.bottom,
                      titleOutsideJustification: charts.OutsideJustification.middleDrawArea,
                      layoutPreferredSize: 5,
                    )
                  ],
                ), 
              ),
          ]
        )
      )
    );
  }
}

class Entry{
  int value;
  int time;
  int index;

  Entry({this.value,this.time,this.index});
}
