import type { Locale } from '../../lib/locale';

export interface AppsPageCopy {
  title: string;
  lede: string;
  description: string;
  websiteLink: string;
  privacyLink: string;
  supportLink: string;
}

export const appsPage: Record<Locale, AppsPageCopy> = {
  be: {
    title: 'Аплікацыі',
    lede: 'Мабільныя аплікацыі, якія я распрацоўваю.',
    description:
      'Мабільныя аплікацыі Аляксея Нямковіча: спасылкі на App Store, сайты і палітыкі прыватнасці.',
    websiteLink: 'Сайт',
    privacyLink: 'Палітыка прыватнасці',
    supportLink: 'Падтрымка',
  },
  en: {
    title: 'Apps',
    lede: 'Mobile apps I build.',
    description:
      "Aliaksei Niamkovich's mobile apps: App Store links, websites and privacy policies.",
    websiteLink: 'Website',
    privacyLink: 'Privacy policy',
    supportLink: 'Support',
  },
};
