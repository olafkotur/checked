import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SignIn extends StatefulWidget {
  @override
  _SignInState createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  final _formKey = GlobalKey<FormState>();
  String _email = "";
  String _password = "";
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
                  height: 370,
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
                          child: TextFormField(
                            onChanged: (String val) => setState(()=> _email = val),
                            validator: (value){
                              if(value.isEmpty){
                                return "Enter your Email";
                              }
                            },
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
                          child: TextFormField(
                            obscureText: true,
                            onChanged: (String val)=> setState(()=>_password = val),
                            validator: (value){
                              if(value.isEmpty){
                                return "Eneter your Password";
                              }
                            },
                            decoration: InputDecoration(
                              contentPadding: EdgeInsets.all(5),
                              border: OutlineInputBorder(
                                borderSide: BorderSide(
                                 color: Colors.grey,
                                 width: 2.0,
                                ),
                                borderRadius: BorderRadius.circular(5),
                              ),
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
                              onTap: () async {
                                _formKey.currentState.validate();
                                _formKey.currentState.save();
                                var client = http.Client();
                                String _url = "http://checked-api.herokuapp.com/api/users/login";
                                String _body = 'email=$_email&password=$_password';
                                try{
                                  var response = await http.post(_url, body:_body, headers:{"Content-Type":"application/x-www-form-urlencoded"});
                                  print(response.body);
                                }finally{
                                  client.close();
                                }
                              },
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
                              onTap: (){

                              },
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