import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 text-center">
      <p className="text-8xl font-mono font-medium text-amber mb-4 leading-none">404</p>
      <h1 className="text-xl font-medium text-txt mb-2">Page not found</h1>
      <p className="text-sm text-txt-2 mb-8 max-w-xs">
        The part you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="bg-surf2 border-[0.5px] border-bdr text-txt-2 text-sm font-medium px-5 py-2.5 rounded-lg hover:border-bdr2 hover:text-txt transition-colors"
        >
          ← Go Home
        </Link>
        <Link
          href="/catalog"
          className="bg-amber text-bg text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          Browse Catalog →
        </Link>
      </div>
    </div>
  );
}
