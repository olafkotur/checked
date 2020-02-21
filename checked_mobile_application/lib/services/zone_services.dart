import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// All zones by user - checked-api.herokuapp.com/api/zones/users/1 - GET
// Add zone - checked-api.herokuapp.com/api/zones/create - POST
// Update zone - checked-api.herokuapp.com/api/zones/update/1 - POST
// Delete zone - checked-api.herokuapp.com/api/zones/delete/1 - DELETE

class ZoneServices {
  static const API_URL = 'http://checked-api.herokuapp.com/api/';
  static const headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  };
  static const ZONES_BY_USER_ENDPOINT = 'zones/users/';
  static const ADD_ZONE_ENDPOINT = "zones/create";
  static const TEMPERATURE_BY_ZONE_ENDPOINT = 'live/temperature/zones/';


  // Get all zones by user
  Future<APIResponse> getZonesByUser(int _userId) async {
    dynamic jsonData;

    return http.get(API_URL + ZONES_BY_USER_ENDPOINT + _userId.toString())
      .then((data){
        var jsonData = json.decode(data.body);

        if (jsonData["code"] == 200) {
          // If server returns an OK response, parse the JSON.
          return APIResponse(data: jsonData["result"], error: false);
        } else  if (jsonData["code"] == 400) {
          return APIResponse(data:"",errorMessage: jsonData["message"], error: true);
        }
      }).catchError((e) => APIResponse(data: "",errorMessage: jsonData["message"], error: true));
  }

  // Get temperature live by zone
  Future<APIResponse> getTemperatureByZone(int _zoneId) async {
    dynamic jsonData;

    return http.get(API_URL + TEMPERATURE_BY_ZONE_ENDPOINT + _zoneId.toString())
      .then((data){
        var jsonData = json.decode(data.body);

        if (jsonData["code"] == 200) {
          // If server returns an OK response, parse the JSON.
          return APIResponse(data: jsonData["result"], error: false);
        } else  if (jsonData["code"] == 400) {
          return APIResponse(data:"",errorMessage: jsonData["message"], error: true);
        }
      }).catchError((e) => APIResponse(data: "",errorMessage: jsonData["message"], error: true));
  }

  // Add zone
  Future<APIResponse> createZone(int userId, String name, double width, double height, double xValue, double yValue, Color color) async {
  String _body = 'userId=$userId&name=$name&width=$width&height=$height&xValue=$xValue&yValue=$yValue&color=$color';
  dynamic jsonData;
  
  return http.post(API_URL + ADD_ZONE_ENDPOINT, body: _body, headers: headers)
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
