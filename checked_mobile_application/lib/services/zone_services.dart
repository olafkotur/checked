import 'package:checked_mobile_application/module/zone.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

int userId = 1; // Waiting to be passed by login

// All zones by user - checked-api.herokuapp.com/api/zones/users/1 - GET
// Add zone - checked-api.herokuapp.com/api/zones/create - POST
// Update zone - checked-api.herokuapp.com/api/zones/update/1 - POST
// Delete zone - checked-api.herokuapp.com/api/zones/delete/1 - DELETE

Future<Zone> fetchZonesByUser() async {
  final response =
      await http.get('checked-api.herokuapp.com/api/zones/users/' + userId.toString());

  if (response.statusCode == 200) {
    // If server returns an OK response, parse the JSON.
    return Zone.fromJson(json.decode(response.body));
  } else {
    // If that response was not OK, throw an error.
    throw Exception('Failed to load zones');
  }
}