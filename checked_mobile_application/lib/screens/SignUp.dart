import 'package:checked_mobile_application/module/loading.dart';
import 'package:checked_mobile_application/services/user_services.dart';
import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class SignUp extends StatefulWidget {

  final Function toggleView;
  SignUp({this.toggleView});

  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final _formKey = GlobalKey<FormState>();

  UserServices get service => GetIt.I<UserServices>();

  var url = 'checked-api.herokuapp.com/api/users/create';

  APIResponse _apiresponse;

  bool _isloading = false;

  String errorMessage = "";

  String _email = "";
  String _password = "";
  String _company = "";

  Future<void> signUpSuccessfulAlert(BuildContext context, SignUp goBack) {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Congratulations!'),
          content: const Text('You have successfully signed up!'),
          actions: <Widget>[
            FlatButton(
              child: Text('Ok'),
              onPressed: () { Navigator.of(context).pop(); },
            ),
          ],
        );
      },
    );
  }


  @override
  Widget build(BuildContext context) {
    return _isloading? Loading() : Scaffold(
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
                              if(value != _email){
                                return "Email doesn't match";
                              }
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
                              if(value != _password){
                                return "Password doesn't match";
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
                            validator: (value){
                              if(value.isEmpty){
                                return "Enter Company name";
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
                        SizedBox(height: 17.5,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Text(errorMessage, style: 
                              TextStyle(
                                color: Colors.red,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 17.5,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            GestureDetector(
                              onTap: () async {
                                if(_formKey.currentState.validate()){
                                  setState(() => _isloading = true);
                                  // users get 
                                  _apiresponse = await service.postSignup(_email, _password, _company);
                                  if(!_apiresponse.error){
                                    setState(() => _isloading = false);
                                    signUpSuccessfulAlert(context, widget.toggleView());
                                  }else if(_apiresponse.error){
                                    setState(() {
                                      errorMessage = _apiresponse.errorMessage;
                                      print(_apiresponse.errorMessage);
                                      _isloading = false;
                                    });
                                  }
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
                                widget.toggleView();
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