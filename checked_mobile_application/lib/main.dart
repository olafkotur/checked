import 'package:checked_mobile_application/screens/SignUp.dart';
import 'package:checked_mobile_application/screens/landing.dart';
import 'package:checked_mobile_application/screens/logIn.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Checked',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Colors.orange,
        accentColor: Colors.amber,
        accentColorBrightness: Brightness.light
      ),
      home: SignUp(),
    );
  }
}