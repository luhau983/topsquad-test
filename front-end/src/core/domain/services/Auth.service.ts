import { authInstance } from '@/core/infrastructure/instances';

class AuthService {
  private static instance: AuthService;

  private constructor() {
    //
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  logout = () => {
    try {
      authInstance.logout();
      window.location.href = window.location.origin + '/login';
    } catch (error) {
      console.log(error);
    }
  };
}

export default AuthService.getInstance();
