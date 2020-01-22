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