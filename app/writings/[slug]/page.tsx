import { redirect } from 'next/navigation';
import Link from 'next/link';
import MDXContentServer from '@/components/MDXContentServer';
import { getPostBySlug, getAdjacentPosts, getPosts } from '@/lib/post';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Metadata } from 'next';

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
      <div className="mt-10">
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
          <MDXContentServer source={postData.content} />
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
      </div>
    );
  } catch (error) {
    console.log('error', error);
    redirect('/writings');
  }
};

export default WritingPostPage;

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.data.slug,
  }));
}

// Generate dynamic metadata for each post
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const postData = await getPostBySlug(resolvedParams.slug);

    if (!postData) {
      return {
        title: 'Post Not Found',
        description: 'The requested post could not be found.',
      };
    }

    return {
      title: postData.data.title,
      description:
        postData.data.description || `Read about ${postData.data.title}`,
      openGraph: {
        title: postData.data.title,
        description:
          postData.data.description || `Read about ${postData.data.title}`,
        type: 'article',
        publishedTime: postData.data.date,
        tags: postData.data.tags,
      },
      twitter: {
        card: 'summary',
        title: postData.data.title,
        description:
          postData.data.description || `Read about ${postData.data.title}`,
      },
    };
  } catch (error) {
    return {
      title: 'Writing Post',
      description: 'Writing Post',
    };
  }
}
