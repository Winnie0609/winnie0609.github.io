import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          // one-light
          theme: { light: 'catppuccin-latte', dark: 'github-dark' },
          keepBackground: true,
          defaultLang: {
            block: 'typescript',
            inline: 'plaintext',
          },
          grid: true,
          wordWrap: true, // Enable code wrapping for long lines
        },
      ],
    ],
  },
};
