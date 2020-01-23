import { ScheduleService } from './services/schedule';
import { HttpService } from './services/http';
import { config } from './config';

const DEBUG: boolean = true;
const DOMAIN: string = DEBUG ? 'http://localhost:8080' : 'https://checked-api.herokuapp.com';
const CODE: string = 'swcVegca5wmJ2u3fHLWtBhxdaHiV';

async function main() {
  // Clear database
  await HttpService.get(DOMAIN + `/api/danger/purge/${CODE}`);

  // Create new mock user
  await HttpService.post(DOMAIN + '/api/users/create', {
    username: config.default.username,
    password: config.default.password
  });

  // Create new mock zones
  for (let i = 0; i < config.default.numberOfZones; i++) {
    await HttpService.post(DOMAIN + '/api/zones/create', {
      name: config.default.zoneName
    });
  }

  // Create new mock members
  for (let i = 0; i < config.default.numberOfMembers; i++) {
    await HttpService.post(DOMAIN + '/api/members/create', {
      firstName: config.default.memberFirstName,
      lastName: config.default.memberLastName,
      adminUsername: config.default.username
    });
  }

  // Start schedules
  ScheduleService.live();
  ScheduleService.location();

} main();
