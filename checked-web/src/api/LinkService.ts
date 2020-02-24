import { HttpService } from "./HttpService";

export const LinkService = {
    getMembersByOverseer: async (overseerId: string): Promise<any> => {
        const uri = "links/users/" + overseerId;
        return await HttpService.get(uri).then((res) => {
            return res;
        });
    },

    getOverseersByMember: async (memberId: number): Promise<any> => {
        const uri = "links/members/" + memberId;
        return await HttpService.get(uri).then((res) => {
            return res;
        });
    },

    deleteLink: async (linkId: number): Promise<any> => {
        const uri = "links/delete/" + linkId;
        return await HttpService.delete(uri).then((res) => {
            return res;
        });
    },

    createLink: async (userId: number, memberId: number, relationship: ("Parent")): Promise<any> => {
        const uri = 'links/create';
        const body = { userId, memberId, relationship };
        return await HttpService.post(uri, body);
    },


};