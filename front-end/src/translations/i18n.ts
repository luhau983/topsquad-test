import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation_de from './de/translation.json';
import translation_en from './en/translation.json';
import translation_vi from './vi/translation.json';

const debugTranslation = import.meta.env.MODE === 'development' ? true : false;

i18next.use(initReactI18next).init({
  debug: debugTranslation,
  fallbackLng: 'vi',
  lng: 'vi',
  resources: {
    vi: {
      translation: translation_vi,
    },
    en: {
      translation: translation_en,
    },
    de: {
      translation: translation_de,
    },
  },
});

// Change languages
// const { i18n } = useTranslation();
// i18n.changeLanguage("vi");

export default i18next;
