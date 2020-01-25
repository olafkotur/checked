import 'package:flutter/material.dart';

class SignIn extends StatefulWidget {
  @override
  _SignInState createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  final _formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: SafeArea(
          top: true,
          bottom: false,
          child: Column(
            children: <Widget>[
              SizedBox(height:20.0),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Container(
                    child: Image(
                      image: AssetImage("assets/checkedLogo.jpg"),
                      height: 175.0,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 15.0,),
              Text("Checked", 
                style: TextStyle(
                  fontSize: 50.0,
                  fontWeight: FontWeight.w500,
                  color: Colors.grey[600],
                ),
              ),
              SizedBox(height: 40.0,),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 70.0),
                child: Container(
                  height: 350,
                  constraints: BoxConstraints(
                    minWidth: MediaQuery.of(context).size.width,
                  ),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text("Email Address",style: 
                          TextStyle(
                            fontSize: 17.0,
                            fontWeight: FontWeight.w300
                          ),
                        ),
                        SizedBox(height: 4,),
                        Container(
                          height: 40.0,
                          child: TextField(
                            decoration: InputDecoration(
                              contentPadding: EdgeInsets.all(5),
                              border: OutlineInputBorder(
                                borderSide: BorderSide(
                                 color: Colors.grey,
                                 width: 2.0
                                ),
                                borderRadius: BorderRadius.circular(5)
                              )
                            ),
                          ),
                        ),
                        SizedBox(height: 30.0,),
                        Text("Password",style: 
                          TextStyle(
                            fontSize: 17.0,
                            fontWeight: FontWeight.w300
                          ),
                        ),
                        SizedBox(height: 4,),
                        Container(
                          height: 40.0,
                          child: TextField(
                            decoration: InputDecoration(
                              contentPadding: EdgeInsets.all(5),
                              border: OutlineInputBorder(
                                borderSide: BorderSide(
                                 color: Colors.grey,
                                 width: 2.0
                                ),
                                borderRadius: BorderRadius.circular(5)
                              )
                            ),
                          ),
                        ),
                        SizedBox(height: 4,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: <Widget>[
                            GestureDetector(
                              onTap: () {},
                              child: Text("Forgot password?",
                                style: TextStyle(
                                  fontWeight: FontWeight.w300
                                ),
                              )
                            )
                          ],
                        ),
                        SizedBox(height: 40.0,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            GestureDetector(
                              onTap: (){print("Login animation // loading screen");},
                              child: Container(
                                height: 50,
                                width: 150,
                                child: Center(
                                  child: Text("Log In",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 23.0,
                                    ),
                                  )
                                ),
                                decoration: BoxDecoration(
                                  color: Colors.orange[600],
                                  border: Border.all(
                                    width: 1
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 20.0),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Text("Don't have an account?"),
                            SizedBox(width: 2.0,),
                            GestureDetector(
                              onTap: (){},
                              child: Text("Register now",style: 
                                TextStyle(
                                  decoration: TextDecoration.underline,
                                ),
                              ),
                            )
                          ],
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}