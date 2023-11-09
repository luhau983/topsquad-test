import { TLoginDTO, TRegisterDTO } from '@infrastructure/dto/AuthDTO';

import { TResLogin, TResRegister } from '../models/Auth';

export interface AuthRepository {
  login: (params: TLoginDTO) => Promise<TResLogin | null>;
  register: (params: TRegisterDTO) => Promise<TResRegister | null>;
}
