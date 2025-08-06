'use client';

import LanguageSwitch from '@/components/LanguageSwitch';
import { useLanguage } from '@/components/LanguageProvider';

// Define content for both languages
const content = {
  zh: {
    title: '專案',
    description: '我參與過的專案和貢獻',
    subtitle: '這裡是我參與過的一些專案。',
    projects: [],
  },
  en: {
    title: 'Projects',
    description: 'Projects I have participated in and contributed to',
    subtitle: 'Here are some projects I have been involved in.',
    projects: [],
  },
};

export default function Projects() {
  const { language: currentLanguage } = useLanguage();

  const currentContent = content[currentLanguage];

  return (
    <div>
      {/* <LanguageSwitch />

      <div className="flex flex-col gap-4">
        <p className="text-content-tertiary">{currentContent.subtitle}</p>
      </div> */}

      <p className="text-content-tertiary">正在建立中......</p>
    </div>
  );
}
