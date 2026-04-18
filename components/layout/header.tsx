import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Next.js Blog
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
