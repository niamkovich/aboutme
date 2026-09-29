import type { Locale } from '../../lib/locale';

export interface NavCopy {
  about: string;
  cv: string;
  apps: string;
  blog: string;
  contact: string;
  privacy: string;
  switchLanguage: string;
}

export const nav: Record<Locale, NavCopy> = {
  be: {
    about: 'Пра мяне',
    cv: 'Досьвед',
    apps: 'Аплікацыі',
    blog: 'Блёг',
    contact: 'Кантакты',
    privacy: 'Прыватнасьць',
    switchLanguage: 'Switch to English',
  },
  en: {
    about: 'About',
    cv: 'Work',
    apps: 'Apps',
    blog: 'Blog',
    contact: 'Contact',
    privacy: 'Privacy',
    switchLanguage: 'Перайсці на беларускую',
  },
};
