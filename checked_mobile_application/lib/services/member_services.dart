import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';


class MembersServices{

  static const API = 'http://checked-api.herokuapp.com/api';
  static const headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  };

  static const createMemberEndpoint = "/members/create";
  static const updateSettingsEndpoint = "/settings/update/";

  Future<APIResponse> postCreateMember(String _userId, String _firstName, String _lastName) async {
    String _body = 'userId=$_userId&firstName=$_firstName&companyName=$_lastName';

    dynamic jsonData;
    
    return http.post(API+createMemberEndpoint,body: _body ,headers: headers)
      .then((data){
        var jsonData = json.decode(data.body);
        if(jsonData["code"] == 201){
          return APIResponse(data:jsonData["result"], error: false);
        }else if(jsonData["code"] == 400){
          return APIResponse(data:"",errorMessage: jsonData["message"], error: true);
        }
      }).catchError((e) => APIResponse(data: "",errorMessage: jsonData["message"], error: true));
  }



}

  