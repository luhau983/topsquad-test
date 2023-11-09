import { httpAxios } from './httpAxios';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { Http } from '../../domain/repositories/Http';
import { authRepository } from '../repositories/authRepository';

const client: Http = httpAxios;
export const authInstance: AuthRepository = authRepository(client);
