import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:checked_mobile_application/module/zone.dart';
import 'package:checked_mobile_application/services/zone_services.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

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
  APIResponse _apiresponse;

  _asyncMethod() async {
    _apiresponse = await service.getZonesByUser(widget.userId);
    print(_apiresponse.data[1]);
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_){
      _asyncMethod();
    });
  }
  
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
              Icons.refresh,
              color: Colors.black,
            ),
            onPressed: () async {
              _apiresponse = await service.getZonesByUser(widget.userId);
              for(dynamic _ in _apiresponse.data) DragBox(Offset(0.0, 0.0), 100.0, 100.0, _apiresponse.data[0]["name"], Colors.orange[400]);
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
              onTap: (){

              },
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
            for(dynamic _ in _apiresponse.data) DragBox(Offset(0.0, 0.0), 100.0, 100.0, _apiresponse.data[0]["name"], Colors.orange[400]),
            //Zone(widget.userId, "Ball", 100, 100, 0, 0, Colors.amber),
            //DragBox(Offset(0.0, 0.0), _apiresponse.data[1]["name"], Colors.orange[400]),
            //DragBox(Offset(100.0, 0.0), _apiresponse.data[2]["name"], Colors.orange[600]),
            Positioned(
              left: 0.0,
              bottom: 0.0,
              child: DragTarget(
                // onAccept: (Color color) {
                //   deletedColor = Colors.red[400];
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
                            onPressed: (){},
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
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){},
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

class DragBox extends StatefulWidget {
  final Offset initPos;
  final double width;
  final double height;
  final String label;
  final Color itemColor;

  DragBox(this.initPos, this.width, this.height, this.label, this.itemColor);

  @override
  _DragBoxState createState() => _DragBoxState();
}

class _DragBoxState extends State<DragBox> {
  Offset position = Offset(0.0, 0.0);

  @override
  void initState() {
    super.initState();
    position = widget.initPos;
    Future.delayed(const Duration(milliseconds: 500), () {
      setState(() {
        // Here you can write your code for open new view
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: position.dx,
      top: position.dy,
      child: Draggable(
        data: widget.itemColor,
        child: Container(
          width: widget.width,
          height: widget.height,
          color: widget.itemColor,
          child: Column(
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    widget.label,
                    style: TextStyle(
                      color: Colors.white,
                      decoration: TextDecoration.none,
                      fontSize: 15.0
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        onDraggableCanceled: (velocity, offset) {
          setState(() {
            position = offset;
          });
        },
        feedback: Container(
          width: 120.0,
          height: 120.0,
          color: widget.itemColor.withOpacity(0.5),
          child: Center(
            child: Text(
              widget.label,
              style: TextStyle(
                color: Colors.white,
                decoration: TextDecoration.none,
                fontSize: 18.0,
              ),
            ),
          ),
        ),
      )
    );
  }
}
