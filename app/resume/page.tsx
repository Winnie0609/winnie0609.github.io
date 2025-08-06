'use client';

import LanguageSwitch from '@/components/LanguageSwitch';
import { useLanguage } from '@/components/LanguageProvider';

const Resume = () => {
  const { language: currentLanguage } = useLanguage();

  return (
    <div className="flex flex-col gap-4">
      <LanguageSwitch />
      {currentLanguage === 'zh' ? (
        <a href="/resume.pdf" download>
          下載我的履歷
        </a>
      ) : (
        <a href="/resume.pdf" download>
          download my resume
        </a>
      )}
    </div>
  );
};

export default Resume;
