import 'dart:async';

import 'package:flutter/material.dart';

class Landing extends StatefulWidget {
  @override
  _LandingState createState() => _LandingState();
}

class _LandingState extends State<Landing> {
  @override
  initState() {
    super.initState();
    new Timer(const Duration(seconds: 5), moveToNextScreen);
  }

  @override
  Widget build(BuildContext context){
    return Scaffold(
      body: Container(
        constraints: BoxConstraints.expand(),
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/landing-bg.png"),
            fit: BoxFit.cover,
          ),
        ),
        child: SafeArea(
          top: true,
          bottom: false,
          child: Column(
            children: <Widget>[
              SizedBox(height:220.0),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Container(
                    child: Image(
                      image: AssetImage("assets/checkedLogo.jpg"),
                      height: 200.0
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: 15.0,
              ),
              Text("Checked",
                style: TextStyle(
                  fontSize: 52.0,
                  fontWeight: FontWeight.w500,
                  color: Colors.grey[700],
                ),
              ),
              SizedBox(
                height: 5.0,
              ),
              Text("Keep track of your space",
                style: TextStyle(
                  fontSize: 16.0,
                  fontWeight: FontWeight.normal,
                  color: Colors.grey[600],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}