export const ValidLiveCollections = [
  'temperature',
];

export interface ISimpleResponse {
  code: string,
  message: string,
  time: number
}

export interface IReadingResponse {
 sensorId: number,
 value: number,
 time: number 
}

export interface ILocationResponse {
  sensorId: number,
  xValue: number,
  yValue: number,
  time: number 
 }

export interface IDbReading {
  sensorId: number,
  value: number,
  createdAt: Date
}

export interface IDbLocation {
  sensorId: number,
  xValue: number,
  yValue: number,
  createdAt: Date
}