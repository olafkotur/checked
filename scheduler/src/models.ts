export interface IStatus {
  isRunningHistoric: boolean,
  isRunningNotification: boolean,
}

export interface ILocations {
  zoneId: number,
  members: number[]
}

export interface IZoneTemperatures {
  zoneId: number,
  value: number
}

export interface IHistoricResponse {
  userId: number,
  averageTemperature: number,
  membersActive: number,
  zonesCount: number,
  activitiesCount: number,
  locations: string,
  temperatures: string
}

export interface ILiveResponse {
  dataType: string,
  memberId?: number,
  userId: number,
  zoneId: number,
  value: number,
  time: number 
}

export interface IActivityResponse {
  activityId: number,
  name: string,
  zoneId: number
  createdAt: number,
  lastUpdated: number
}

export interface ILocationResponse {
  memberId: number,
  userId: number,
  zoneId: number,
  xValue: number,
  yValue: number,
  time: number 
}

export interface INotification {
  userId: number,
  priority: number,
  value: string
}

export interface IUser {
  userId: number,
  email: string,
  companyName: string,
  isGuardian: boolean,
  policyAccepted: boolean,
  createdAt: number,
  lastUpdated: number
}