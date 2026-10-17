import type { Locale } from '../lib/locale';

export interface AppStoreLink {
  platform: 'ios';
  url: string;
}

/** The app's own pages. Privacy and support live on its site, not here. */
export interface AppLinks {
  website: string;
  privacy: string;
  support: string;
}

export interface AppCopy {
  name: string;
  tagline: string;
  description: string;
}

export interface AppEntry {
  slug: string;
  storeLinks: AppStoreLink[];
  links: AppLinks;
  copy: Record<Locale, AppCopy>;
}

export type App = AppCopy & {
  slug: string;
  storeLinks: AppStoreLink[];
  links: AppLinks;
};

/** Only published apps go here: every link below must resolve. */
const apps: AppEntry[] = [
  {
    slug: 'czarha',
    storeLinks: [{ platform: 'ios', url: 'https://apps.apple.com/app/id6811606555' }],
    links: {
      website: 'https://czarha.online/',
      privacy: 'https://czarha.online/privacy',
      support: 'https://czarha.online/support',
    },
    copy: {
      be: {
        name: 'Czarha',
        tagline: 'Чэргі на выезд з Беларусі',
        description:
          'Паказвае чаргу ў зоне чакання на мяжы з Польшчай, Літвой і Латвіяй, колькі насамрэч доўжыцца пераход паводле справаздач кіроўцаў і калі час выязджаць да пункта пропуску. Без рэгістрацыі, рэкламы і трэкераў. Неафіцыйны сэрвіс.',
      },
      en: {
        name: 'Czarha',
        tagline: 'Belarus border wait times',
        description:
          "Shows the waiting-zone queue at the border with Poland, Lithuania and Latvia, how long the crossing really takes from drivers' reports, and when to set off for the checkpoint. No sign-up, ads or trackers. An unofficial service.",
      },
    },
  },
];

export function getApps(locale: Locale): App[] {
  return apps.map((app) => ({
    slug: app.slug,
    storeLinks: app.storeLinks,
    links: app.links,
    ...app.copy[locale],
  }));
}
