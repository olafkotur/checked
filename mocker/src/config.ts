export const config = {
  rules: {
    liveData: '* * * * *',
  },
  types: {
    liveData: ['temperature'],
  },
  values: {
    minSensorId: 1,
    maxSensorId: 10,
    minTemperature: 22,
    maxTemperature: 30,
    minCoords: 0,
    maxCoords: 100
  },
  minValues: {
    temperature: 22,
    coords: 0,
  },
  maxValues: {
    temperature: 30,
    coords: 100,
  }
}