export type LiveDataKeys = 'temperature';

export interface ISimpleResponse {
  value: string,
  time: number,
}

export interface IDbReading {
  sensorId: number,
  createdAt: Date,
}

export interface IDbTemperature extends IDbReading {
  value: number,
}