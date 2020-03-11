import { HttpService } from "./HttpService";



export const ConsentService = {


    getConditions: async (): Promise<any> => {
        const uri = "legal/copy/conditions";

        return await HttpService.get(uri).then((res: any) => {
            // console.log(res);
            return res.result;
        });
    },


    getPrivacy: async (): Promise<any> => {
        const uri = "legal/copy/privacy";

        return await HttpService.get(uri).then((res: any) => {
            // console.log(res);
            return res.result;
        });
    },


    getConsent: async (): Promise<any> => {
        const uri = "legal/copy/consent";

        return await HttpService.get(uri).then((res: any) => {
            // console.log(res);
            return res.result;
        });
    },


    getConditionsMember: async (memberID: number): Promise<any> => {
        const uri = "agreement/members/conditions/"+memberID.toString();

        return await HttpService.get(uri).then((res: any) => {
            // console.log(res);
            return res.result;
        });
    },


    getPrivacyMember: async (memberID: number): Promise<any> => {
        const uri = "agreement/members/privacy/"+memberID.toString();

        return await HttpService.get(uri).then((res: any) => {
            // console.log(res);
            return res.result;
        });
    },


    getConsentMember: async (memberID: number): Promise<any> => {
        const uri = "agreement/members/consent/"+memberID.toString();

        return await HttpService.get(uri).then((res: any) => {
            console.log(res);
            return res.result;
        });
    },


    updateConsent: async (value: boolean, memberID: number, consentType: string): Promise<any> => {
        let uri = "";

        if(consentType === "Consent"){
            uri = "consent/update/" + memberID.toString();
        }
        else if (consentType === "Privacy"){
            uri = "privacy/update/" + memberID.toString();
            return(null);
        }
        else {
            uri = "conditions/update/" + memberID.toString();
            return (null);
        }

        const body = {
            isAccepted: value,
        };

        return await HttpService.post(uri, body).then((res: any) => {
            console.log(res);
            return res.result;
        });

        
    },










};