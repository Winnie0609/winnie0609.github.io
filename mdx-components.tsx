import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { ImageRow } from './components/ImageRow';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-6 text-content-primary">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-4 text-content-primary">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mb-3 text-content-primary">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium mb-3 text-content-primary">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base font-medium mb-2 text-content-primary">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm font-medium mb-2 text-content-primary">
        {children}
      </h6>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-content-secondary leading-relaxed">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-content-primary">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-content-secondary">{children}</em>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-border-strong [&>p]:text-content-tertiary rounded-r-md pl-6 py-4 my-6 [&>p]:!mb-0">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="nested-list-ul list-disc mb-4 space-y-0.5 text-content-secondary">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="nested-list-ol list-decimal mb-4 space-y-0.5 text-content-secondary">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="nested-list-li mb-0 [&>p]:mb-0 [&>p:first-child]:inline leading-relaxed text-content-secondary">
        {children}
      </li>
    ),
    img: ({ src, alt, ...props }) => {
      // Validate src prop
      if (!src || typeof src !== 'string') {
        return null;
      }

      // List of configured external domains
      const configuredDomains = [
        'i.imgur.com',
        'imgur.com',
        'images.unsplash.com',
        'cdn.jsdelivr.net',
        'raw.githubusercontent.com',
      ];

      // Check if it's a local image (starts with /) or configured external domain
      const isLocal = src.startsWith('/');
      const isConfiguredExternal = configuredDomains.some((domain) =>
        src.includes(domain)
      );

      // Use Next.js Image for local and configured external images
      if (isLocal || isConfiguredExternal) {
        return (
          <Image
            src={src}
            alt={alt || ''}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-sm max-w-4xl mx-auto my-8 block"
            {...props}
          />
        );
      }

      // Fallback to regular img for unconfigured external domains
      return (
        <img
          src={src}
          alt={alt || ''}
          className="w-full h-auto rounded-lg border border-border-light max-w-4xl mx-auto my-8 block shadow-sm"
          {...props}
        />
      );
    },
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-link font-medium underline text-content-tertiary dark:text-content-primary dark:hover:text-link-hover dark:hover:no-underline hover:text-link-hover hover:no-underline decoration-link/60 decoration-1 underline-offset-2 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    hr: () => <hr className="my-8 border-border-medium" />,

    // Table components
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border-medium rounded-lg overflow-hidden">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted text-content-primary">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="text-content-secondary">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-border-light last:border-b-0 text-content-secondary">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="text-left text-content-primary font-semibold p-3 border-r border-border-light last:border-r-0">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="text-content-secondary p-3 border-r border-border-light last:border-r-0">
        {children}
      </td>
    ),

    // Additional semantic elements
    mark: ({ children }) => (
      <mark className="bg-warning/20 text-content-primary px-1 rounded">
        {children}
      </mark>
    ),
    kbd: ({ children }) => (
      <kbd className="bg-muted text-content-primary px-2 py-1 text-sm rounded border border-border-medium font-mono">
        {children}
      </kbd>
    ),
    del: ({ children }) => (
      <del className="text-content-tertiary line-through">{children}</del>
    ),
    ins: ({ children }) => (
      <ins className="text-content-primary no-underline bg-success/10 px-1 rounded">
        {children}
      </ins>
    ),
    b: ({ children }) => (
      <b className="font-semibold text-content-primary">{children}</b>
    ),
    i: ({ children }) => (
      <i className="italic text-content-secondary">{children}</i>
    ),

    // Custom components
    ImageRow,

    ...components,
  };
}
