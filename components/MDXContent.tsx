'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useMDXComponents } from '@/mdx-components';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
  className?: string;
}

export default function MDXContent({
  source,
  className = '',
}: MDXContentProps) {
  const components = useMDXComponents({});

  return (
    <div className={className}>
      <MDXRemote {...source} components={components} />
    </div>
  );
}
