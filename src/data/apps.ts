import type { Locale } from '../lib/locale';

export interface AppStoreLink {
  platform: 'ios' | 'android';
  /** null = not published yet, so the link renders as "coming soon" instead of a dead href. */
  url: string | null;
}

export interface AppCopy {
  name: string;
  tagline: string;
  description: string;
  /** Inline-markdown paragraphs for the privacy policy body. */
  privacyBody: string[];
}

export interface AppEntry {
  slug: string;
  storeLinks: AppStoreLink[];
  lastUpdated: string;
  copy: Record<Locale, AppCopy>;
}

export type App = AppCopy & {
  slug: string;
  storeLinks: AppStoreLink[];
};

export type AppWithMeta = App & {
  lastUpdated: string;
};

/**
 * Placeholder entries — no real apps published yet. Names, taglines and
 * privacy text below are scaffolding to be replaced once there's a real app.
 */
const apps: AppEntry[] = [
  {
    slug: 'placeholder-app-one',
    storeLinks: [
      { platform: 'ios', url: null },
      { platform: 'android', url: null },
    ],
    lastUpdated: '2026-09-27',
    copy: {
      be: {
        name: 'Дадатак-заглушка 1',
        tagline: 'Кароткі подпіс дадатку — да заканчэння.',
        description: 'Апісанне дадатку зʼявіцца тут, калі ён будзе гатовы да публікацыі.',
        privacyBody: [
          'Гэта чарнавы змест-заглушка. Рэальная палітыка прыватнасці для гэтага дадатку будзе дададзена да публікацыі ў App Store і Google Play.',
        ],
      },
      en: {
        name: 'Placeholder App One',
        tagline: 'A short tagline for the app — to be finalised.',
        description: 'A description of the app will go here once it is ready to publish.',
        privacyBody: [
          'This is placeholder content. The real privacy policy for this app will be added before it is published to the App Store and Google Play.',
        ],
      },
    },
  },
  {
    slug: 'placeholder-app-two',
    storeLinks: [
      { platform: 'ios', url: null },
      { platform: 'android', url: null },
    ],
    lastUpdated: '2026-09-27',
    copy: {
      be: {
        name: 'Дадатак-заглушка 2',
        tagline: 'Кароткі подпіс дадатку — да заканчэння.',
        description: 'Апісанне дадатку зʼявіцца тут, калі ён будзе гатовы да публікацыі.',
        privacyBody: [
          'Гэта чарнавы змест-заглушка. Рэальная палітыка прыватнасці для гэтага дадатку будзе дададзена да публікацыі ў App Store і Google Play.',
        ],
      },
      en: {
        name: 'Placeholder App Two',
        tagline: 'A short tagline for the app — to be finalised.',
        description: 'A description of the app will go here once it is ready to publish.',
        privacyBody: [
          'This is placeholder content. The real privacy policy for this app will be added before it is published to the App Store and Google Play.',
        ],
      },
    },
  },
];

export function getAppSlugs(): string[] {
  return apps.map((app) => app.slug);
}

export function getApps(locale: Locale): App[] {
  return apps.map((app) => ({ slug: app.slug, storeLinks: app.storeLinks, ...app.copy[locale] }));
}

export function getApp(locale: Locale, slug: string): AppWithMeta | undefined {
  const app = apps.find((entry) => entry.slug === slug);
  if (!app) return undefined;
  return {
    slug: app.slug,
    storeLinks: app.storeLinks,
    lastUpdated: app.lastUpdated,
    ...app.copy[locale],
  };
}
