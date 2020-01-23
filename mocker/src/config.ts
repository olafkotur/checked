export const config = {
  default: {
    username: 'mocker',
    password: 'bigmemes69',
    activityName: 'Mocked Activity',
    zoneName: 'Mocked Zone',
    memberFirstName: 'Mocked',
    memberLastName: 'Member',
    numberOfZones: 3,
    numberOfMembers: 10
  },
  rules: {
    live: '*/10 * * * * *',
    location: '*/10 * * * * *',
  },
  types: {
    liveData: ['temperature'],
  },
  minValues: {
    temperature: 22,
    coords: 0,
  },
  maxValues: {
    temperature: 30,
    coords: 100,
  },
}