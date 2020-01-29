import 'package:flutter/material.dart';

class Home extends StatefulWidget {

  int userId;

  Home({this.userId});

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  Color deletedColor = Colors.red[200];
  Color deletedColorBackground = Colors.red[400];

  // This is going to be data retrieved from the api - TODP
  final List<String> _listViewData = [
    "A List View with many Text - Here's one!",
    "A List View with many Text - Here's another!",
    "A List View with many Text - Here's more!",
    "A List View with many Text - Here's more!",
    "A List View with many Text - Here's more more!",
  ];

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
              // do something
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
            DragBox(Offset(0.0, 0.0), 'Zone 1', Colors.orange[400]),
            DragBox(Offset(100.0, 0.0), 'Zone 2', Colors.orange[600]),
            DragBox(Offset(200.0, 0.0), 'Zone 3', Colors.orange[700]),
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
  final String label;
  final Color itemColor;

  DragBox(this.initPos, this.label, this.itemColor);

  @override
  _DragBoxState createState() => _DragBoxState();
}

class _DragBoxState extends State<DragBox> {
  Offset position = Offset(0.0, 0.0);

  @override
  void initState() {
    super.initState();
    position = widget.initPos;
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: position.dx,
      top: position.dy,
      child: Draggable(
        data: widget.itemColor,
        child: Container(
          width: 100.0,
          height: 100.0,
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
                      fontSize: 15.0,
                      
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