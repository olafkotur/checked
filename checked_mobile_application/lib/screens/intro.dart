import 'package:flutter/material.dart';

class Intro extends StatefulWidget {
  @override
  _IntroState createState() => _IntroState();
}

class _IntroState extends State<Intro> {
  @override
  Widget build(BuildContext context) {
return new Scaffold(
      appBar: new AppBar(
        backgroundColor: Colors.pink,
        title: new Text("Intro"),
      ),
    );
  }
}