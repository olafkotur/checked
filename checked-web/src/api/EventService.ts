import { HttpService } from './HttpService';

export const EventService = {

    createEvent: async (userId: number, title: string, description: string, eventDate: number): Promise<any> => {
        const uri = 'events/create';
        const body = {userId, title, description, eventDate};
        return await HttpService.post(uri, body);
    },

    deleteEvent: async (eventId: number): Promise<any> => {
        const uri = 'events/delete/' + eventId.toString();
        return await HttpService.delete(uri);
    },

    getEvent: async (eventId: number): Promise<any> => {
        const uri = 'events/' + eventId.toString();
        return await HttpService.get(uri);
    }, 

    getEventsByUser: async (eventId: number): Promise<any> => {
        const uri = 'events/users/' + eventId.toString();
        return await HttpService.get(uri);
    }, 

};