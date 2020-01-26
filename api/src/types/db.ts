export interface IDbLive {
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

export interface IDbZone {
  zoneId: number,
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
  firstName: string,
  lastName: string,
  adminUsername: string,
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