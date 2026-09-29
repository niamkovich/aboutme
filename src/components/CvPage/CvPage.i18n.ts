import type { Locale } from '../../lib/locale';

export interface CvPageCopy {
  title: string;
  description: string;
  sectionSummary: string;
  sectionSkills: string;
  sectionExperience: string;
  sectionProjects: string;
  sectionEducation: string;
  sectionLanguages: string;
  sectionContact: string;
}

export const cvPage: Record<Locale, CvPageCopy> = {
  be: {
    title: 'Досьвед',
    description: 'Досьвед Аляксея Нямковіча: праекты, месцы працы, тэхналогіі і адукацыя.',
    sectionSummary: 'Коратка',
    sectionSkills: 'Тэхналёгіі',
    sectionExperience: 'Месцы працы',
    sectionProjects: 'Праекты',
    sectionEducation: 'Адукацыя',
    sectionLanguages: 'Мовы',
    sectionContact: 'Кантакты',
  },
  en: {
    title: 'Work',
    description:
      "Aliaksei Niamkovich's work history: projects, positions, technologies and education.",
    sectionSummary: 'Summary',
    sectionSkills: 'Technologies',
    sectionExperience: 'Positions',
    sectionProjects: 'Projects',
    sectionEducation: 'Education',
    sectionLanguages: 'Languages',
    sectionContact: 'Contact',
  },
};
