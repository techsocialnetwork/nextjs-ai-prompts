export function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="mx-auto max-w-4xl px-4 text-center text-sm text-muted-foreground">
        <p>
          Built with{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Next.js
          </a>{' '}
          and AI
        </p>
      </div>
    </footer>
  );
}
