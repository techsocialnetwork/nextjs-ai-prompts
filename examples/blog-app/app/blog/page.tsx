import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { PostCard } from '@/components/blog/post-card';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles about web development, React, and Next.js',
};

// Revalidate every hour
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts on web development, React, and building modern applications.
        </p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">Tags:</span>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-sm px-3 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {/* Posts */}
      <div className="grid gap-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts yet. Check back soon!</p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>

      {/* RSS Link */}
      <div className="pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          Subscribe to the{' '}
          <Link href="/api/rss" className="text-primary hover:underline">
            RSS feed
          </Link>
        </p>
      </div>
    </div>
  );
}
