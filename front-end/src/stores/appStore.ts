import { create } from 'zustand';

import { LOCALES } from './../core/utils/constant';

enum ELanguage {
  Vietnamese = 'vi',
  English = 'en',
  German = 'de',
}

type AppState = {
  language: string;
  getLanguage: () => ELanguage | null;
  setLanguage: (lang: string) => void;
};

const useAppStore = create<AppState>(set => ({
  language: LOCALES.VI,
  getLanguage: (): ELanguage | null => {
    return (localStorage.getItem('lang') as ELanguage) || null;
  },
  setLanguage: (lang: string) => {
    localStorage.setItem('lang', lang);
    set({ language: lang });
  },
}));

export default useAppStore;
