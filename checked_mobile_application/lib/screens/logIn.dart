import 'dart:convert';
import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:checked_mobile_application/module/loading.dart';
import 'package:checked_mobile_application/screens/consumerlogin.dart';
import 'package:checked_mobile_application/screens/home.dart';
import 'package:checked_mobile_application/screens/newsfeed.dart';
import 'package:checked_mobile_application/screens/userNavigation.dart';
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
  String _email;
  String _password;
  String _companyName;
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
                                    _isGuardian = _apiresponse.data["isGuardian"];
                                    _userId =_apiresponse.data["userId"];
                                    _companyName = _apiresponse.data["companyName"];
                                    var _membersList = await service.getMembersByUser(_userId.toString());
                                    var memberIds = _membersList.data.map((member)=> member["memberId"]).toList();
                                    setState(() {
                                      if(!_isGuardian){
                                        _isloading = false;
                                        errorMessage = _apiresponse.errorMessage;
                                        Navigator.push(context,MaterialPageRoute(builder: (context) => UserNavigation(userId: _userId,membersIds: memberIds,companyName: _companyName,)));
                                        showPrivacyPolicy(context);
                                      } else {
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

  void showPrivacyPolicy(BuildContext context) {
    Dialog fancyDialog = Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20.0),
        ),
        height: 800.0,
        width: 700.0,
        child: Stack(
          children: <Widget>[
            Container(
              width: double.infinity,
              height: 300,
              decoration: BoxDecoration(
                color: Colors.grey[100],
                borderRadius: BorderRadius.circular(12.0),
              ),
            ),
            Container(
              width: double.infinity,
              height: 50,
              alignment: Alignment.bottomCenter,
              decoration: BoxDecoration(
                color: Colors.orange[300],
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(12),
                  topRight: Radius.circular(12),
                ),
              ),
              child: Align(
                alignment: Alignment.center,
                child: Text(
                  "Data Privacy Policy!",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.w600),
                ),
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: InkWell(
                onTap: () {
                  Navigator.pop(context);
                },
                child: Container(
                  width: double.infinity,
                  height: 50,
                  decoration: BoxDecoration(
                    color: Colors.green[300],
                    borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(12),
                      bottomRight: Radius.circular(12),
                    ),
                  ),
                  child: Align(
                    alignment: Alignment.center,
                    child: Text(
                      "Sounds good!",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
              ),
            ),
            Align(
              alignment: Alignment(-0.75, -0.35),
              child: Text("Checked is committed to ensuring that any personal data we hold about you and your child is protected in accordance with data protection laws and in line with your expectations. This privacy notice explains what personal data we collect, why we collect it, how we use it and how we protect it.We collect and use pupil information under: Education Act 1996 Data protection Act 1998 EU General Data Protection (GDPR) Article 6 and Article 9 from 25 May 2018. Article 6 says that to be lawful, data processing must comply with one of the following:Consent has been given to process personal data for a specific purpose It is necessary for a contract with an individual There is a legal obligation It is necessary for vital interests (eg to save a life) It is necessary for legitimate interests It is necessary for a public task which is in the public interest or has a clear basis in law. Article 9 deals with Special Category Data (racial/ethnic origin,political opinion, religious or philosophical beliefs, trade union membership, genetic data, biometric data, health, sex life, sexual orientation) . Lawful processing of Special Category Data must comply with one Article 6 condition and one of the following: Consent has been given to process the data for a specific purpose It is necessary for vital interests There is an obligation under employment, collective agreement, social security or social protection law It is processed by a foundation, association or any other not-for-profit body with a political, philosophical, religious or trade union aim It is already made public by the data subject. It is used for the establishment, exercise or defence of legal claims It is necessary for reasons of substantial public interest It is necessary for health reasons.")
            ),
            Align(
              // These values are based on trial & error method
              alignment: Alignment(1.05, -1.05),
              child: InkWell(
                onTap: () {
                  Navigator.pop(context);
                },
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    Icons.close,
                    color: Colors.black,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
    showDialog(
        context: context, builder: (BuildContext context) => fancyDialog);
  }  
}