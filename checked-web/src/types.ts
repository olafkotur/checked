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

export interface IMemberLocation {
    memberId: number;
    userId: number;
    zoneId: number;
    xValue: number;
    yValue: number;
    time: number;
}

export interface ILink {
    linkId: number;
    userId: number;
    memberId: number;
    relationship: "Parent";
    createdAt: number;
}

export interface IUser {
    userId: number;
    email: string;
    companyName: string;
    isGuardian: boolean;
    policyAccepted: boolean;
    createdAt: Date;
    lastUpdated: Date;
}

export interface ISettings {
    userId: number;
    logoImage: string;
    darkMode: boolean;
    timeZone: string;
    themeColor: string;
    notifications: {
        interval: number;
        minTemperature: number;
        maxTemperature: number;
        gatheringThreshold: number;
    };
}