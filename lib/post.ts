import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

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
  readingTime: number;
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
    readingTime:
      readingTime(content).minutes < 1
        ? 1
        : Math.ceil(readingTime(content).minutes),
  };
};

const getTags = async (): Promise<string[]> => {
  const posts = await getPosts();
  const tags = posts
    .map((post) => post.data.tags)
    .flat()
    .filter(Boolean) as string[];
  return [...new Set(tags)];
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

interface adjacentPosts {
  previous: postData | null;
  next: postData | null;
}

interface adjacentWeekNotes {
  previous: weekNoteData | null;
  next: weekNoteData | null;
}

const getAdjacentPosts = async (
  currentSlug: string
): Promise<adjacentPosts> => {
  const allPosts = await getPosts();

  // Sort posts by date (newest first, same as writings page)
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const currentIndex = sortedPosts.findIndex(
    (post) => post.data.slug === currentSlug
  );

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  return {
    previous: previousPost,
    next: nextPost,
  };
};

const getAdjacentWeekNotes = async (
  currentSlug: string
): Promise<adjacentWeekNotes> => {
  const allWeekNotes = await getWeekNotes();

  // Sort weeknotes by date (newest first, same as weeknotes page)
  const sortedWeekNotes = allWeekNotes.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const currentIndex = sortedWeekNotes.findIndex(
    (weekNote) => weekNote.data.slug === currentSlug
  );

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previousWeekNote =
    currentIndex > 0 ? sortedWeekNotes[currentIndex - 1] : null;
  const nextWeekNote =
    currentIndex < sortedWeekNotes.length - 1
      ? sortedWeekNotes[currentIndex + 1]
      : null;

  return {
    previous: previousWeekNote,
    next: nextWeekNote,
  };
};

export {
  getPosts,
  getPostBySlug,
  getWeekNotes,
  getWeekNoteBySlug,
  getTags,
  getAdjacentPosts,
  getAdjacentWeekNotes,
};
