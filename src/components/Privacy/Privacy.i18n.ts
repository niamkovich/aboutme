import type { Locale } from '../../lib/locale';

// Shared by the two privacy components in this directory:
// PrivacyIndexPage.astro (/privacy) and PrivacyPolicyPage.astro (/privacy/<slug>).
export interface PrivacyPageCopy {
  indexTitle: string;
  indexLede: string;
  indexDescription: string;
  lastUpdated: string;
  contactNote: string;
  placeholderNotice: string;
}

export const privacyPage: Record<Locale, PrivacyPageCopy> = {
  be: {
    indexTitle: 'Палітыка прыватнасці',
    indexLede: 'Палітыка прыватнасці для кожнага дадатку.',
    indexDescription: 'Спасылкі на палітыку прыватнасці кожнага мабільнага дадатку.',
    lastUpdated: 'Апошняе абнаўленне',
    contactNote: 'Пытанні па прыватнасці даных можна накіраваць на',
    placeholderNotice:
      'Гэта чарнавы змест-заглушка — рэальныя дадзеныя дадатку будуць дададзены пазней.',
  },
  en: {
    indexTitle: 'Privacy policy',
    indexLede: 'A privacy policy for each app.',
    indexDescription: 'Links to the privacy policy for each mobile app.',
    lastUpdated: 'Last updated',
    contactNote: 'Questions about data privacy can be sent to',
    placeholderNotice: 'This is placeholder content — real app details will be added later.',
  },
};
