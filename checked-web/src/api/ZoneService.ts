import { HttpService } from "./HttpService";

export const ZoneService = {
         createZone: async (name: string,width: number,height: number,xValue: number,yValue: number,color: string): Promise<any> => {
           const uri = "zones/create";
           const body = {
             name,
             width,
             height,
             xValue,
             yValue,
             color
           };
          return await HttpService.post(uri, body).then((res: any) => {
             // console.log(res);
            //  console.log(res.result.zoneId);
            return res.result.zoneId;
           });
         },

  saveZone: async (body: object, id: number): Promise<any> => {
          const uri = "zones/update/"+id;
          return await HttpService.post(uri, body).then((res: any) => {
            return res;
          });

         }


       };
