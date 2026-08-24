export type Locale = 'be' | 'en';

export const LOCALES: Locale[] = ['be', 'en'];

export const DEFAULT_LOCALE: Locale = 'be';

/** Native name of each locale, for the language switch. */
export const LOCALE_NAME: Record<Locale, string> = {
  be: 'Бел',
  en: 'Eng',
};

/** BCP-47 tag for <html lang>. */
export const LOCALE_TAG: Record<Locale, string> = {
  be: 'be',
  en: 'en',
};

export interface UiStrings {
  navAbout: string;
  navCv: string;
  skipToContent: string;
  switchLanguage: string;
  cvTitle: string;
  cvLede: string;
  sectionSummary: string;
  sectionSkills: string;
  sectionExperience: string;
  sectionProjects: string;
  sectionEducation: string;
  sectionLanguages: string;
  sectionContact: string;
  homeDescription: string;
  cvDescription: string;
  contactEmail: string;
  contactPhone: string;
}

export const ui: Record<Locale, UiStrings> = {
  be: {
    navAbout: 'Пра мяне',
    navCv: 'Досвед',
    skipToContent: 'Перайсці да зместу',
    switchLanguage: 'Switch to English',
    cvTitle: 'Досвед',
    cvLede: 'Праекты, месцы працы і адукацыя.',
    sectionSummary: 'Коратка',
    sectionSkills: 'Тэхналогіі',
    sectionExperience: 'Месцы працы',
    sectionProjects: 'Праекты',
    sectionEducation: 'Адукацыя',
    sectionLanguages: 'Мовы',
    sectionContact: 'Кантакты',
    homeDescription:
      'Аляксей Нямковіч — адмысловец праграмнага забеспячэння. Крос-платформавыя мабільныя дадаткі: React Native, TypeScript, Expo.',
    cvDescription: 'Досвед Аляксея Нямковіча: праекты, месцы працы, тэхналогіі і адукацыя.',
    contactEmail: 'Пошта',
    contactPhone: 'Тэлефон',
  },
  en: {
    navAbout: 'About',
    navCv: 'Work',
    skipToContent: 'Skip to content',
    switchLanguage: 'Перайсці на беларускую',
    cvTitle: 'Work',
    cvLede: 'Projects, positions and education.',
    sectionSummary: 'Summary',
    sectionSkills: 'Technologies',
    sectionExperience: 'Positions',
    sectionProjects: 'Projects',
    sectionEducation: 'Education',
    sectionLanguages: 'Languages',
    sectionContact: 'Contact',
    homeDescription:
      'Aliaksei Niamkovich — software engineer. Cross-platform mobile applications: React Native, TypeScript, Expo.',
    cvDescription:
      "Aliaksei Niamkovich's work history: projects, positions, technologies and education.",
    contactEmail: 'Email',
    contactPhone: 'Phone',
  },
};

/** The other locale — there are only two, so a switch is a toggle. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'be' ? 'en' : 'be';
}

/** Builds a path for a locale without depending on the current URL shape. */
export function localePath(locale: Locale, path: '' | 'cv'): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  // Trailing slash matches Astro's static output (/cv/index.html), so canonical
  // URLs point at the address the host serves rather than one it redirects.
  return path ? `${prefix}/${path}/` : `${prefix}/`;
}
