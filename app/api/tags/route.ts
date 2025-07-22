import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/post';

export async function GET() {
  try {
    const posts = await getPosts();

    // Count posts for each tag
    const tagCounts: Record<string, number> = {};
    posts.forEach((post: any) => {
      if (post.data.tags) {
        post.data.tags.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    // Convert to array of objects with tag and count
    const tagsWithCounts = Object.entries(tagCounts).map(([tag, count]) => ({
      tag,
      count,
    }));

    return NextResponse.json(tagsWithCounts);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
