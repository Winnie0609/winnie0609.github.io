import { redirect } from 'next/navigation';
import Link from 'next/link';
import MDXContent from '@/components/MDXContent';
import {
  getWeekNoteBySlug,
  getWeekNotes,
  getAdjacentWeekNotes,
} from '@/lib/post';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const WeekNotePostPage = async ({ params }: PageProps) => {
  try {
    const resolvedParams = await params;
    const [weekNoteData, adjacentWeekNotes] = await Promise.all([
      getWeekNoteBySlug(resolvedParams.slug),
      getAdjacentWeekNotes(resolvedParams.slug),
    ]);
    const weekNumber = weekNoteData.data.slug.match(/week-(\d+)/)?.[1];

    if (!weekNoteData) {
      redirect('/weeknotes');
    }

    return (
      <>
        <h1 className="text-3xl font-bold max-w-4xl">#{weekNumber}</h1>

        <div className="flex flex-row gap-2 mt-2 border-b border-border-light pb-4">
          <div className="flex flex-row gap-2">
            <span className="text-sm text-content-tertiary">
              {new Date(weekNoteData.data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        <article className="max-w-4xl mx-auto py-8">
          <MDXContent source={weekNoteData.content} />
        </article>

        {/* Navigation to next and previous weeknotes */}
        <div className="flex justify-between items-start py-8 border-t border-border-light mt-8 gap-10">
          <div className="flex-1">
            {adjacentWeekNotes.next && (
              <Link
                href={`/weeknotes/${adjacentWeekNotes.next.data.slug}`}
                className="group flex flex-col items-start text-sm hover:text-primary transition-colors"
              >
                <span className="text-xs text-content-tertiary uppercase tracking-wide">
                  <ArrowLeftIcon className="w-4 h-4" />
                </span>
                <span className="mt-1 group-hover:underline">
                  {adjacentWeekNotes.next.data.title}
                </span>
              </Link>
            )}
          </div>

          <div className="flex-1 text-right">
            {adjacentWeekNotes.previous && (
              <Link
                href={`/weeknotes/${adjacentWeekNotes.previous.data.slug}`}
                className="group flex flex-col items-end text-sm hover:text-primary transition-colors"
              >
                <span className="text-xs text-content-tertiary uppercase tracking-wide">
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
                <span className="mt-1 group-hover:underline">
                  {adjacentWeekNotes.previous.data.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.log('error', error);
    redirect('/weeknotes');
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

export const metadata = {
  title: 'WeekNote',
  description: 'WeekNote',
};
