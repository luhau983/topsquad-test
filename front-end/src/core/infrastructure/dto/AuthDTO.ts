export type TAuthGetTokenDTO = {
  refresh_token: string;
  redirect_url: string;
};

export type TLoginDTO = {
  username: string;
  password: string;
};

export type TUpdateForgotPass = {
  code: string;
  password: string;
  username: string;
};

export type TRegisterDTO = {
  username: string;
  password: string;
  email: string;
  phone: string;
  role: Array<string>;
};
