import 'package:checked_mobile_application/module/api_respose.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// Get notifications by user - checked-api.herokuapp.com/api/notifications/users/1

class NotificationServices {
  static const API_URL = 'http://checked-api.herokuapp.com/api/';
  static const headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  };
  static const NOTIFICATIONS_BY_USER_ENDPOINT = 'notifications/users/';

  // Get all zones by user
  Future<APIResponse> getNotificationsByUser(int _userId) async {
    dynamic jsonData;

    return http.get(API_URL + NOTIFICATIONS_BY_USER_ENDPOINT + _userId.toString())
      .then((data){
        var jsonData = json.decode(data.body);

        if (jsonData["code"] == 200) {
          // If server returns an OK response, parse the JSON.
          return APIResponse(data: jsonData["result"]);
        } else  if (jsonData["code"] == 400) {
          return APIResponse(data:"",errorMessage: jsonData["message"], error: true);
        }
      }).catchError((e) => APIResponse(data: "",errorMessage: jsonData["message"], error: true));
  }
}
