import { redirect } from 'next/navigation';
import Link from 'next/link';
import MDXContent from '@/components/MDXContent';
import { getPostBySlug } from '@/lib/post';

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const WritingPostPage = async ({ params }: PageProps) => {
  try {
    const postData = await getPostBySlug(params.slug);

    if (!postData) {
      redirect('/writings');
    }

    return (
      <>
        <article className="max-w-4xl mx-auto px-4 py-8">
          <MDXContent source={postData.content} />
        </article>

        <Link
          href="/writings"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          cd..
        </Link>
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
