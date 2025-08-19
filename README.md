This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Tree structure of the projec

### Tree structure of the project:

- LICENSE
- app
  - [locale]
    - blog
      - [slug]
        - page.tsx
      - page.tsx
    - layout.tsx
    - page.tsx
  - api
    - contact
      - route.ts
    - posts
      - route.ts
  - favicon.ico
  - fonts
    - geometric-light.woff2
    - geometric-regular.woff2
    - geometric-ultra.woff2
- components
  - AnimatedText.tsx
  - Banner.tsx
  - Blog.tsx
  - Chart.tsx
  - ColorSelector.tsx
  - Contact.tsx
  - ContactForm.tsx
  - Container.tsx
  - EmailTemplate.tsx
  - Footer.tsx
  - FullWidth.tsx
  - Header.tsx
  - HeaderClient.tsx
  - Logo.tsx
  - PostContent.tsx
  - Process.tsx
  - Projects.tsx
  - Services.tsx
  - Table.tsx
  - TableOfContent.tsx
  - ThemeToggle.tsx
  - ui
    - button.tsx
    - card.tsx
    - chart.tsx
    - dialog.tsx
    - dropdown-menu.tsx
    - input.tsx
    - label.tsx
    - navigation-menu.tsx
    - switch.tsx
    - table.tsx
    - textarea.tsx
  - visuals
    - AiVisual.tsx
    - ChatbotVisual.tsx
    - DataVizVisual.tsx
    - ServiceVisuals.tsx
    - WebAppVisual.tsx
    - WebsiteVisual.tsx
- components.json
- contexts
- eslint.config.mjs
- hooks
- i18n
  - request.ts
  - routing.ts
- lib
  - notion.ts
  - utils.ts
- messages
  - de.json
  - en.json
- middleware.ts
- next-env.d.ts
- next.config.ts
- package-lock.json
- package.json
- postcss.config.mjs
- providers
  - theme-provider.tsx
- public
  - blog
    - blog-post-1
      - cover.png
    - blog-post-2
      - cover.png
    - blog-post-3
      - cover.png
  - file.svg
  - globe.svg
  - logo.svg
  - next.svg
  - vercel.svg
  - window.svg
- styles
  - components
    - Banner.module.css
  - globals.css
- tsconfig.json
- types
  - blog.ts
