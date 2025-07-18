import Link from 'next/link';
import { getWeekNotes } from '@/lib/post';

const WeekNotePage = async () => {
  const weekNotesData = await getWeekNotes();
  const sortedWeekNotes = weekNotesData.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">WeekNotes</h1>
      <div className="space-y-4">
        {sortedWeekNotes.map((weekNote) => (
          <article key={weekNote.data.slug}>
            <Link href={`/weeknotes/${weekNote.data.slug}`}>
              <h2>{weekNote.data.title}</h2>
              <time>{new Date(weekNote.data.date).toLocaleDateString()}</time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default WeekNotePage;

export const metadata = {
  title: 'WeekNotes',
  description: 'Weekly reflections and updates',
};
