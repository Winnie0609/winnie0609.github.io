import MDXContent from '@/components/MDXContent';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const AboutPage = async () => {
  // Read the about.md file
  const aboutPath = path.join(process.cwd(), 'content', 'about.md');
  const aboutFile = fs.readFileSync(aboutPath, 'utf8');
  const { content } = matter(aboutFile);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <MDXContent source={content} />
    </div>
  );
};

export default AboutPage;

export const metadata = {
  title: 'About',
  description: 'About me',
};
