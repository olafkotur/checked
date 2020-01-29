import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class UserServices{

  static const API = 'http://checked-api.herokuapp.com/api';
  static const headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  };

  static const signUpEndpoint = "/users/create";
  static const signInEndpoint = "/users/login";

  // signup a user and return a response
  Future<APIResponse> postSignup(String _email, String _password, String _company) async {
    String _body = 'email=$_email&password=$_password&companyName=$_company';

    dynamic jsonData;
    
    return http.post(API+signUpEndpoint,body: _body ,headers: headers)
      .then((data){
        var jsonData = json.decode(data.body);
        print(jsonData);
        if(jsonData["code"] == 201){
          return APIResponse(data:jsonData["result"], error: false);
        }else if(jsonData["code"] == 400){
          return APIResponse(data:"",errorMessage: jsonData["message"], error: true);
        }
      }).catchError((e) => APIResponse(data: "",errorMessage: jsonData["message"], error: true));

  }

  // signin a user and return a response
  Future<APIResponse> postLogIn(String _email, String _password) async {
  String _body = 'email=$_email&password=$_password';
  dynamic jsonData;
  
  return http.post(API+signInEndpoint,body: _body ,headers: headers)
    .then((data){
      var jsonData = json.decode(data.body);
      if(jsonData["code"] == 200){
        return APIResponse(data:jsonData["result"]);
      }else if(jsonData["code"] == 401){
          return APIResponse(data:"",errorMessage: jsonData["message"], error: true);
        }
    }).catchError((e) => APIResponse(data: "",errorMessage: jsonData["message"], error: true));
  }
}

  