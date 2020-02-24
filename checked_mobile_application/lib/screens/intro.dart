import 'package:checked_mobile_application/screens/authenticate.dart';
import 'package:flutter/material.dart';

class Intro extends StatefulWidget {
  @override
  _IntroState createState() => _IntroState();
}

class _IntroState extends State<Intro> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        body: SingleChildScrollView(
          child: Container(
          child: SafeArea(
            top: true,
            bottom: false,
            child: Column(
              children: <Widget>[
                SizedBox(height:140.0),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Container(
                      child: Image(
                        image: AssetImage("assets/monitor.png"),
                        height: 200.0
                      ),
                    ),
                  ],
                ),
                SizedBox(
                  height: 30.0,
                ),
                Text("Monitor your children safely",
                  style: TextStyle(
                    fontSize: 30.0,
                    fontWeight: FontWeight.w300,
                    color: Colors.orange[800],
                  ),
                ),
                SizedBox(
                  height: 50.0,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    SizedBox(width: 10),
                    RaisedButton(
                      shape: new RoundedRectangleBorder(
                          borderRadius: new BorderRadius.circular(18.0),
                          side: BorderSide(color: Colors.red)),
                      onPressed: () {
                        Navigator.of(context).pushReplacement(new PageRouteBuilder(
                            maintainState: true,
                            opaque: true,
                            pageBuilder: (context, _, __) => new Authenticate(),
                            transitionDuration: const Duration(seconds: 0),
                            transitionsBuilder: (context, anim1, anim2, child) {
                              return new FadeTransition(
                                child: child,
                                opacity: anim1,
                              );
                            }));
                      },
                      color: Colors.orange,
                      textColor: Colors.white,
                      child: Text("Get Started!".toUpperCase(),
                          style: TextStyle(fontSize: 20)),
                    ),
                  ],   
                ),
                SizedBox(
                  height: 200.0,
                ),
                Text("Already have an account? Log in here",
                  style: TextStyle(
                    fontSize: 15.0,
                    fontWeight: FontWeight.w300,
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
          ),
      ),
        ),
    );
  } 
}