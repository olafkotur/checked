import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:checked_mobile_application/services/user_services.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class History extends StatefulWidget {
  
  int userId;

  History({this.userId});

  @override
  _HistoryState createState() => _HistoryState();
}

class _HistoryState extends State<History> {

  UserServices get service => GetIt.I<UserServices>();

  APIResponse _apiresponse;

  _getHistoryAsync() async {
    _apiresponse = await service.getHistory(widget.userId);
    return _apiresponse;
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("History",style: 
          TextStyle(
            color: Colors.white,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: Container(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children:<Widget>[
                    Text("Showing filtered results",style: 
                      TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 15.3,
                      ),
                    ),
                    IconButton(icon: Icon(Icons.filter_list), onPressed:(){})
                  ]
                ),
              ),
            ),
            Container(
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height*0.8,
              child: FutureBuilder(
                future: _getHistoryAsync(),
                builder: (BuildContext context, AsyncSnapshot snapshot){
                  switch (snapshot.connectionState) {
                    case ConnectionState.none:
                      return Text("Doing nothing");
                    case ConnectionState.waiting:
                      return new Center(child: new CircularProgressIndicator());
                    case ConnectionState.active:
                      return Text("");
                    case ConnectionState.done:
                      if(snapshot.data.data == null){
                        return new Center(child: new CircularProgressIndicator());
                      }else {
                        print(snapshot.data.data.length);
                        return  ListView.builder(
                        itemCount: snapshot.data.data.length,
                        itemBuilder: (BuildContext context, int index){
                          var timestamp=snapshot.data.data[index]["createdAt"];
                          var date = new DateTime.fromMicrosecondsSinceEpoch(timestamp * 1000);
                          return buildfeedbacktab(context,snapshot.data.data[index]["averageTemperature"],snapshot.data.data[index]["membersActive"],snapshot.data.data[index]["zonesCount"],snapshot.data.data[index]["activitiesCount"],date);
                        },
                      );
                    }
                  }
                },
              )
            )
          ],
        ),
      ),
    );
  }

Container buildfeedbacktab(BuildContext context, int temperature, int membersActive, int zoneCount, int activitesCount, DateTime date) {
return Container(
      child: Column(
        children:<Widget>[
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            child: Row(
              children:<Widget>[
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(40),
                    color: Colors.orange[400],
                  ),
                  height: 40.0,
                  width: 40.0,
                  child: Center(
                    child: IconButton(
                      icon: Icon(Icons.edit), 
                      onPressed: (){
                        
                      },
                      color: Colors.white,
                      iconSize: 15,
                    ),
                  )
                ),
                SizedBox(width: 20.0,),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children:<Widget>[
                    Text("Entry", style: 
                      TextStyle(
                        fontWeight:FontWeight.w800,
                      ),
                    ),
                    Text(date.toString(), style: 
                      TextStyle(
                        fontWeight:FontWeight.w500,
                        color: Colors.grey[600]
                      ),
                    ),
                  ]
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20,vertical:10.0),
            child: Container(
              child: Column(
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Text("Infomation",style: TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 15
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height:10.0),
                  Row(
                    children: <Widget>[
                      Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(40),
                          color: Colors.orange[400],
                        ),
                        height: 30.0,
                        width: 30.0,
                        child: Center(
                          child: IconButton(
                            icon: Icon(Icons.wb_sunny), 
                            onPressed: (){
                              
                            },
                            color: Colors.white,
                            iconSize: 15,
                          ),
                        )
                      ),
                      SizedBox(width: 10.0,),
                      Text("average Temperature: "+temperature.toString(),style: TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 15
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height:5.0),
                  Row(
                    children: <Widget>[
                      Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(40),
                          color: Colors.orange[400],
                        ),
                        height: 30.0,
                        width: 30.0,
                        child: Center(
                          child: IconButton(
                            icon: Icon(Icons.person), 
                            onPressed: (){
                              
                            },
                            color: Colors.white,
                            iconSize: 15,
                          ),
                        )
                      ),
                      SizedBox(width: 10.0,),
                      Text("Active Members: "+membersActive.toString(),style: TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 15
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height:5),
                  Row(
                    children: <Widget>[
                      Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(40),
                          color: Colors.orange[400],
                        ),
                        height: 30.0,
                        width: 30.0,
                        child: Center(
                          child: IconButton(
                            icon: Icon(Icons.aspect_ratio), 
                            onPressed: (){
                              
                            },
                            color: Colors.white,
                            iconSize: 15,
                          ),
                        )
                      ),
                      SizedBox(width: 10.0,),
                      Text("Zones: "+zoneCount.toString(),style: TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 15
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 5,),
                  Row(
                    children: <Widget>[
                      Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(40),
                          color: Colors.orange[400],
                        ),
                        height: 30.0,
                        width: 30.0,
                        child: Center(
                          child: IconButton(
                            icon: Icon(Icons.directions_run), 
                            onPressed: (){
                              
                            },
                            color: Colors.white,
                            iconSize: 15,
                          ),
                        )
                      ),
                      SizedBox(width: 10.0,),
                      Text("activities: "+activitesCount.toString(),style: TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 15
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          // Padding(
          //   padding: const EdgeInsets.symmetric(horizontal: 20,vertical:10.0),
          //   child: Container(
          //     child: Column(
          //       children: <Widget>[
          //         Row(
          //           children: <Widget>[
          //             Text("Voice recording",style: TextStyle(
          //               fontWeight: FontWeight.w800,
          //               fontSize: 15
          //               ),
          //             ),
          //           ],
          //         ),
          //         SizedBox(height:5.0),
          //         Row(
          //           children: <Widget>[
          //             Text("I'm flying",style: TextStyle(
          //               fontWeight: FontWeight.w400,
          //               fontSize: 15
          //               ),
          //             ),
          //           ],
          //         ),
          //       ],
          //     ),
          //   ),
          // ),
        ]
      ),
    );
  }
}