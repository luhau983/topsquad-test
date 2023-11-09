// rule endpoint: "API" + "_ModuleName" + "_FunctionName"
// ex: API_AUTH_URL_LOGIN_COGNITO
const API_URL_BASE = String(import.meta.env.VITE_API_URL) || '';
export const ENDPOINT = {
  // Common
  API_URL_BASE: API_URL_BASE,

  // Auth
  API_AUTH_LOGIN: API_URL_BASE + '/api/v1/auth/signin',
  API_AUTH_REGISTER: API_URL_BASE + '/api/v1/auth/signup',
};

export const LOCALES = {
  VI: 'vi',
  EN: 'en',
  DE: 'de',
};
