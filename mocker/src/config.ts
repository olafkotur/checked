export const config = {
  default: {
    numberOfZones: 3,
    numberOfMembers: 10,
    user: {
      email: 'mocker@mocker.com',
      password: 'bigmemes69',
      companyName: 'Mocker Ltd.',
    },
    zone: {
      name: 'Mocked Zone',
      color: 'rgb(255, 158, 0)',
    },
    member: {
      firstName: 'Mocked',
      lastName: 'Member'
    }
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
