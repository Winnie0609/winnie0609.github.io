'use client';

import { useLanguage } from './LanguageProvider';

export default function LanguageSwitch() {
  const { language, setLanguage, mounted } = useLanguage();

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex gap-2 mb-4 cursor-pointer items-center">
        <div className="text-xs text-content-primary border-b-2 border-content-primary">
          ZH
        </div>
        <div>|</div>
        <div className="text-xs border-b-2 border-transparent text-content-tertiary">
          EN
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 mb-4 cursor-pointer items-center">
      <div
        className={`text-xs ${
          language === 'zh'
            ? 'text-content-primary border-b-2 border-content-primary'
            : 'border-b-2 border-transparent text-content-tertiary'
        }`}
        onClick={() => setLanguage('zh')}
      >
        ZH
      </div>
      <div>|</div>
      <div
        className={`text-xs ${
          language === 'en'
            ? 'text-content-primary border-b-2 border-primary'
            : 'border-b-2 border-transparent text-content-tertiary'
        }`}
        onClick={() => setLanguage('en')}
      >
        EN
      </div>
    </div>
  );
}
