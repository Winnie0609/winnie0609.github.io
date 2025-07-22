import { getTranslations, type Locale } from '@/lib/i18n';

interface ProjectsPageProps {
  params: {
    lang: Locale;
  };
}

export default function ProjectsPage({ params }: ProjectsPageProps) {
  const t = getTranslations(params.lang);

  const projects = [
    {
      title: 'Project 1',
      slug: 'project-1',
      description: 'Description of project 1',
      link: 'https://',
    },
    {
      title: 'Project 2',
      slug: 'project-2',
      description: 'Description of project 2',
      link: 'https://',
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4">
        <p className="text-content-tertiary">{t.projects.subtitle}</p>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: ProjectsPageProps) {
  const t = getTranslations(params.lang);

  return {
    title: t.projects.title,
    description: t.projects.description,
  };
}
