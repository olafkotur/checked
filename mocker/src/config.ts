export const config = {
  default: {
    username: 'mocker',
    password: 'bigmemes69',
    activityName: 'Mocked Activity',
    zoneName: 'Mocked Zone',
    memberFirstName: 'Mock',
    memberLastName: 'Mocked'
  },
  rules: {
    live: '* * * * *',
    location: '* * * * * *',
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