import { IZoneTemperatures, ILocations } from "./misc";

export interface IResponse {
  code: number;
  status: string;
  date: string;
  unix: number;
  message: string;
}

export interface IDataResponse {
  code: number;
  status: string;
  date: string;
  unix: number;
  result: any
}

export interface ILiveResponse {
  dataType: string;
  memberId?: number;
  userId: number;
  zoneId: number;
  value: number;
  time: number 
}

export interface ILocationResponse {
  memberId: number;
  userId: number;
  zoneId: number;
  xValue: number;
  yValue: number;
  time: number 
}

 export interface IZoneResponse {
  zoneId: number;
  userId: number;
  name: number;
  width: number;
  height: number;
  xValue: number;
  yValue: number;
  color: string;
  createdAt: number;
  lastUpdated: number;
}

export interface IUserResponse {
  userId: number;
  email: string;
  companyName: string;
  isGuardian: boolean;
  policyAccepted: boolean;
  createdAt: number;
  lastUpdated: number
}

export interface IMemberResponse {
  memberId: number;
  userId: number;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: number;
  lastUpdated: number
}

export interface IActivityResponse {
  activityId: number;
  name: string;
  zoneId: number
  createdAt: number;
  lastUpdated: number
}

export interface IZoneWithActivityResponse extends IZoneResponse {
  activity: IActivityResponse
}

export interface IAssemblyResponse {
  isActive: boolean;
  zoneId: number;
  createdAt: number;
  lastUpdated: number;
}

export interface IHistoricResponse {
  userId: number;
  averageTemperature: number;
  membersActive: number;
  zonesCount: number;
  activitiesCount: number;
  locations: ILocations[];
  temperatures: IZoneTemperatures[];
  createdAt: number
}

export interface ICommentResponse {
  commentId: number;
  memberId: number;
  rating: number;
  value: string;
  image: string;
  createdAt: number
}

export interface ILinkResponse {
  linkId: number;
  userId: number;
  memberId: number;
  relationship: number;
  createdAt: number;
}

export interface INotificationResponse {
  notificationId: number;
  userId: number;
  priority: number;
  value: string;
  isCleared: boolean;
  createdAt: number;
}

export interface ISettingsResponse {
  userId: number;
  logoImage: string;
  darkMode: boolean;
  timeZone: string;
  themeColor: string;
  interval: number;
  minTemperature: number;
  maxTemperature: number;
  gatheringThreshold: number;
  createdAt: number;
  lastUpdated: number;
}

export interface IEventResponse {
  userId: number;
  eventId: number;
  title: string;
  description: string;
  eventDate: number;
  createdAt: number;
  lastUpdated: number;
}

export interface IConsentFormResponse {
  memberId: number;
  isAccepeted: boolean;
  createdAt: number;
  lastUpdated: number;
}

export interface IFeedbackResponse {
  feedbackId: number;
  userId: number;
  memberId: number;
  value: string;
  createdAt: number;
  lastUpdated: number;
}