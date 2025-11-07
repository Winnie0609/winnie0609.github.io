'use client';

import LanguageSwitch from '@/components/LanguageSwitch';
import { useLanguage } from '@/components/LanguageProvider';

const Resume = () => {
  const { language: currentLanguage } = useLanguage();

  const pdfFile = '/pdfs/onghuini-frontend.pdf';
  const downloadText =
    currentLanguage === 'zh' ? '下載履歷' : 'Download Resume';

  return (
    <div className="flex flex-col gap-4">
      <LanguageSwitch />

      <a className="text-blue-500 underline" href={pdfFile} download>
        {downloadText}
      </a>

      <div className="w-full">
        <iframe
          src={`${pdfFile}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          className="w-full aspect-[210/297]"
          title={currentLanguage === 'zh' ? '履歷預覽' : 'Resume Preview'}
        />
      </div>
    </div>
  );
};

export default Resume;
