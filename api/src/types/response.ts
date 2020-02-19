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
  dataType: string,
  memberId?: number,
  userId: number,
  zoneId: number,
  value: number,
  time: number 
}

export interface ILocationResponse {
  memberId: number,
  userId: number,
  zoneId: number,
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
  userId: number,
  firstName: string,
  lastName: string,
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

export interface IZoneWithActivityResponse extends IZoneResponse {
  activity: IActivityResponse
}

export interface IAssemblyResponse {
  isActive: boolean,
  zoneId: number,
  createdAt: number,
  lastUpdated: number,
}

export interface IHistoricResponse {
  userId: number,
  averageTemperature: number,
  membersActive: number,
  zonesCount: number,
  activitiesCount: number,
  locations: {
    zoneId: number,
    memebrs: number[]
  },
  createdAt: number
}

export interface ICommentResponse {
  commentId: number,
  memberId: number,
  rating: number,
  value: string,
  createdAt: number
}