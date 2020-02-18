export interface IStatus {
  isRunningHistoric: boolean;
}

export interface IHistoricResponse {
  userId: number,
  averageTemperature: number,
  membersActive: number,
  zonesCount: number,
  activitiesCount: number,
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