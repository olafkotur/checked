import base64 from 'base-64';
import moment from 'moment';
import utf8 from 'utf8';
import { IDbUser } from '../types/db';
import { IDecodedToken } from '../types/misc';
import { MongoService } from './mongo';

export const TokenService = {
  
  generateHeader: (): string => {
    const header: string = '{"alg": "MD5", "typ": "JWT"}';
    const bytes = utf8.encode(header);
    return base64.encode(bytes);
  },

  generatePayload: (username: string): string => {
    const exp: number = moment().add(process.env.JWT_EXP || 60, 'minutes').unix();
    const payload: string = `{"exp": "${exp}", "username": "${username}"}`;
    const bytes = utf8.encode(payload);
    return base64.encode(bytes);
  },

  generateToken: (user: IDbUser): string => {
    const header: string = TokenService.generateHeader();
    const payload: string = TokenService.generatePayload(user.email);
    return `${header}.${payload}.${user.password}`;
  },

  decodeToken: (token: string): IDecodedToken => {
    const components: string[] = token.split('.');
    const decoded: IDecodedToken = {
      exp: JSON.parse(components[1] || '{}').exp,
      email: JSON.parse(components[1] || '{}').email,
      password: components[2]
    };
    return decoded;
  },

  authToken: (token: string): boolean => {
    const decoded: IDecodedToken = TokenService.decodeToken(token);
    const user: any = MongoService.findOne('users', { email: decoded.email });
    if (!user) {
      return false;
    }

    // Check if credentials are correct
    if (decoded.email === user.email) {
      if (decoded.password === user.password) {
        return true;
      }
    }

    // Default to unauthorized
    return false;
  }
};
