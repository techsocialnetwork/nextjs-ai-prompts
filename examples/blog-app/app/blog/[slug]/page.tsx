import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { MDXContent } from '@/components/blog/mdx-content';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Revalidate every hour
export const revalidate = 3600;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug, 3);

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-sm px-3 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span>•</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <MDXContent source={post.mdxSource} />
      </div>

      {/* Tags */}
      <div className="pt-8 border-t">
        <p className="text-sm text-muted-foreground mb-2">Tagged:</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-sm px-3 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          <div className="grid gap-4">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group block p-4 rounded-lg border hover:border-primary transition-colors"
              >
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {relatedPost.excerpt.slice(0, 100)}...
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back Link */}
      <div className="pt-8">
        <Link
          href="/blog"
          className="text-primary hover:underline"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}
