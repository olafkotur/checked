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
    reading?: number;
}

export interface IActivity {
    activityId?: number;
    name?: string;
    createdAt?: Date;
    lastUpdated?: Date;
}