import crypto from 'crypto';

export const AuthService = {

  hashValue: (value: string): string => {
    const hashed: string = crypto.createHash('md5').update(value).digest('hex');
    const salted: string = crypto.createHash('md5').update(hashed).digest('hex');
    return salted;
  },

}