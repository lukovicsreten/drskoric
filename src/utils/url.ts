// Dodaje base putanju (npr. „/drskoric“) na fajlove iz public/ foldera.
// Radi i kada je base „/“ (sopstveni domen).
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

// Responsive širine slike koje ne prelaze originalnu širinu (Astro ne uvećava slike)
export function fitWidths(image: { width: number }, widths: number[]): number[] {
  const fitting = widths.filter((w) => w < image.width);
  return [...fitting, image.width];
}
