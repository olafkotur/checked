import { ScheduleService } from './services/schedule';
import { HttpService } from './services/http';
import { config } from './config';
import { IApiIds } from './types';

require('dotenv').config();

const DEBUG: boolean = true;
const DOMAIN: string = DEBUG ? 'http://localhost:8080' : 'https://checked-api.herokuapp.com';

async function main() {
  const ids: IApiIds = {
    user: 1,
    zone: [1, 2, 3],
    member: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  };

  const zoneDetails = [
    {
      width: 200,
      height: 300,
      xValue: 50,
      yValue: 50,
    },
    {
      width: 300,
      height: 350,
      xValue: 400,
      yValue: 150,
    },
    {
      width: 500,
      height: 500,
      xValue: 500,
      yValue: 200,
    }
  ];

  // Create new mock user
  await HttpService.post(DOMAIN + '/api/users/create', {
    email: config.default.user.email,
    password: config.default.user.password,
    companyName: config.default.user.companyName
  }).then(async (res: any) => {
    if (res.code === 201) {
      ids.user = res.result.userId;
      console.log('CreateUser: Successfully created a new user');
    } else {
      console.error('CreateUser: Error user already exists');
    }

    // Skip creation if in DEBUG mode
    if (!DEBUG) {
      // Create new mock zones
      ids.zone = [];
      for (let i = 0; i < config.default.numberOfZones; i++) {
        await HttpService.post(DOMAIN + '/api/zones/create', {
          userId: ids.user,
          name: config.default.zone.name,
          width: zoneDetails[i].width,
          height: zoneDetails[i].height,
          xValue: zoneDetails[i].xValue,
          yValue: zoneDetails[i].yValue,
          color: config.default.zone.color
        }).then((res: any) => {
          if (res.code === 201) {
            ids.zone.push(res.result.zoneId);
            console.log('CreateZone: Successfully created a new zone');
          } else {
            console.error('CreateZone: Error could not create a new zone');
          }
        });
      }

      // Create new mock members
      ids.member = [];
      for (let i = 0; i < config.default.numberOfMembers; i++) {
        await HttpService.post(DOMAIN + '/api/members/create', {
          userId: ids.user,
          firstName: config.default.member.firstName + ` ${i+1}`,
          lastName: config.default.member.lastName
        }).then((res: any) => {
          if (res.code === 201) {
            ids.member.push(res.result.memberId);
            console.log('CreateMember: Successfully created a new member');
          } else {
            console.error('CreateMember: Error could not create a new member');
          }
        });
      }
    } else {
      console.log('Skipping creating new zones and members, using default ids');
    }

    // Start schedules
    ScheduleService.live(DOMAIN, ids);
    ScheduleService.location(DOMAIN, ids);

  });
} main();
