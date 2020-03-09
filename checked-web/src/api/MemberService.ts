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
    },


    login: async (id: string, password: string): Promise<any> => {
        const uri = 'members/login';
        const body = { memberId: id, password };
        return await HttpService.post(uri, body);
    },
  
  
  getOneMember: async (memberID: number): Promise<any> => {
        const uri = 'members/' + memberID.toString();
        return await HttpService.get(uri).then((res: any) => {
            // console.log(res);
            return res.result;
        });
    },
};