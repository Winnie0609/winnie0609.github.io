import Link from 'next/link';
import { getWeekNotes } from '@/lib/post';

const WeekNotePage = async () => {
  const weekNotesData = await getWeekNotes();
  const sortedWeekNotes = weekNotesData.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  // Group weeknotes by year
  const weekNotesByYear = sortedWeekNotes.reduce((acc, weekNote) => {
    const year = new Date(weekNote.data.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(weekNote);
    return acc;
  }, {} as Record<string, typeof sortedWeekNotes>);

  const years = Object.keys(weekNotesByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <p className="text-content-tertiary">
          分享一些小事，每週一次（盡量）。
        </p>
      </div>

      <div className="space-y-12 mt-12">
        {years.map((year) => (
          <div key={year} className="relative">
            <div className="absolute pl-5 -top-5 -left-5 -z-10">
              <h2 className="text-8xl font-bold text-muted-foreground/30 opacity-50 select-none">
                {year}
              </h2>
            </div>

            {/* WeekNotes for this year - Grid layout */}
            <div className="relative z-10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weekNotesByYear[year].map((weekNote, index) => {
                  // Extract week number from slug or use reverse index
                  const weekNumber =
                    weekNote.data.slug.match(/week-(\d+)/)?.[1] ||
                    weekNotesByYear[year].length - index;
                  const formattedDate = new Date(
                    weekNote.data.date
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <Link
                      key={weekNote.data.slug}
                      href={`/weeknotes/${weekNote.data.slug}`}
                      className="group block px-8 py-4 text-center duration-200 rounded-lg"
                    >
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                          #{weekNumber}
                        </h2>
                        <p className="text-content-secondary">
                          {formattedDate}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {sortedWeekNotes.length === 0 && (
          <p className="text-content-tertiary text-center py-8">
            No weeknotes yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
};

export default WeekNotePage;
