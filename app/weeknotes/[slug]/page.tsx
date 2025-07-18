import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { getWeekNoteBySlug, getWeekNotes } from '@/lib/post';
interface WeekNoteFrontmatter {
  title: string;
  date: string;
  slug: string;
  description?: string;
  tags?: string[];
}

interface WeekNoteData {
  data: WeekNoteFrontmatter;
  content: string;
}

interface PageProps {
  params: { slug: string };
}

const WeekNotePostPage = async ({ params }: PageProps) => {
  try {
    const weekNoteData = await getWeekNoteBySlug(params.slug);

    if (!weekNoteData) {
      redirect('/weeknotes');
    }

    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <Link
            href="/weeknotes"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            cd..
          </Link>

          <h1 className="text-4xl font-bold mb-4">{weekNoteData.data.title}</h1>

          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <time dateTime={weekNoteData.data.date}>
              {new Date(weekNoteData.data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          {weekNoteData.data.description && (
            <p className="text-xl text-gray-700 mb-6">
              {weekNoteData.data.description}
            </p>
          )}

          {weekNoteData.data.tags && weekNoteData.data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {weekNoteData.data.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <MDXRemote source={weekNoteData.content} />
        </div>
      </article>
    );
  } catch (error) {
    console.log('error', error);
    redirect('/weeknote');
  }
};

export default WeekNotePostPage;

// Generate static params for all weeknotes
export async function generateStaticParams() {
  const weeknotes = await getWeekNotes();
  return weeknotes.map((weekNote) => ({
    slug: weekNote.data.slug,
  }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }: PageProps) {
  try {
    const weekNote = await getWeekNoteBySlug(params.slug);
    const weekNoteData = weekNote as WeekNoteData;

    return {
      title: weekNoteData.data.title,
      description:
        weekNoteData.data.description || `WeekNote: ${weekNoteData.data.title}`,
      openGraph: {
        title: weekNoteData.data.title,
        description: weekNoteData.data.description,
        type: 'article',
        publishedTime: weekNoteData.data.date,
        tags: weekNoteData.data.tags,
      },
    };
  } catch (error) {
    return {
      title: 'WeekNote Not Found',
      description: 'The requested weeknote could not be found.',
    };
  }
}
