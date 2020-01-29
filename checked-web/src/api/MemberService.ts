import { HttpService } from './HttpService';

export const MemberService = {

    getAllMembersByUser: async (userID: number): Promise<any> => {
        const uri = 'members/users/' + userID.toString();
        return await HttpService.get(uri);

    },
};