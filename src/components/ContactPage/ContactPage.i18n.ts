import type { Locale } from '../../lib/locale';

export interface ContactPageCopy {
  title: string;
  description: string;
}

export const contactPage: Record<Locale, ContactPageCopy> = {
  be: {
    title: 'Кантакты',
    description: 'Кантактныя дадзеныя Аляксея Нямковіча: пошта, тэлефон, сацсеткі.',
  },
  en: {
    title: 'Contact',
    description: "Aliaksei Niamkovich's contact details: email, phone, social links.",
  },
};
