import type { Locale } from './ui';

export interface HomeParagraph {
  /** Inline markdown. `{email}`, `{phone}`, `{linkedin}`, `{github}` are
   *  substituted from cv.yaml so contact details live in exactly one place. */
  text: string;
  /** Optional margin note, rendered as a Tufte-style sidenote. */
  side?: string;
}

export interface HomeCopy {
  title: string;
  lede: string;
  paragraphs: HomeParagraph[];
}

/**
 * The Belarusian copy is the original hand-written text from the design source;
 * the English is a translation of it, not of cv.yaml. Keep them in step.
 */
export const home: Record<Locale, HomeCopy> = {
  be: {
    title: 'Аляксей Нямковіч',
    lede: 'Адмысловец праграмнага забеспячэння. Беласток, Польшча.',
    paragraphs: [
      {
        text: 'Больш за дзесяць гадоў у мабільнай і вэб-распрацоўцы. Асноўная спецыялізацыя — крос-платформавыя мабільныя дадаткі: React Native, TypeScript, Expo.',
        side: 'Пачынаў у 2014-м як фронтэнд-распрацоўшчык і UI/UX-дызайнер, з 2020-га працую пераважна з мабільным.',
      },
      {
        text: 'Апошнія гады — інтэграцыі з IoT, ахова здароўя і аўтамабільная галіна: сувязь праз Bluetooth, сінхранізацыя з хмарнымі сэрвісамі, маштабаваныя архітэктуры і white-label прадукты для некалькіх брэндаў адразу.',
      },
      {
        text: 'Асобная частка працы — CI/CD і выпуск: Bitrise, GitHub Actions, Expo Application Services, публікацыя ў App Store і Google Play.',
        side: 'Зборка і выкладка мусяць быць сумнымі. Калі рэліз патрабуе прысутнасці чалавека, гэта яшчэ не гатовы працэс.',
      },
      {
        text: 'Найдаўжэй я працаваў над Smart Caravan — дадаткам для кіравання жылым прычэпам праз Bluetooth, — і над Goldie Health, HIPAA-сумяшчальнай платформай для каманд хуткага рэагавання.',
      },
      {
        text: 'Напісаць мне: {email} або {phone}. Таксама ёсць {linkedin} і {github}.',
      },
    ],
  },
  en: {
    title: 'Aliaksei Niamkovich',
    lede: 'Software engineer. Białystok, Poland.',
    paragraphs: [
      {
        text: 'More than ten years in mobile and web development. The main specialisation is cross-platform mobile applications: React Native, TypeScript, Expo.',
        side: 'Started in 2014 as a front-end developer and UI/UX designer; since 2020 the work has been mostly mobile.',
      },
      {
        text: 'Recent years have been IoT integrations, healthcare and automotive: communication over Bluetooth, synchronisation with cloud services, scalable architectures, and white-label products serving several brands at once.',
      },
      {
        text: 'A separate part of the job is CI/CD and release: Bitrise, GitHub Actions, Expo Application Services, shipping to the App Store and Google Play.',
        side: 'Builds and releases should be boring. If a release needs a person in the room, the process is not finished yet.',
      },
      {
        text: 'The longest stretches of my work were Smart Caravan — an app for controlling a travel trailer over Bluetooth — and Goldie Health, a HIPAA-compliant platform for emergency response teams.',
      },
      {
        text: 'Write to me: {email} or {phone}. There is also {linkedin} and {github}.',
      },
    ],
  },
};
