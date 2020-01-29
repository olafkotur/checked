import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:checked_mobile_application/module/zone.dart';
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
  static const ZONES_BY_USER_ENDPOINT = 'zones/users/'; // Change this to the userId passed by login

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
}
