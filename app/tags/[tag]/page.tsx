import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { PostCard } from '@/components/blog/post-card';
import { notFound } from 'next/navigation';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.toLowerCase()),
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `Posts tagged "${tag}"`,
    description: `Blog posts tagged with ${tag}`,
  };
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const allPosts = getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );

  if (posts.length === 0) {
    notFound();
  }

  const allTags = getAllTags();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Posts tagged &ldquo;{tag}&rdquo;
        </h1>
        <p className="text-lg text-muted-foreground">
          {posts.length} post{posts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* All Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground">All tags:</span>
        {allTags.map((t) => (
          <Link
            key={t}
            href={`/tags/${encodeURIComponent(t.toLowerCase())}`}
            className={`text-sm px-3 py-1 rounded-full transition-colors ${
              t.toLowerCase() === tag.toLowerCase()
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

      {/* Posts */}
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Back Link */}
      <div className="pt-8">
        <Link href="/blog" className="text-primary hover:underline">
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
}
