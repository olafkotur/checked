import { ILocations, IZoneTemperatures } from './misc';

export interface IDbLive {
  dataType: string;
  memberId: number;
  userId: number;
  zoneId: number;
  value: number;
  createdAt: Date;
}

export interface IDbLocation {
  memberId: number;
  userId: number;
  zoneId: number;
  xValue: number;
  yValue: number;
  createdAt: Date;
}

export interface IDbZone {
  zoneId: number;
  userId: number;
  name: number;
  nickName: number;
  width: number;
  height: number;
  xValue: number;
  yValue: number;
  color: string;
  createdAt: Date;
  lastUpdated: Date;
}

export interface IDbUser {
  userId: number;
  email: string;
  password: string;
  companyName: string;
  isGuardian: boolean;
  policyAccepted: boolean;
  nickName: string;
  createdAt: Date;
  lastUpdated: Date;
}

export interface IDbMember {
  memberId: number;
  userId: number;
  firstName: string;
  lastName: string;
  password: string;
  nickName: string;
  createdAt: Date;
  lastUpdated: Date;
}

export interface IDbActivity {
  activityId: number;
  name: string;
  zoneId: number
  createdAt: Date;
  lastUpdated: Date;
}

export interface IDbAssembly {
  isActive: boolean;
  zoneId: number;
  createdAt: Date;
  lastUpdated: Date;
}

export interface IDbHistoric {
  userId: number;
  averageTemperature: number;
  membersActive: number;
  zonesCount: number;
  activitiesCount: number;
  locations: ILocations[];
  temperatures: IZoneTemperatures[];
  createdAt: Date;
}

export interface IDbComment {
  commentId: number;
  memberId: number;
  rating: number;
  value: string;
  image: string;
  createdAt: Date;
}

export interface IDbLink {
  linkId: number;
  userId: number;
  memberId: number;
  relationship: number;
  createdAt: Date;
}

export interface IDbNotification {
  notificationId: number;
  userId: number;
  priority: number;
  value: string;
  isCleared: boolean;
  createdAt: Date;
}

export interface IDbSettings {
  userId: number;
  logoImage: string;
  darkMode: boolean;
  timeZone: string;
  themeColor: string;
  interval: number;
  minTemperature: number;
  maxTemperature: number;
  gatheringThreshold: number;
  createdAt: Date;
  lastUpdated: Date;
}

export interface IDbEvent {
  userId: number;
  eventId: number;
  title: string;
  description: string;
  eventDate: Date;
  createdAt: Date;
  lastUpdated: Date;
}

export interface IDbAgreementForm {
  id: number;
  agreementType: string;
  idType: string;
  isAccepted: boolean;
  createdAt: Date;
  lastUpdated: Date;
}

export interface IDbFeedback {
  feedbackId: number;
  userId: number;
  memberId: number;
  value: string;
  rating: number;
  image: string;
  createdAt: Date;
  lastUpdated: Date;
}