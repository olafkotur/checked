export interface ILocations {
  zoneId: number;
  memebrs: number[];
}

export interface IZoneTemperatures {
  zoneId: number;
  value: number;
}

export interface INotificationSettings {
  interval: number;
  maxTemperature: number;
  minTemperature: number;
  gatheringThreshold: number;
}