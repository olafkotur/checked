import { HttpService } from './HttpService';

export const MemberService = {

    getAllMembersByUser: async (userID: number): Promise<any> => {
        const uri = 'members/users/' + userID.toString();
        return await HttpService.get(uri);

    },

    createMember: async (userId: number, firstName: string, lastName: string): Promise<any> => {
        const uri = 'members/create';
        const body = { userId, firstName, lastName };
        return await HttpService.post(uri, body);
    },

    deleteMember: async (memberID: number): Promise<any> => {
        const uri = 'members/delete/' + memberID.toString();
        return await HttpService.delete(uri);
    }
};