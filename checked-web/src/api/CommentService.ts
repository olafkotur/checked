import { HttpService } from "./HttpService";

export const CommentService = {
    getComments: async (memberId: string): Promise<any> => {
    const uri = "comments/members/" + memberId;

        return await HttpService.get(uri).then((res: any) => {
            // console.log(res);
            return res.result;
        });
    },

    
    saveComment: async (body: object): Promise<any> => {
        const uri = "comment/create";

        return await HttpService.post(uri, body).then((res: any) => {
            // console.log(res);
            return res.result;
        });
    },

    deleteComment: async (commentId: string): Promise<any> => {
        const uri = "comment/delete/" + commentId;

        return await HttpService.delete(uri).then((res: any) => {
            // console.log(res);
            return res;
        });
    },

     getCommentsByUser: async (userID: string): Promise<any> => {
         const uri = "feedback/users/" + userID;

        return await HttpService.get(uri).then((res: any) => {
            console.log(res);
            return res.result;
        });
    },

    saveCommentForOverseer: async (body: object): Promise<any> => {
        const uri = "feedback/create";

        return await HttpService.post(uri, body).then((res: any) => {
             console.log(res);
            return res.result;
        });
    },





};