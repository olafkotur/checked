export const config = {
  rules: {
    historic: '*/5 * * * *',
    notification: '*/5 * * * * *'
  },
  warnings: {
    maxTemperature: 35,
    minTemperature: 20,
  }
};