import { notFound } from 'next/navigation';
import { LanguageProvider } from '@/components/LanguageProvider';
import { isValidLocale, type Locale } from '@/lib/i18n';

interface LanguageLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  // validate language parameter
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const locale = params.lang as Locale;

  return <LanguageProvider locale={locale}>{children}</LanguageProvider>;
}
