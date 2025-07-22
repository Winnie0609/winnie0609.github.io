import { getTranslations, type Locale } from '@/lib/i18n';

interface HomePageProps {
  params: {
    lang: Locale;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const t = getTranslations(params.lang);

  return (
    <div>
      <p>{t.home.developer}</p>
      <p>{t.home.explorer}</p>
      <p>{t.home.hotpotLover}</p>
    </div>
  );
}

export async function generateMetadata({ params }: HomePageProps) {
  const t = getTranslations(params.lang);

  return {
    title: t.home.title,
    description: t.home.title,
  };
}
