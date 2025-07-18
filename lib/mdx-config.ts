import rehypePrettyCode from 'rehype-pretty-code';

export const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: { light: 'snazzy-light', dark: 'github-dark' },
          keepBackground: true, // Important for dual themes!
          defaultLang: {
            block: 'typescript',
            inline: 'plaintext',
          },
          grid: true,
        },
      ],
    ],
  },
};
