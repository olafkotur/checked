export interface ILocations {
  zoneId: number;
  memebrs: number[];
}

export interface IZoneTemperatures {
  zoneId: number;
  value: number;
}

export interface IDecodedToken {
  exp: number;
  email: string;
  password: string;
}