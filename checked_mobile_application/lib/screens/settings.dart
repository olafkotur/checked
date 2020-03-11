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
      ),
      body: Center(
        child: Container(
          child: Center(
            child: Column(
              children: <Widget>[
                Row(
                  children: <Widget>[
                    
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}