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

export interface ILiveResponse {
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

 export interface IZoneResponse {
  zoneId: number,
  userId: number,
  name: number,
  width: number,
  height: number,
  xValue: number,
  yValue: number,
  color: string,
  createdAt: number,
  lastUpdated: number,
}

export interface IUserResponse {
  userId: number,
  email: string,
  companyName: string,
  createdAt: number,
  lastUpdated: number
}

export interface IMemberResponse {
  memberId: number,
  firstName: string,
  lastName: string,
  adminUsername: string,
  createdAt: number,
  lastUpdated: number
}

export interface IActivityResponse {
  activityId: number,
  name: string,
  zoneId: number
  createdAt: number,
  lastUpdated: number
}