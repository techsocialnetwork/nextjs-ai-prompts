import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/blog/post-card';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Next.js AI Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A modern blog built with Next.js 14, TypeScript, and AI assistance.
        </p>
        <div className="mt-6">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="grid gap-6">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {posts.length > 3 && (
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-primary hover:underline"
            >
              View all {posts.length} posts →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
