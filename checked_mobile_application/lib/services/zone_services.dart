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
  static const ZONES_BY_USER_ENDPOINT = 'zones/users/1'; // Change this to the userId passed by login

  // Get all zones by user
  Future<Zone> getZonesByUser() async {
    final response =
        await http.get(API_URL + ZONES_BY_USER_ENDPOINT);

    if (response.statusCode == 200) {
      // If server returns an OK response, parse the JSON.
      print(response.body);
      return Zone.fromJson(json.decode(response.body));
    } else {
      // If that response was not OK, throw an error.
      throw Exception('Failed to load zones');
    }
  }
}