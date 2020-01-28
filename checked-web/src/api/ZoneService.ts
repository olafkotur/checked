import { HttpService } from "./HttpService";

export const ZoneService = {
  createZone: async (name: string, width: number, height: number, xValue: number, yValue: number, color: string, userId: number): Promise<any> => {
    const uri = "zones/create";
    const body = {
      userId,
      name,
      width,
      height,
      xValue,
      yValue,
      color,
      
    };
    return await HttpService.post(uri, body).then((res: any) => {
      // console.log(res);
      return res.result.zoneId;
    });
  },

 
  updateZone: async (body: object, id: number): Promise<any> => {
    const uri = "zones/update/" + id;
    return await HttpService.post(uri, body).then((res: any) => {
      return res;
    });
  },

  loadZones: async (): Promise<any> => {
    const uri = "zones";
    return await HttpService.get(uri).then((res) => {
      return res;
    });
  },

   loadZonesByUser: async (userID: number): Promise<any> => {
    const uri = "zones/users/" + userID.toString();
    return await HttpService.get(uri).then((res) => {
      return res;
    });
  }

};
