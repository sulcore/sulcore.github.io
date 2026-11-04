// "/pt" e "/pt/" são a mesma página; o export estático usa barra no fim.
export function normalizePath(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

// O link aponta para a página em que o usuário já está?
export function isSamePage(href: string, pathname: string): boolean {
  return normalizePath(href.split("#")[0]) === normalizePath(pathname);
}
