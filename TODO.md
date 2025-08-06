# Blog Development TODO

中文字體需要 embed

## Note
- 之後要把顏色在 css 管理 primary / secondary 之類的 不然要換顏色很麻煩

## Project Setup

- [x] Setup shadcn/ui with Next.js and Tailwind CSS, configure theme for clean light mode design with dark mode toggle
- [x] Create folder structure: components/, lib/, content/, and app routing structure
- [ ] Setup MDX processing for blog posts AND about page content (everything in markdown)

## Core Features

- [x] Create main layout component with top navigation bar (writings/about/weeknote tabs) and dark mode toggle
- [x] Setup Next.js app router pages for /about, /writings, /weeknote
- [ ] Implement global search functionality that can search across all posts (writings + weeknotes)

## Content Pages

- [ ] Build the about page as the landing/home page (loads from about.md)
- [ ] Create about.md file with bio, projects showcase, and links content
- [ ] Build writings page with blog post listing and individual post pages (same styling as weeknotes)
- [ ] Build weeknote page with same styling/layout as writings

## Styling & Polish

- [ ] Apply clean, minimal styling without shadows, inspired by the reference design
- [ ] Setup content structure for markdown files and metadata
- [ ] Content management system for organizing posts

## Design Goals

- Clean, minimal aesthetic in light mode (with dark mode option)
- No shadows or heavy borders - subtle borders and spacing
- Typography-focused design with excellent readability
- Top navigation bar
- Global search across all content
- Everything in markdown (including about page)


----
new-blog/
├── app/
│   ├── layout.tsx              # Root layout with top navigation & dark mode
│   ├── page.tsx                # Redirects to /about (landing page)
│   ├── about/
│   │   └── page.tsx            # About page (loads from about.md)
│   ├── writings/
│   │   ├── page.tsx            # Blog posts listing with search
│   │   └── [slug]/
│   │       └── page.tsx        # Individual blog post
│   ├── weeknote/
│   │   ├── page.tsx            # Weeknote listing with search
│   │   └── [slug]/
│   │       └── page.tsx        # Individual weeknote
│   ├── search/
│   │   └── page.tsx            # Global search page
│   └── globals.css             # Global styles with Tailwind
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── navigation.tsx          # Top navigation with dark mode toggle
│   ├── post-card.tsx          # Post preview card (writings + weeknotes)
│   ├── search-input.tsx        # Global search component
│   ├── mdx-components.tsx      # Custom MDX components
│   └── theme-provider.tsx      # Dark/light mode provider
├── lib/
│   ├── utils.ts               # Utility functions + cn() for Tailwind
│   ├── mdx.ts                 # MDX processing utilities
│   ├── posts.ts               # Blog post & weeknote utilities
│   └── search.ts              # Search functionality
├── content/
│   ├── about.md               # About page content (bio, projects, links)
│   ├── writings/              # Blog post markdown files
│   │   ├── my-first-post.md
│   │   └── ...
│   └── weeknotes/             # Weeknote markdown files
│       ├── week-1-2024.md
│       └── ...
├── public/
├── types/
│   └── post.ts                # TypeScript types
├── TODO.md                    # Development progress tracker
└── components.json            # shadcn/ui config