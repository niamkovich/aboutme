import type { Locale } from '../../lib/locale';

export interface HomeParagraph {
  /** Inline markdown. */
  text: string;
  /** Optional smaller follow-up note rendered under the paragraph. */
  side?: string;
}

export interface HomeCopy {
  title: string;
  lede: string;
  description: string;
  paragraphs: HomeParagraph[];
}

/**
 * The Belarusian copy is the original hand-written text from the design source;
 * the English is a translation of it, not of cv.yaml. Keep them in step.
 */
export const home: Record<Locale, HomeCopy> = {
  be: {
    title: 'Аляксей Нямковіч',
    lede: 'Менск, Беларусь.',
    description:
      'Аляксей Нямковіч — адмысловец праграмнага забеспячэння. Крос-плятформавыя мабільныя аплікацыі: React Native, TypeScript, Expo.',
    paragraphs: [
      {
        text: 'Больш за дзесяць гадоў у мабільнай і вэб-распрацоўцы. Асноўная спецыялізацыя — крос-плятформавыя мабільныя аплікацыі на React-Native',
      },
    ],
  },
  en: {
    title: 'Aliaksei Niamkovich',
    lede: 'Miensk, Biełaruś',
    description:
      'Aliaksei Niamkovich — software engineer. Cross-platform mobile applications: React Native, TypeScript, Expo.',
    paragraphs: [
      {
        text: 'More than ten years in mobile and web development. The main specialisation is cross-platform mobile applications: React Native, TypeScript, Expo.',
      },
    ],
  },
};
