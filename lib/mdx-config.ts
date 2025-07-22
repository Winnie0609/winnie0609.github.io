import rehypePrettyCode from 'rehype-pretty-code';

export const mdxOptions = {
  mdxOptions: {
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
