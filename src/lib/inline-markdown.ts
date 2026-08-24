/**
 * The CV source (cv.yaml) is written in rendercv's flavour of markdown, which
 * for our purposes means exactly two inline constructs: **bold** and [text](url).
 * Pulling in a full markdown parser for that is overkill, so this handles the
 * two and escapes everything else.
 */

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"]/g, (char) => ESCAPES[char]);
}

function isSafeHref(href: string): boolean {
  return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href);
}

/** Collapses the hard line breaks YAML block scalars leave behind. */
export function unwrap(value: string): string {
  return (
    value
      .replace(/\s*\n\s*\n\s*/g, '\n')
      // cv.yaml is hard-wrapped from the PDF source, so a word split across two
      // lines ("white-\nlabel") must rejoin without a space.
      .replace(/(\p{L})-\n(\p{L})/gu, '$1-$2')
      .replace(/[^\S\n]+/g, ' ')
      .trim()
  );
}

export function inlineMarkdown(value: string): string {
  let html = escapeHtml(unwrap(value).replace(/\n/g, ' '));

  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, text: string, href: string) => {
    if (!isSafeHref(href)) return text;
    const external = /^https?:/i.test(href);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${escapeHtml(href)}"${attrs}>${text}</a>`;
  });

  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  return html;
}

/** Strips markdown down to plain text — for <title>, meta descriptions, etc. */
export function plainText(value: string): string {
  return unwrap(value)
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\n/g, ' ');
}
