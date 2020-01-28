import { HttpService } from "./HttpService";

export const ActivityService = {
  getAllActivitiesForZone: async (zoneID: number): Promise<any> => {
    const uri = "activity/zone/" + zoneID;
    return await HttpService.get(uri).then((res) => {
      return res;
    });
  },

  createActivity: async (name: string, zoneId: number): Promise<any> => {
    const uri = "activity/create";
    const body = {
      zoneId,
      name,
    };
    return await HttpService.post(uri, body).then((res: any) => {
      // console.log(res);
      return res;
    });
  }

};
