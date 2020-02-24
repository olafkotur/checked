import { ILocations, IZoneTemperatures } from "./misc";

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
  isGuardian: boolean,
  policyAccepted: boolean,
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
  locations: ILocations[],
  temperatures: IZoneTemperatures[],
  createdAt: Date
}

export interface IDbComment {
  commentId: number,
  memberId: number,
  rating: number,
  value: string,
  createdAt: Date
}

export interface IDbLink {
  linkId: number,
  userId: number,
  memberId: number,
  relationship: number,
  createdAt: Date,
}

export interface IDbNotification {
  notificationId: number,
  userId: number,
  priority: number,
  value: string,
  isCleared: boolean,
  createdAt: Date,
}