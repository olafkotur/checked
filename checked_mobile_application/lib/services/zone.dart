import 'package:http/http.dart' as http;

Future<http.Response> fetchPost() {
  return http.get('https://jsonplaceholder.typicode.com/posts/1');
}

// Get all zones by user - checked-api.herokuapp.com/api/zones/users/1 - GET
// Add zone - checked-api.herokuapp.com/api/zones/create - POST
// Update zone - checked-api.herokuapp.com/api/zones/update/1 - POST
// Delete zone - checked-api.herokuapp.com/api/zones/delete/1 - DELETE

