import 'package:checked_mobile_application/screens/logIn.dart';
import 'package:checked_mobile_application/screens/signUp.dart';
import 'package:flutter/material.dart';

class Authenticate extends StatefulWidget {
  @override
  _AuthenticateState createState() => _AuthenticateState();
}

class _AuthenticateState extends State<Authenticate> {

  bool ShowSignIn = true;

  // toggle method
  void toggleView(){
    setState(() => ShowSignIn = !ShowSignIn);
  }

  @override
  Widget build(BuildContext context) {
    return ShowSignIn ? SignIn(toggleView: toggleView) : SignUp(toggleView: toggleView);
  }
}