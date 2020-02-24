const HttpService = require('../http');
const base64 = require('base64-img');

// Convert image into base64
const b64Image = base64.base64Sync('./Peace.jpg').toString();
console.log(b64Image)

// Send a post request with the base64 image
HttpService.post('http://localhost:8080/api/settings/update/1', {
  logoImage: b64Image
});
