import type { Locale } from '../../lib/locale';

export interface AppsPageCopy {
  title: string;
  lede: string;
  description: string;
  comingSoon: string;
  privacyLink: string;
  placeholderNotice: string;
}

export const appsPage: Record<Locale, AppsPageCopy> = {
  be: {
    title: 'Аплікацыі',
    lede: 'Мабільныя аплікацыі, якія я распрацоўваю.',
    description: 'Мабільныя аплікацыі Аляксея Нямковіча: спасылкі на App Store і Google Play.',
    comingSoon: 'Хутка',
    privacyLink: 'Палітыка прыватнасці',
    placeholderNotice:
      'Гэта чарнавы змест-заглушка — рэальныя дадзеныя дадатку будуць дададзены пазней.',
  },
  en: {
    title: 'Apps',
    lede: 'Mobile apps I build.',
    description: "Aliaksei Niamkovich's mobile apps: App Store and Google Play links.",
    comingSoon: 'Coming soon',
    privacyLink: 'Privacy policy',
    placeholderNotice: 'This is placeholder content — real app details will be added later.',
  },
};
