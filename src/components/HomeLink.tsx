"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { isSamePage } from "@/lib/paths";

// Link para a home. Se já estamos nela, o <Link> do Next não rola; aqui voltamos ao topo
// e limpamos a âncora (#contato etc.) da URL.
export function HomeLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (!isSamePage(href, pathname)) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  return (
    <Link href={href} aria-label={label} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
