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
  password: string
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