import rawCv from '../../cv.yaml';
import { beOverlay } from '../i18n/cv.be';
import { unwrap } from '../lib/inline-markdown';
import type { Locale } from '../i18n/ui';

/* --- Shape of cv.yaml (rendercv format) ---------------------------------- */

interface RawLabelled {
  label?: string;
  details?: string;
}

interface RawDated {
  start_date?: string | number | Date;
  end_date?: string | number | Date;
  location?: string;
  summary?: string;
  highlights?: string[] | null;
}

interface RawExperience extends RawDated {
  company?: string;
  position?: string;
}

interface RawEducation extends RawDated {
  institution?: string;
  area?: string;
  degree?: string;
}

interface RawProject extends RawDated {
  name?: string;
}

interface RawCv {
  cv: {
    name: string;
    headline?: string;
    location?: string;
    email?: string;
    phone?: string;
    social_networks?: { network: string; username: string }[] | null;
    sections: {
      professional_summary?: string[];
      skills?: RawLabelled[];
      education?: RawEducation[];
      experience?: RawExperience[];
      projects?: RawProject[];
      languages?: RawLabelled[];
    };
  };
}

const source = (rawCv as RawCv).cv;

/* --- Normalised, locale-aware output ------------------------------------- */

export interface Entry {
  key: string;
  /** Title text, possibly containing inline markdown (links). */
  title: string;
  subtitle?: string;
  location?: string;
  summary?: string;
  highlights: string[];
  start?: string;
  end?: string;
}

export interface Labelled {
  key: string;
  label: string;
  details: string;
}

export interface Contact {
  name: string;
  headline: string;
  location: string;
  email?: string;
  phone?: string;
  links: { network: string; username: string; href: string }[];
}

/* --- Helpers -------------------------------------------------------------- */

/** Cyrillic labels would otherwise slug down to an empty string. */
const TRANSLIT: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'h',
  д: 'd',
  е: 'e',
  ё: 'io',
  є: 'ie',
  ж: 'zh',
  з: 'z',
  и: 'i',
  і: 'i',
  ї: 'i',
  й: 'j',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ў: 'w',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'iu',
  я: 'ia',
  ґ: 'g',
};

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\u0400-\u04ff]/g, (char) => TRANSLIT[char] ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** YAML may hand back a Date for full ISO dates; everything else is a string. */
function asDateString(value: string | number | Date | undefined): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 7);
  return String(value).trim() || undefined;
}

function text(value: string | undefined): string | undefined {
  const trimmed = value ? unwrap(value) : '';
  return trimmed || undefined;
}

/**
 * Belarusian text comes from the overlay in src/i18n/cv.be.ts, keyed by a slug
 * derived from the entry's own name. Anything the overlay does not translate
 * falls through to the English source, so a missing translation degrades to
 * readable English rather than a blank.
 */
function localise<T extends string | string[] | undefined>(
  locale: Locale,
  key: string,
  field: 'title' | 'subtitle' | 'location' | 'summary' | 'highlights' | 'details',
  fallback: T,
): T {
  if (locale === 'en') return fallback;
  const entry = beOverlay[key];
  const translated = entry?.[field];
  if (translated === undefined) {
    const deliberate = entry?.same?.includes(field) ?? false;
    const empty =
      fallback === undefined ||
      fallback === '' ||
      (Array.isArray(fallback) && fallback.length === 0);
    if (import.meta.env.DEV && !deliberate && !empty) {
      console.warn(`[cv] missing be translation: ${key}.${field}`);
    }
    return fallback;
  }
  return translated as T;
}

const MONTHS: Record<Locale, string[]> = {
  be: ['студз', 'лют', 'сак', 'крас', 'мая', 'чэрв', 'ліп', 'жн', 'вер', 'кастр', 'ліст', 'снеж'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const PRESENT: Record<Locale, string> = { be: 'цяпер', en: 'present' };

function formatDate(value: string | undefined, locale: Locale): string | undefined {
  if (!value) return undefined;
  if (value.toLowerCase() === 'present') return PRESENT[locale];
  const match = /^(\d{4})(?:-(\d{2}))?/.exec(value);
  if (!match) return value;
  const [, year, month] = match;
  if (!month) return year;
  const name = MONTHS[locale][Number(month) - 1];
  return name ? `${name} ${year}` : year;
}

export function formatPeriod(entry: Entry, locale: Locale): string | undefined {
  const start = formatDate(entry.start, locale);
  const end = formatDate(entry.end, locale);
  if (start && end) return `${start} — ${end}`;
  return start ?? end;
}

/* --- Public accessors ----------------------------------------------------- */

export function getContact(locale: Locale): Contact {
  const networks = source.social_networks ?? [];
  return {
    name: localise(locale, 'meta:name', 'title', source.name),
    headline: localise(locale, 'meta:headline', 'title', source.headline ?? ''),
    location: localise(locale, 'meta:location', 'title', source.location ?? ''),
    email: source.email,
    phone: source.phone,
    links: networks.map((entry) => ({
      ...entry,
      href:
        entry.network.toLowerCase() === 'linkedin'
          ? `https://www.linkedin.com/in/${entry.username}`
          : `https://github.com/${entry.username}`,
    })),
  };
}

export function getSummary(locale: Locale): string[] {
  const paragraphs = (source.sections.professional_summary ?? []).map((p) => unwrap(p));
  return localise(locale, 'meta:summary', 'highlights', paragraphs);
}

function labelled(items: RawLabelled[] | undefined, locale: Locale, prefix: string): Labelled[] {
  return (items ?? []).map((item) => {
    const label = (item.label ?? '').replace(/:$/, '').trim();
    const key = `${prefix}:${slug(label)}`;
    return {
      key,
      label: localise(locale, key, 'title', label),
      details: localise(locale, key, 'details', (item.details ?? '').trim()),
    };
  });
}

export function getSkills(locale: Locale): Labelled[] {
  return labelled(source.sections.skills, locale, 'skill');
}

export function getLanguages(locale: Locale): Labelled[] {
  return labelled(source.sections.languages, locale, 'language');
}

function entryFrom(
  key: string,
  locale: Locale,
  title: string,
  subtitle: string | undefined,
  raw: RawDated,
): Entry {
  return {
    key,
    title: localise(locale, key, 'title', title),
    subtitle: localise(locale, key, 'subtitle', subtitle),
    location: localise(locale, key, 'location', text(raw.location)),
    summary: localise(locale, key, 'summary', text(raw.summary)),
    highlights: localise(locale, key, 'highlights', (raw.highlights ?? []).map(unwrap)),
    start: asDateString(raw.start_date),
    end: asDateString(raw.end_date),
  };
}

export function getExperience(locale: Locale): Entry[] {
  return (source.sections.experience ?? []).map((raw) =>
    entryFrom(
      `experience:${slug(raw.company ?? '')}`,
      locale,
      raw.company ?? '',
      raw.position,
      raw,
    ),
  );
}

export function getEducation(locale: Locale): Entry[] {
  return (source.sections.education ?? []).map((raw) =>
    entryFrom(
      `education:${slug(`${raw.institution ?? ''} ${raw.area ?? ''}`)}`,
      locale,
      raw.institution ?? '',
      [raw.degree, raw.area].filter(Boolean).join(', ') || undefined,
      raw,
    ),
  );
}

export function getProjects(locale: Locale): Entry[] {
  return (source.sections.projects ?? []).map((raw) => {
    const name = unwrap(raw.name ?? '');
    // Project names are markdown links; slug the label, not the URL.
    const label = /\[([^\]]+)\]/.exec(name)?.[1] ?? name;
    return entryFrom(`project:${slug(label)}`, locale, name, undefined, raw);
  });
}
