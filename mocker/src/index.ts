import { ScheduleService } from './services/schedule';
import { HttpService } from './services/http';
import { HelperService } from './services/helper';
import { config } from './config';
import { IApiIds } from './types';

require('dotenv').config();

const DEBUG: boolean = true;
const DOMAIN: string = DEBUG ? 'http://localhost:8080' : 'https://checked-api.herokuapp.com';

async function main() {
  const ids: IApiIds = {
    user: 1,
    zone: [],
    member: []
  }

  // Create new mock user
  await HttpService.post(DOMAIN + '/api/users/create', {
    email: config.default.user.email,
    password: config.default.user.password,
    companyName: config.default.user.companyName
  }).then((res: any) => {
    if (res.code === 201) {
      ids.user = res.result.userId;
    } else {
      console.error('CreateUser: Error user already exists');
    }
  });

  // Create new mock zones
  for (let i = 0; i < config.default.numberOfZones; i++) {
    await HttpService.post(DOMAIN + '/api/zones/create', {
      userId: ids.user,
      name: config.default.zone.name,
      width: HelperService.randomInt(50, 200),
      height: HelperService.randomInt(50, 200),
      xValue: HelperService.randomInt(0, 300),
      yValue: HelperService.randomInt(0, 300),
      color: config.default.zone.color
    }).then((res: any) => {
      if (res.code === 201) {
        ids.zone.push(res.result.zoneId);
      } else {
        console.error('CreateZone: Error could not create a new zone');
      }
    });
  }

  // Create new mock members
  for (let i = 0; i < config.default.numberOfMembers; i++) {
    await HttpService.post(DOMAIN + '/api/members/create', {
      userId: ids.user,
      firstName: config.default.member.firstName,
      lastName: config.default.member.lastName
    }).then((res: any) => {
      if (res.code === 201) {
        ids.member.push(res.result.memberId);
      } else {
        console.error('CreateMember: Error could not create a new member');
      }
    });
  }

  // Start schedules
  ScheduleService.live(DOMAIN, ids);
  ScheduleService.location(DOMAIN, ids);

} main();
