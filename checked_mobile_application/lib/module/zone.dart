import 'package:flutter/material.dart';

class Zone extends StatefulWidget {
  //final int zoneId;
  final int userId;
  final String name;
  final double width;
  final double height;
  final double xValue;
  final double yValue;
  final Color color;

  Zone(/*this.zoneId,*/ this.userId, this.name, this.width, this.height, this.xValue, this.yValue, this.color);

  factory Zone.fromJson(Map<String, dynamic> json) {
    return Zone(
      //zoneId: json['zoneId'],
      json['result[0].userId'],
      json['name'],
      json['width'],
      json['height'],
      json['xValue'],
      json['yValue'],
      json['color']
    );
  }

  @override
  _ZoneState createState() => _ZoneState();
}

class _ZoneState extends State<Zone> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: widget.xValue,
      top: widget.yValue,
      child: Draggable(
        data: widget.color,
        child: Container(
          width: widget.width,
          height: widget.height,
          color: widget.color,
          child: Column(
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    widget.name,
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
        // onDraggableCanceled: (velocity, offset) {
        //   setState(() {
        //     position = offset;
        //   });
        // },
        feedback: Container(
          width: 120.0,
          height: 120.0,
          color: widget.color.withOpacity(0.5),
          child: Center(
            child: Text(
              widget.name,
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