/**
 * Belarusian overlay for cv.yaml.
 *
 * cv.yaml stays the single source of truth for structure, dates and English
 * prose. This file translates only the free text, keyed by a slug derived from
 * each entry's own name (see `slug()` in src/data/cv.ts). Anything not listed
 * here falls back to the English source, and in `astro dev` a missing key is
 * logged to the console — so adding an entry to cv.yaml never breaks the build,
 * it just shows up untranslated until you add it below.
 */

export interface CvTranslation {
  title?: string;
  subtitle?: string;
  location?: string;
  summary?: string;
  highlights?: string[];
  details?: string;
  /**
   * Fields that are deliberately identical in both languages — proper nouns,
   * technology lists. Listing them here keeps the English text in cv.yaml as
   * the single source (no copy to drift) while silencing the dev warning.
   */
  same?: ('title' | 'subtitle' | 'location' | 'summary' | 'highlights' | 'details')[];
}

export const beOverlay: Record<string, CvTranslation> = {
  /* --- Header ------------------------------------------------------------ */

  'meta:name': { title: 'Аляксей Нямковіч' },
  'meta:headline': { title: 'Адмысловец праграмнага забеспячэння' },
  'meta:location': { title: 'Мінск, Беларусь' },
  'meta:summary': {
    highlights: [
      'Старшы інжынер праграмнага забеспячэння з **больш чым дзесяццю гадамі** досведу ў мабільнай і вэб-распрацоўцы. Спецыялізуюся на крос-платформавых мабільных дадатках, інтэграцыях з IoT, ахове здароўя і аўтамабільнай галіне. Маю досвед у маштабаваных архітэктурах, сувязі праз Bluetooth, хмарных сэрвісах і white-label прадуктах.',
    ],
  },

  /* --- Skills ------------------------------------------------------------ */

  'skill:languages': { title: 'Мовы праграмавання', same: ['details'] },
  'skill:cross-platform-development': { title: 'Крос-платформавая распрацоўка', same: ['details'] },
  'skill:tools-frameworks': { title: 'Інструменты і фрэймворкі', same: ['details'] },
  'skill:devops-infrastructure': { title: 'DevOps і інфраструктура', same: ['details'] },

  /* --- Spoken languages --------------------------------------------------- */

  'language:english': { title: 'Англійская', same: ['details'] },
  'language:jezyk-polski': { title: 'Польская', details: 'Сярэдні ўзровень (A2–B1)' },
  'language:belaruskaia-mova': { title: 'Беларуская', details: 'Родная' },
  'language:russkij-iazyk': { title: 'Руская', details: 'Родная' },

  /* --- Positions ---------------------------------------------------------- */

  'experience:jdg-aliaksei-niamkovich': {
    subtitle: 'Распрацоўшчык React Native',
    same: ['title'],
  },
  'experience:akveo': {
    same: ['title'],
    subtitle: 'Распрацоўшчык мабільных дадаткаў',
    location: 'Менск, Беларусь. Беласток, Польшча.',
  },
  'experience:hqsoftware': {
    same: ['title'],
    subtitle: 'Фронтэнд-распрацоўшчык',
    location: 'Менск, Беларусь',
  },
  'experience:daroo': {
    same: ['title'],
    subtitle: 'Фронтэнд-распрацоўшчык, UI/UX-дызайнер',
    location: 'Менск, Беларусь',
  },

  /* --- Projects ----------------------------------------------------------- */

  'project:smart-caravan': {
    same: ['title'],
    location: 'Беласток, Польшча',
    summary:
      'Мабільны дадатак-кампаньён для жылых прычэпаў і аўтадамоў. Дае доступ да функцый транспартнага сродку і жылой зоны: кандыцыянавання, ацяплення, асвятлення і стану сістэм. Злучаецца са Smart Control Unit (SCU) прычэпа праз Bluetooth (BLE) і сінхранізуе даныя з хмарнымі сэрвісамі. Гэта white-label рашэнне, наладжанае пад некалькі брэндаў і распаўсюджанае праз App Store і Google Play.',
    highlights: [
      '**Тэхналогіі:** React Native, TypeScript, UI Kitten, MobX, React Navigation, Firebase, Bitrise',
      'Наладка і суправаджэнне CI/CD у Bitrise',
      'Інтэграцыя з хмарай і сінхранізацыя даных',
      'White-label архітэктура для некалькіх брэндаў адразу',
      'Інтэграцыя з абсталяваннем транспартнага сродку праз BLE',
      'Распрацоўка крос-платформавага дадатку (iOS і Android)',
      'Укараненне цэнтралізаванай платформы перакладаў Crowdin',
      'Сканаванне QR-кодаў праз камеру',
      'Справаздачнасць пра збоі і маніторынг',
      'Інтэграцыя платформы дэеплінкаў — спачатку Firebase, потым Branch.io',
    ],
  },
  'project:a-hipaa-compliant-platform-for-opioid-crisis-response-teams': {
    title:
      '[HIPAA-сумяшчальная платформа для каманд рэагавання на опіоідны крызіс](https://www.akveo.com/case-study-ai/goldie-health)',
    location: 'Беласток, Польшча',
    summary:
      'Goldie Health — лічбавая платформа аховы здароўя для агенцый, якія выяўляюць і суправаджаюць людзей з рызыкай перадазіроўкі опіоідамі. Платформа дапамагае камандам рэагавання аказваць персаналізаваную дапамогу, інтэгруючыся з электроннымі справаздачамі пра дагляд пацыента (ePCR), электроннымі медыцынскімі картамі (EHR) і мясцовымі сеткамі сацыяльнай дапамогі. Яна таксама ўлічвае перашкоды да лячэння — сацыяльныя чыннікі кшталту нестабільнага жылля ці фінансавых цяжкасцяў. Прапаноўваючы адаптыўныя маршруты дапамогі і забяспечваючы адпаведнасць HIPAA і 42 CFR Part 2, Goldie дазваляе бяспечна абменьвацца данымі медыцынскім установам і сацыяльным службам.',
    highlights: [
      '**Тэхналогіі:** React Native (Expo), React, MobX, EAS',
      'Праца ў афлайн-рэжыме',
      'Дынамічная сістэма формаў на аснове валідацыі JSON Schema',
      'Аўтаматызацыя зборкі новых білдаў праз GitHub Actions і Expo Application Services',
    ],
  },

  /* --- Education ---------------------------------------------------------- */

  'education:higher-state-college-of-communication-computer-systems-networking-and-telecommunications':
    {
      title: 'Вышэйшы дзяржаўны каледж сувязі',
      subtitle: 'Спецыяліст па тэлекамунікацыях — камп’ютарныя сеткі і тэлекамунікацыі',
      location: 'Менск, Беларусь',
      highlights: [
        'Прынцыпы лічбавай і аналагавай перадачы даных, кадаванне і мадуляцыя',
        'Мадэль OSI і яе практычнае прымяненне ў сеткавых архітэктурах',
        'Асноўныя пратаколы перадачы даных (TCP/IP, UDP, HTTP і іншыя)',
        'Сістэмы сувязі розных галін: інтэрнэт, тэлефанія, тэлебачанне',
        'Асновы праектавання і працы сетак',
        'Базавыя навыкі дыягностыкі і аналізу сетак',
      ],
    },
  'education:higher-state-college-of-communication-economics': {
    title: 'Вышэйшы дзяржаўны каледж сувязі',
    subtitle: 'Эканоміка',
    location: 'Менск, Беларусь',
  },
};
