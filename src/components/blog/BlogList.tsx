// Adapted from wqqz.dev's ArchiveList.tsx (github.com/imwqqz/wqqz.dev, MIT).

import { useMemo, useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { getAllTags, slugifyTag, type TagInfo } from '../../lib/tags';
import { searchPosts, type Post } from '../../lib/search';

export type { Post, TagInfo };

export type BlogListProps = {
  posts?: Post[];
  initialQuery?: string;
  tags?: TagInfo[];
  searchPlaceholder?: string;
  noResultsLabel?: string;
};

function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('be-BY', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      });
    }
  } catch {
    // fall through to raw string
  }
  return dateStr;
}

function useUrlQuery(initialQuery: string = '') {
  const [query, setQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const q = params.get('q');
        if (q !== null) return q;
      } catch {
        // ignore — fall back to initialQuery
      }
    }
    return initialQuery || '';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const currentQ = params.get('q') ?? '';
      const nextQ = (query || '').trim();
      if (currentQ !== nextQ) {
        if (nextQ) {
          params.set('q', nextQ);
        } else {
          params.delete('q');
        }
        const qs = params.toString();
        const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}`;
        window.history.replaceState({}, '', newUrl);
      }
    } catch {
      // ignore — URL sync is a nicety, not required for search to work
    }
  }, [query]);

  return [query, setQuery] as const;
}

function PostItem({ post }: { post: Post }) {
  return (
    <article className="group">
      <div className="flex items-start justify-between gap-6 sm:gap-8">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold tracking-tight text-balance text-foreground transition-colors group-hover:text-primary sm:text-xl">
            <a href={`/blog/${post.slug}`} className="hover:text-primary">
              {post.title}
            </a>
          </h3>
          <p className="mb-3 mt-2 text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
            {post.excerpt}
          </p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog/tags/${slugifyTag(tag)}`}
                  className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-card/60 px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <span className="text-accent/70">#</span>
                  <span>{tag}</span>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="shrink-0 whitespace-nowrap pt-0.5 text-right">
          <time className="block text-xs text-muted-foreground sm:text-sm">
            {formatDisplayDate(post.date)}
          </time>
          {typeof post.readMinutes === 'number' && (
            <span className="mt-0.5 block text-xs text-muted-foreground/70">
              {post.readMinutes} хв чытання
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function BlogList({
  posts = [],
  initialQuery = '',
  tags,
  searchPlaceholder = 'Пошук артыкулаў...',
  noResultsLabel = 'Нічога не знойдзена.',
}: BlogListProps) {
  const [query, setQuery] = useUrlQuery(initialQuery);

  const allTags = useMemo(() => {
    if (tags && tags.length > 0) return tags;
    return getAllTags(posts);
  }, [posts, tags]);

  const filteredPosts = useMemo(() => searchPosts(posts || [], query || ''), [posts, query]);

  const safePosts = filteredPosts || [];

  return (
    <div>
      <div className="mb-10">
        <div className="max-w-md">
          <SearchBar
            value={query || ''}
            onChange={setQuery}
            placeholder={searchPlaceholder}
            posts={posts}
          />
        </div>
        {allTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <a
                key={tag.slug}
                href={`/blog/tags/${tag.slug}`}
                className="group inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground transition-all hover:border-accent/40 hover:bg-card hover:text-accent"
              >
                <span className="font-mono text-accent/70">#</span>
                <span className="font-medium text-foreground/90 group-hover:text-accent">
                  {tag.name}
                </span>
                <span className="ml-0.5 text-[11px] text-muted-foreground/60">{tag.count}</span>
              </a>
            ))}
          </div>
        )}
        <div className="mt-4 border-b border-border" />
      </div>

      {safePosts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground" aria-live="polite" role="status">
          {noResultsLabel}
        </div>
      ) : (
        <div className="space-y-10 sm:space-y-12">
          {safePosts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
