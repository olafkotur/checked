import 'package:checked_mobile_application/module/zone.dart';
import 'package:checked_mobile_application/services/zone_services.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'dart:async' show Future;
import 'dart:convert';

class Home extends StatefulWidget {

  int userId;

  Home({this.userId});

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  Color deletedColor = Colors.red[200];
  Color deletedColorBackground = Colors.red[400];

  ZoneServices get service => GetIt.I<ZoneServices>();

  // Future loadZone() async {
  //   String jsonString = await service.getZonesByUser());
  //   final jsonResponse = json.decode(jsonString);
  //   Student student = new Student.fromJson(jsonResponse);
  //   print(student.studentScores);
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SizedBox(
          width: 100.0,
          height: 50.0,
          child: Container(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: Image.asset('assets/checkedLogo.jpg'),
            )
          ),
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(
              Icons.edit,
              color: Colors.black,
            ),
            onPressed: () {
              service.getZonesByUser();
            },
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          children: <Widget>[
            DrawerHeader(
              child: Text(""),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.bottomLeft,
                  end: Alignment.topRight,
                  colors: <Color>[ Colors.orange[600], Colors.orangeAccent]
                )
              ),
            ),
            InkWell(
              onTap: (){},
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal:8.0),
                        child: Icon(Icons.wb_sunny),
                      ),
                      Text("Temperature",style: 
                        TextStyle(
                          fontWeight: FontWeight.w600
                        )
                      ,),
                    ],
                  ),
                  Icon(Icons.arrow_right),
                ],
              ),
            ),
            SizedBox(height: 30,),
            InkWell(
              onTap: (){},
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal:8.0),
                        child: Icon(Icons.directions_run),
                      ),
                      Text("Activity",style: 
                        TextStyle(
                          fontWeight: FontWeight.w600
                        )
                      ,),
                    ],
                  ),
                  Icon(Icons.arrow_right),
                ],
              ),
            ),
            SizedBox(height: 30,),
            InkWell(
              onTap: (){},
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal:8.0),
                        child: Icon(Icons.map),
                      ),
                      Text("Location",style: 
                        TextStyle(
                          fontWeight: FontWeight.w600
                        )
                      ,),
                    ],
                  ),
                  Icon(Icons.arrow_right),
                ],
              ),
            ),
            SizedBox(height: 30,),
            InkWell(
              onTap: (){
                setState(() => widget.userId = 0);
                Navigator.pop(context);
                Navigator.pop(context);
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal:8.0),
                        child: Icon(Icons.exit_to_app),
                      ),
                      Text("SignOut",style: 
                        TextStyle(
                          fontWeight: FontWeight.w600
                        )
                      ,),
                    ],
                  ),
                  Icon(Icons.arrow_right),
                ],
              ),
            )
          ],
        ),
      ),
      body: Container(
        constraints: BoxConstraints.expand(),
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/grid-bg.jpg"),
            fit: BoxFit.cover,
            colorFilter: new ColorFilter.mode(Colors.black.withOpacity(0.2), BlendMode.dstATop),
          ),
        ),
        child: Stack(
          children: <Widget>[
            Zone(1, "Ball", 120, 120, 0, 0, Colors.amber),
            //DragBox(Offset(100.0, 0.0), 'Zone 2', Colors.orange[600]),
            //DragBox(Offset(200.0, 0.0), 'Zone 3', Colors.orange[700]),
            Positioned(
              left: 0.0,
              bottom: 0.0,
              child: DragTarget(
                // onAccept: (Color color) {
                //   // Add http DELETE request here
                // },
                onLeave: (Color) {
                  deletedColor = Colors.red[200];
                },
                builder: (
                  BuildContext context,
                  List<dynamic> accepted,
                  List<dynamic> rejected,
                ) {
                  return Container(
                    width: 300.0,
                    height: 120.0,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Padding(
                          padding: const EdgeInsets.only(left: 15.0),
                          child: IconButton(
                            onPressed: () {},
                            icon: Icon(
                              Icons.delete,
                              color: accepted.isEmpty ? deletedColor : Colors.red[400],
                              size: 60.0,
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: Colors.green,
        tooltip: 'Add a new zone',
        child: Icon(
          Icons.add,
          color: Colors.white,
        ),
      ),
    );
  }
}
