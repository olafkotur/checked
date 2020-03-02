import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class LiveData{
  static const API_URL = 'http://checked-api.herokuapp.com/api/';
  static const headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  };
  static const ALL_LIVE_DATA = 'live/temperature';
  static const ALL_LIVE_DATA_Zone = 'live/temperature/';

  // Get all zones by user
  Future<APIResponse> getTemperature() async {
    dynamic jsonData;

    return http.get(API_URL + ALL_LIVE_DATA)
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

  Future<APIResponse> getTemperatureByZone(String zone) async {
    dynamic jsonData;

    return http.get(API_URL + ALL_LIVE_DATA_Zone + zone)
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
}