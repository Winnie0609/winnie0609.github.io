import { redirect } from 'next/navigation';
import Link from 'next/link';
import MDXContent from '@/components/MDXContent';
import { getPostBySlug, getAdjacentPosts } from '@/lib/post';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const WritingPostPage = async ({ params }: PageProps) => {
  try {
    const resolvedParams = await params;
    const [postData, adjacentPosts] = await Promise.all([
      getPostBySlug(resolvedParams.slug),
      getAdjacentPosts(resolvedParams.slug),
    ]);

    if (!postData) {
      redirect('/writings');
    }

    return (
      <>
        <h1 className="text-3xl font-bold max-w-4xl">{postData.data.title}</h1>

        <div className="flex flex-row gap-2 mt-2 border-b border-border-light pb-4">
          <div className="flex flex-row gap-2">
            <span className="text-sm text-content-tertiary">
              {postData.data.date} •
            </span>
            <span className="text-sm text-content-tertiary">
              {postData.readingTime} min
            </span>
          </div>
        </div>

        <article className="max-w-4xl mx-auto py-8">
          <MDXContent source={postData.content} />
        </article>

        {/* Navigation to next and previous articles */}
        <div className="flex justify-between items-start py-8 border-t border-border-light mt-8 gap-10">
          <div className="flex-1">
            {adjacentPosts.next && (
              <Link
                href={`/writings/${adjacentPosts.next.data.slug}`}
                className="group flex flex-col items-start text-sm hover:text-primary transition-colors"
              >
                <span className="text-xs text-content-tertiary uppercase tracking-wide">
                  <ArrowLeftIcon className="w-4 h-4" />
                </span>
                <span className="mt-1 group-hover:underline">
                  {adjacentPosts.next.data.title}
                </span>
              </Link>
            )}
          </div>

          <div className="flex-1 text-right">
            {adjacentPosts.previous && (
              <Link
                href={`/writings/${adjacentPosts.previous.data.slug}`}
                className="group flex flex-col items-end text-sm hover:text-primary transition-colors"
              >
                <span className="text-xs text-content-tertiary uppercase tracking-wide">
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
                <span className="mt-1 group-hover:underline">
                  {adjacentPosts.previous.data.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.log('error', error);
    redirect('/writings');
  }
};

export default WritingPostPage;

export const metadata = {
  title: 'Writing Post',
  description: 'Writing Post',
};
