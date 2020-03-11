import { HttpService } from "./HttpService";



export const ConsentService = {


    getConditions: async (): Promise<any> => {
        const uri = "legal/copy/conditions";

        return await HttpService.get(uri).then((res: any) => {
            return res.result;
        });
    },


    getPrivacy: async (): Promise<any> => {
        const uri = "legal/copy/privacy";

        return await HttpService.get(uri).then((res: any) => {
            return res.result;
        });
    },


    getConsent: async (): Promise<any> => {
        const uri = "legal/copy/consent";

        return await HttpService.get(uri).then((res: any) => {
            return res.result;
        });
    },


    getConditionsMember: async (memberID: number): Promise<any> => {
        const uri = "agreement/members/conditions/"+memberID.toString();

        return await HttpService.get(uri).then((res: any) => {
            return res.result;
        });
    },


    getPrivacyMember: async (memberID: number): Promise<any> => {
        const uri = "agreement/members/privacy/"+memberID.toString();

        return await HttpService.get(uri).then((res: any) => {
            return res.result;
        });
    },


    getConsentMember: async (memberID: number): Promise<any> => {
        const uri = "agreement/members/consent/"+memberID.toString();

        return await HttpService.get(uri).then((res: any) => {
            return res.result;
        });
    },


    updateConsentMember: async (value: boolean, memberID: number, consentType: string): Promise<any> => {
        const uri = "agreement/members/update/" + memberID.toString();
        let type = "";

        if(consentType === "Consent"){
            type = "consent";
        }
        else if (consentType === "Privacy"){
            type = "privacy";
        }
        else {
            type = "conditions";
        }



        const body = {
            isAccepted: value,
            agreementType: type,
        };

        return await HttpService.post(uri, body).then((res: any) => {
            console.log(res);
            return res.result;
        });

        
    },










};