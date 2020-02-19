export const config = {
  rules: {
    historic: '*/5 * * * *',
    notification: '*/15 * * * * *'
  },
  warnings: {
    maxTemperature: 35,
    minTemperature: 20,
    gatheringThreshold: 0.7
  }
};