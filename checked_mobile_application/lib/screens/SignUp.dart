import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';


class SignUp extends StatefulWidget {
  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final _formKey = GlobalKey<FormState>();

  var url = 'checked-api.herokuapp.com/api/users/create';

  String _email = "";
  String _password = "";
  String _company = "";


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: SafeArea(
          top: true,
          bottom: false,
          child: Column(
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Container(
                    child: Image(
                      image: AssetImage("assets/checkedLogo.jpg"),
                      height: 150.0,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 10.0,),
              Text("Checked", 
                style: TextStyle(
                  fontSize: 35.0,
                  fontWeight: FontWeight.w500,
                  color: Colors.grey[600],
                ),
              ),
              SizedBox(height: 25.0,),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 60.0),
                child: Container(
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
                          //height: 40.0,
                          child: TextFormField(
                            onChanged: (String val) => setState(() => _email = val),
                            validator: (value){
                              if(value.isEmpty){
                                return "Enter your Email";
                              }
                              String p = "[a-zA-Z0-9\+\.\_\%\-\+]{1,256}" +
                                "\\@" +
                                "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
                                "(" +
                                "\\." +
                                "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
                                ")+";
                              RegExp regExp = new RegExp(p);
                              if (regExp.hasMatch(value)) {
                                return null;
                              }
                              return 'Email is not valid';
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
                        Text("Confirm Email Address",style: 
                          TextStyle(
                            fontSize: 17.0,
                            fontWeight: FontWeight.w300
                          ),
                        ),
                        SizedBox(height: 4,),
                        Container(
                          //height: 40.0,
                          child: TextFormField(
                            validator: (value){
                              if(value.isEmpty){
                                return "Enter your email";
                              }
                              String p = "[a-zA-Z0-9\+\.\_\%\-\+]{1,256}" +
                                "\\@" +
                                "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
                                "(" +
                                "\\." +
                                "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
                                ")+";
                              RegExp regExp = new RegExp(p);
                              if (regExp.hasMatch(value)) {
                                return null;
                              }
                              return 'Email is not valid';
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
                        SizedBox(height: 30,),
                        Text("Password",style: 
                          TextStyle(
                            fontSize: 17.0,
                            fontWeight: FontWeight.w300,
                          ),
                        ),
                        SizedBox(height: 4,),
                        Container(
                          child: TextFormField(
                            onChanged: (String val) => setState(() => _password = val),
                            obscureText: true,
                            validator: (value){
                              if(value.isEmpty){
                                return "Enter your password";
                              }else if(value.length < 8){
                                return "Password must be at less 8 characters long";
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
                        Text("Confirm Password",style: 
                          TextStyle(
                            fontSize: 17.0,
                            fontWeight: FontWeight.w300
                          ),
                        ),
                        SizedBox(height: 4,),
                        Container(
                          child: TextFormField(
                            validator: (value){
                              if(value.isEmpty){
                                return "Enter your password";
                              }else if(value.length < 8){
                                return "Password must be at less 8 characters long";
                              }
                            },
                            obscureText: true,
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
                        Text("Pre-school name",style: 
                          TextStyle(
                            fontSize: 17.0,
                            fontWeight: FontWeight.w300
                          ),
                        ),
                        SizedBox(height: 4,),
                        Container(
                          child: TextFormField(
                            onChanged: (String val) => setState(() => _company = val),
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
                        SizedBox(height: 35.0,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            GestureDetector(
                              onTap: () async {
                                _formKey.currentState.validate();
                                _formKey.currentState.save();
                                var client = http.Client();
                                String _url = "http://checked-api.herokuapp.com/api/users/create";
                                String _body = 'email=$_email&password=$_password&companyName=$_company';
                                print(_body);
                                final encoding = Encoding.getByName('utf-8');

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
                                  child: Text("Sign up",
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
                        SizedBox(height:20.0),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Text("Already have an account?"),
                            SizedBox(width: 2.0,),
                            GestureDetector(
                              onTap: (){
                                print(_email);
                              },
                              child: Text("Log in here",style: 
                                TextStyle(
                                  decoration: TextDecoration.underline,
                                ),
                              ),
                            )
                          ],
                        ),
                        SizedBox(height: 20.0,)
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