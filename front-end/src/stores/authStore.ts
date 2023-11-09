import { create } from 'zustand';

import { TAccountUserInfo } from '@/core/domain/models/Auth';

type AuthState = {
  userMe: TAccountUserInfo | null;
  setUserMe: (data: TAccountUserInfo) => void;
};

const useAuthStore = create<AuthState>(set => ({
  userMe: null,
  setUserMe: (data: TAccountUserInfo) => set({ userMe: data }),
}));

export default useAuthStore;
