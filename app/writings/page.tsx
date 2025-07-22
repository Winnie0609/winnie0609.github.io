'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TagFilter from '@/components/TagFilter';

interface PostData {
  data: {
    title: string;
    date: string;
    slug: string;
    description?: string;
    tags?: string[];
  };
  content: string;
}

const WritingPage = () => {
  const [postsData, setPostsData] = useState<PostData[]>([]);
  const [allTags, setAllTags] = useState<Array<{ tag: string; count: number }>>(
    []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, tagsResponse] = await Promise.all([
          fetch('/api/posts'),
          fetch('/api/tags'),
        ]);

        if (postsResponse.ok && tagsResponse.ok) {
          const posts = await postsResponse.json();
          const tags = await tagsResponse.json();
          setPostsData(posts);
          setAllTags(tags);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredPosts =
    selectedTags.length === 0
      ? postsData
      : postsData.filter((post) =>
          post.data.tags?.some((tag) => selectedTags.includes(tag))
        );

  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  // Group posts by year
  const postsByYear = sortedPosts.reduce((acc, post) => {
    const year = new Date(post.data.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof sortedPosts>);

  const years = Object.keys(postsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div className="space-y-6">
      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
      />

      <div className="space-y-12 mt-12">
        {years.map((year) => (
          <div key={year} className="relative">
            {/* Year header - large and semi-transparent behind content */}
            <div className="absolute pl-5 -top-5 -left-5 -z-10">
              <h2 className="text-8xl font-bold text-muted-foreground/30 opacity-50 select-none">
                {year}
              </h2>
            </div>

            {/* Posts for this year */}
            <div className="relative z-10 pt-8 space-y-2">
              {postsByYear[year].map((post) => (
                <Link
                  key={post.data.slug}
                  href={`/writings/${post.data.slug}`}
                  className="block text-content-secondary text-lg hover:text-primary transition-colors duration-300 ease-in-out"
                >
                  {post.data.title}
                  <span className="text-xs text-content-tertiary ml-2">
                    {new Date(post.data.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                    })}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {sortedPosts.length === 0 && selectedTags.length > 0 && (
          <p className="text-content-tertiary text-center py-8">
            No posts found with the selected tags.
          </p>
        )}
      </div>
    </div>
  );
};

export default WritingPage;
