import 'dart:convert';
import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:checked_mobile_application/module/loading.dart';
import 'package:checked_mobile_application/screens/consumerlogin.dart';
import 'package:checked_mobile_application/screens/home.dart';
import 'package:checked_mobile_application/screens/newsfeed.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:checked_mobile_application/services/user_services.dart';
import 'package:http/http.dart';


class SignIn extends StatefulWidget {

  final Function toggleView;
  SignIn({this.toggleView});

  @override
  _SignInState createState() => _SignInState();
}

class _SignInState extends State<SignIn> {

  UserServices get service => GetIt.I<UserServices>();

  APIResponse _apiresponse;

  bool _isloading = false;

  String errorMessage = '';

  @override
  void initState() {
    super.initState();
  }

  final _formKey = GlobalKey<FormState>();
  String _email = "";
  String _password = "";
  bool _isGuardian;
  int _userId;
  @override
  Widget build(BuildContext context) {
    return _isloading ? Loading() : Scaffold(
      body: SingleChildScrollView(
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
                padding: const EdgeInsets.symmetric(horizontal: 66.0),
                child: Container(
                  height: 500,
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
                            onChanged: (String val) => setState(() => _email = val),
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
                                return "Enter your Password";
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
                        SizedBox(height: 20,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Text(errorMessage, style: 
                              TextStyle(
                                color: Colors.red,
                                fontWeight: FontWeight.w600,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 20.0,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            GestureDetector(
                              onTap: () async {
                                if(_formKey.currentState.validate()){
                                  setState(() => _isloading = true);
                                  _apiresponse = await service.postLogIn(_email, _password);
                                  if(!_apiresponse.error){
                                    print(_apiresponse.data["userId"]);
                                    _isGuardian = _apiresponse.data["isGuardian"];
                                    _userId =_apiresponse.data["userId"];
                                    var _membersList = await service.getMembersByUser(_userId.toString());
                                    //print(_membersList.data[0]["memberId"]);
                                    var memberIds = _membersList.data.map((member)=> member["memberId"]).toList();
                                    print(memberIds);
                                    setState(() {
                                      if(_isGuardian){
                                        _isloading = false;
                                        errorMessage = _apiresponse.errorMessage;
                                        
                                        Navigator.push(context,MaterialPageRoute(builder: (context) => NewsFeed(userId: _userId,membersIds: memberIds,)));
                                      }else{
                                        _isloading = false;
                                        errorMessage = _apiresponse.errorMessage;
                                        Navigator.push(context,MaterialPageRoute(builder: (context) => Home(userId:_userId)));
                                      }
                                    });
                                  } else if(_apiresponse.error){
                                    setState(() {
                                      _isloading = false;
                                      errorMessage = _apiresponse.errorMessage;
                                    });
                                  }
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
                        SizedBox(height: 40.0),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Text("Don't have an account?",style: 
                              TextStyle(
                                fontSize: 12,
                              ),
                            ),
                            SizedBox(width: 2.0,),
                            GestureDetector(
                              onTap: (){
                                widget.toggleView();
                              },
                              child: Text("Register now",style: 
                                TextStyle(
                                  fontSize: 12,
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