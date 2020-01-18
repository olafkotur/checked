export const ValidCollections = [
  'temperature',
];

export interface ISimpleResponse {
  code: string,
  message: string,
  time: number,
}

export interface IDbReading {
  sensorId: number,
  createdAt: Date,
}

export interface IDbTemperature extends IDbReading {
  value: number,
}