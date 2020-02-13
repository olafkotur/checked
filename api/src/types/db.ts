export interface IDbLive {
  dataType: string,
  memberId: number,
  userId: number,
  zoneId: number,
  value: number,
  createdAt: Date
}

export interface IDbLocation {
  memberId: number,
  userId: number,
  zoneId: number,
  xValue: number,
  yValue: number,
  createdAt: Date
}

export interface IDbZone {
  zoneId: number,
  userId: number,
  name: number,
  width: number,
  height: number,
  xValue: number,
  yValue: number,
  color: string,
  createdAt: Date,
  lastUpdated: Date,
}

export interface IDbUser {
  userId: number,
  email: string,
  password: string,
  companyName: string,
  createdAt: Date,
  lastUpdated: Date
}

export interface IDbMember {
  memberId: number,
  userId: number,
  firstName: string,
  lastName: string,
  createdAt: Date,
  lastUpdated: Date
}

export interface IDbActivity {
  activityId: number,
  name: string,
  zoneId: number
  createdAt: Date,
  lastUpdated: Date
}

export interface IDbAssembly {
  isActive: boolean,
  zoneId: number,
  createdAt: Date,
  lastUpdated: Date,
}

export interface IDbHistoric {
  userId: number,
  averageTemperature: number,
  membersActive: number,
  zonesCount: number,
  activitiesCount: number,
  createdAt: Date
}