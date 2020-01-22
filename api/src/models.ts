export interface IResponse {
  code: number,
  status: string,
  date: string,
  unix: number,
  message: string,
}

export interface IDataResponse {
  code: number,
  status: string,
  date: string,
  unix: number,
  result: any
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

 export interface IZoneDataResponse {
  id: number,
  name: number,
  activity: string,
  createdAt: number,
  lastUpdated: number,
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

export interface IDbZoneData {
  zoneId: number,
  name: number,
  activity: string,
  createdAt: Date,
  lastUpdated: Date,
 }

 export interface IDbUser {
  userId: number,
  username: string,
  createdAt: Date,
  lastUpdated: Date
 }

 export interface IDbUserWithPassword extends IDbUser {
  password: string
 }