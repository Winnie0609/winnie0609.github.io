import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';
import { mdxOptions } from '@/lib/mdx-config';

interface MDXContentServerProps {
  source: string;
  className?: string;
}

export default function MDXContentServer({
  source,
  className = '',
}: MDXContentServerProps) {
  const components = useMDXComponents({});

  return (
    <div className={className}>
      <MDXRemote
        source={source}
        components={components}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options={mdxOptions as any}
      />
    </div>
  );
}
