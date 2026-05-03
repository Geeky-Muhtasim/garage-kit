import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div className="flex items-center gap-1.5 px-5 py-2 border-b border-[0.5px] border-bdr text-[11px]">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {crumb.href ? (
            <Link href={crumb.href} className="text-txt-3 hover:text-amber cursor-pointer transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-txt-2">{crumb.label}</span>
          )}
          {i < crumbs.length - 1 && <span className="text-txt-4">/</span>}
        </span>
      ))}
    </div>
  );
}
