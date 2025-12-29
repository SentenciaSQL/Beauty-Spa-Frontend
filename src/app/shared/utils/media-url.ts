export function resolveMediaUrl(apiBaseUrl: string, path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  // apiBaseUrl = http://localhost:8000/api/v1
  // media = http://localhost:8000 + /media/...
  const origin = apiBaseUrl.replace(/\/api\/v1\/?$/, '');
  return `${origin}${path}`;
}
