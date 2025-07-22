import MDXContent from '@/components/MDXContent';
import { getTranslations, type Locale } from '@/lib/i18n';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface AboutPageProps {
  params: {
    lang: Locale;
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const t = getTranslations(params.lang);

  // read about file by language
  const aboutFileName = params.lang === 'en' ? 'about-en.md' : 'about.md';
  const aboutPath = path.join(process.cwd(), 'content', aboutFileName);

  // if english file not exist, fallback to chinese file
  let aboutFile: string;
  try {
    aboutFile = fs.readFileSync(aboutPath, 'utf8');
  } catch (error) {
    const fallbackPath = path.join(process.cwd(), 'content', 'about.md');
    aboutFile = fs.readFileSync(fallbackPath, 'utf8');
  }
  const { content } = matter(aboutFile);

  return (
    <div>
      <MDXContent source={content} />
    </div>
  );
}

export async function generateMetadata({ params }: AboutPageProps) {
  const t = getTranslations(params.lang);

  return {
    title: t.about.title,
    description: t.about.description,
  };
}
