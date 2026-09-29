export type Locale = 'be' | 'en';

export const LOCALES: Locale[] = ['be', 'en'];

export const DEFAULT_LOCALE: Locale = 'be';

/** Which nav item (if any) should be marked current for a given page. */
export type NavSection = '' | 'cv' | 'apps' | 'blog' | 'contact' | 'privacy';

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

/** The other locale — there are only two, so a switch is a toggle. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'be' ? 'en' : 'be';
}

/** Builds a path for a locale without depending on the current URL shape. */
export function localePath(locale: Locale, path: string): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  // Trailing slash matches Astro's static output (/cv/index.html), so canonical
  // URLs point at the address the host serves rather than one it redirects.
  return path ? `${prefix}/${path}/` : `${prefix}/`;
}
