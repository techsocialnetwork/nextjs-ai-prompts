import Link from 'next/link';
import { Post } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative flex flex-col space-y-4 p-6 rounded-lg border bg-card hover:border-primary/50 transition-colors">
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-secondary rounded-full"
          >
            {tag}
          </span>
        ))}
        {post.tags.length > 3 && (
          <span className="text-xs px-2 py-1 text-muted-foreground">
            +{post.tags.length - 3}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
        <Link href={`/blog/${post.slug}`} className="absolute inset-0">
          <span className="sr-only">Read {post.title}</span>
        </Link>
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className="text-muted-foreground line-clamp-3">
        {post.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
        <span>{post.author}</span>
        <span>•</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>•</span>
        <span>{post.readingTime} min read</span>
      </div>
    </article>
  );
}
