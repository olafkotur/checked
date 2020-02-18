export interface IZone {
    color: string;
    createdAt: number;
    height: number;
    width: number;
    lastUpdated: number;
    name: string;
    userId: number;
    xValue: number;
    yValue: number;
    zoneId: number;
    activity: IActivity;
    data?: IZoneData;
}

export interface IZoneData {
    currentTemp: number;
    currentCount: number;
}

export interface IActivity {
    activityId?: number;
    name?: string;
    createdAt?: Date;
    lastUpdated?: Date;
}

export interface IMember {
    memberId: number;
    userId: number;
    firstName: string;
    lastName: string;
    createdAt: number;
    lastUpdated: number;
}