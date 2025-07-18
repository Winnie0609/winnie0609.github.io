import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'writings');
const weekNotesDirectory = path.join(process.cwd(), 'content', 'weeknotes');

interface postsFrontmatter {
  title: string;
  date: string;
  slug: string;
  description?: string;
  tags?: string[];
}

interface postData {
  data: postsFrontmatter;
  content: string;
}

interface weekNotesFrontmatter {
  title: string;
  date: string;
  slug: string;
  description?: string;
  tags?: string[];
}

interface weekNoteData {
  data: weekNotesFrontmatter;
  content: string;
}

const getPosts = async (): Promise<postData[]> => {
  const _posts = fs.readdirSync(postsDirectory);
  const postsSlugs = _posts.map((post) => {
    return post.replace(/\.md$/, '');
  });

  const postsData: postData[] = await Promise.all(
    postsSlugs.map(async (post) => {
      const postData = await getPostBySlug(post);
      return postData;
    })
  );

  return postsData;
};

const getPostBySlug = async (slug: string): Promise<postData> => {
  const post = fs.readFileSync(path.join(postsDirectory, `${slug}.md`), 'utf8');
  const { data, content } = matter(post);

  return {
    data: data as postsFrontmatter,
    content,
  };
};

const getWeekNotes = async (): Promise<weekNoteData[]> => {
  const _weekNotes = fs.readdirSync(weekNotesDirectory);
  const weekNotesSlugs = _weekNotes.map((weekNote) => {
    return weekNote.replace(/\.md$/, '');
  });

  const weekNotesData: weekNoteData[] = await Promise.all(
    weekNotesSlugs.map(async (weekNote) => {
      const weekNoteData = await getWeekNoteBySlug(weekNote);
      return weekNoteData;
    })
  );

  return weekNotesData;
};

const getWeekNoteBySlug = async (slug: string): Promise<weekNoteData> => {
  const weekNote = fs.readFileSync(
    path.join(weekNotesDirectory, `${slug}.md`),
    'utf8'
  );
  const { data, content } = matter(weekNote);

  return {
    data: data as weekNotesFrontmatter,
    content,
  };
};

export { getPosts, getPostBySlug, getWeekNotes, getWeekNoteBySlug };
