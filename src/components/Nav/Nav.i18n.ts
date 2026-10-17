import type { Locale } from '../../lib/locale';

export interface NavCopy {
  about: string;
  cv: string;
  apps: string;
  contact: string;
  switchLanguage: string;
}

export const nav: Record<Locale, NavCopy> = {
  be: {
    about: 'Пра мяне',
    cv: 'Досьвед',
    apps: 'Аплікацыі',
    contact: 'Кантакты',
    switchLanguage: 'Switch to English',
  },
  en: {
    about: 'About',
    cv: 'Work',
    apps: 'Apps',
    contact: 'Contact',
    switchLanguage: 'Перайсці на беларускую',
  },
};
