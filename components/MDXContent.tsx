import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';
import { mdxOptions } from '@/lib/mdx-config';

interface MDXContentProps {
  source: string;
  className?: string;
}

export default function MDXContent({
  source,
  className = '',
}: MDXContentProps) {
  const components = useMDXComponents({});

  return (
    <div className={className}>
      <MDXRemote
        source={source}
        components={components}
        options={mdxOptions as any}
      />
    </div>
  );
}
