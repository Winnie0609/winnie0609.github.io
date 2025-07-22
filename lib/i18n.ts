export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh';

export const translations = {
  zh: {
    nav: {
      home: '首頁',
      about: '關於',
      projects: '專案',
      writings: '文章',
      weeknotes: '周記',
    },
    home: {
      title: 'Winnie 的个人网站',
      developer: 'Winnie 是開發者',
      explorer: 'Winnie 是探索者',
      hotpotLover: 'Winnie 是火鍋愛好者',
    },
    about: {
      title: '關於我',
      description: '了解更多關於我的信息',
    },
    projects: {
      title: '專案',
      description: '我參與過的專案和貢獻',
      subtitle: '這裡是我參與過的一些專案。',
    },
    writings: {
      title: '文章',
      description: '技術文章和思考',
    },
    weeknotes: {
      title: '周記',
      description: '每周的記錄和思考',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      writings: 'Writings',
      weeknotes: 'Weeknotes',
    },
    home: {
      title: "Winnie's Personal Website",
      developer: 'Winnie the developer',
      explorer: 'Winnie the explorer',
      hotpotLover: 'Winnie the hot pot lover',
    },
    about: {
      title: 'About',
      description: 'About me',
    },
    projects: {
      title: 'Projects',
      description: 'Portfolio of projects and contributions.',
      subtitle: "Here are some of the projects I've worked on.",
    },
    writings: {
      title: 'Writings',
      description: 'Technical articles and thoughts',
    },
    weeknotes: {
      title: 'Weeknotes',
      description: 'Weekly records and reflections',
    },
  },
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
