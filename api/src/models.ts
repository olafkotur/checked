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
  value: number,
  createdAt: Date,
}