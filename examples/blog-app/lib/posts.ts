import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string;
  coverImage?: string;
  readingTime: number;
}

export interface PostWithContent extends Post {
  mdxSource: MDXRemoteSerializeResult;
}

/**
 * Calculate reading time in minutes
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Get all post slugs
 */
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
}

/**
 * Get post data from file
 */
function getPostFromFile(fileName: string): Post | null {
  try {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || content.slice(0, 200) + '...',
      content,
      tags: data.tags || [],
      author: data.author || 'Anonymous',
      coverImage: data.coverImage,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    console.error(`Error reading post ${fileName}:`, error);
    return null;
  }
}

/**
 * Get all posts sorted by date
 */
export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostFromFile(`${slug}.mdx`))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get post by slug with MDX content
 */
export async function getPostBySlug(slug: string): Promise<PostWithContent | null> {
  const post = getPostFromFile(`${slug}.mdx`);
  
  if (!post) {
    return null;
  }

  const mdxSource = await serialize(post.content, {
    parseFrontmatter: false,
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  });

  return {
    ...post,
    mdxSource,
  };
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => 
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get related posts (same tags, excluding current)
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): Post[] {
  const currentPost = getPostFromFile(`${currentSlug}.mdx`);
  if (!currentPost) return [];

  const allPosts = getAllPosts();
  return allPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => 
      post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}
