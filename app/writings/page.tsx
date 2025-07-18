import { getPosts } from '@/lib/post';
import Link from 'next/link';

const WritingPage = async () => {
  const postsData = await getPosts();
  const sortedPosts = postsData.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Writings</h1>
      <div className="flex flex-col gap-4">
        {sortedPosts.map((post) => (
          <Link key={post.data.slug} href={`/writings/${post.data.slug}`}>
            {post.data.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WritingPage;

export const metadata = {
  title: 'Writing',
  description: 'Writing',
};
