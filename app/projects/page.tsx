import Link from 'next/link';

const ProjectsPage = () => {
  const projects = [
    {
      title: 'Project 1',
      slug: 'project-1',
      description: 'Description of project 1',
      link: 'https://www.google.com',
    },
    {
      title: 'Project 2',
      slug: 'project-2',
      description: 'Description of project 2',
      link: 'https://www.google.com',
    },
  ];

  return (
    <div>
      {projects.map((project) => (
        <Link href={project.link} key={project.slug}>
          <div key={project.title}>{project.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsPage;

export const metadata = {
  title: 'Projects',
  description: 'Portfolio of projects and contributions.',
};
