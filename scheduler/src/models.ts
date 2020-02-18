export interface IStatus {
  isRunningHistoric: boolean;
}

export interface IHistoricResponse {
  userId: number,
  averageTemperature: number,
  membersActive: number,
  zonesCount: number,
  activitiesCount: number,
  createdAt: number
}