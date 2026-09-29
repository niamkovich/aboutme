import type { Locale } from '../../lib/locale';

export interface ContactDetailsCopy {
  contactEmail: string;
}

export const contactDetails: Record<Locale, ContactDetailsCopy> = {
  be: {
    contactEmail: 'пошта',
  },
  en: {
    contactEmail: 'email',
  },
};
