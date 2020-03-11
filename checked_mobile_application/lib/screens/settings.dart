import 'package:flutter/material.dart';

class Settings extends StatefulWidget {
  @override
  _SettingsState createState() => _SettingsState();
}

class _SettingsState extends State<Settings> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Settings",style: 
          TextStyle(
            color: Colors.white,
          ),
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(
              Icons.update,
              color: Colors.white,
            ),
            onPressed: () async {
              // update settings endpoint
            },
          ),
        ],
      ),
      body: Column(children: <Widget>[
        Row(
          children: [
            Expanded(
              child: Text("App Icon"),
            ),
            Container(
              color: Colors.orange,
              margin: EdgeInsets.all(25.0),
              child: FlutterLogo(
                size: 60.0,
              ),
            ),
            Container(
              color: Colors.blue,
              margin: EdgeInsets.all(25.0),
              child: FlutterLogo(
                size: 60.0,
              ),
            ),
            Container(
              color: Colors.purple,
              margin: EdgeInsets.all(25.0),
              child: FlutterLogo(
                size: 60.0,
              ),
            ),
          ]
        ),
        Row(
          children: [
            Expanded(
              child: Text("Logo Image"),
            ),
          ]
        ),
        Row(
          children: [
            Expanded(
              child: Text("Dark mode"),
            ),
          ]
        )
      ],)
    );
  }
}