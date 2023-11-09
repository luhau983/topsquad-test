import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { Http } from '../../domain/repositories/Http';
import { ENDPOINT } from '../../utils/constant';
import { TLoginDTO, TRegisterDTO } from '../dto/AuthDTO';
import { TResLogin, TResRegister } from '@/core/domain/models/Auth';

export const authRepository = (http: Http): AuthRepository => {
  const login = async (params: TLoginDTO): Promise<TResLogin | null> => {
    try {
      const res = await http.post(ENDPOINT.API_AUTH_LOGIN, params);
      console.log(res);
      if (res.data) {
        return res;
      }
      return null;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  };

  const register = async (params: TRegisterDTO): Promise<TResRegister | null> => {
    try {
      const res = await http.post(ENDPOINT.API_AUTH_REGISTER, params);
      if (res.data) {
        return res;
      }
      return null;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  };

  return {
    login,
    register,
  };
};
