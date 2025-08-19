import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import MarkdownIt from 'markdown-it';
import mdPrism from 'markdown-it-prism';

import type {
  PageObjectResponse,
  RichTextItemResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

import type { BlogPostMeta } from '@/types/blog'; // <-- use the shared type

import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';

const notion = new Client({ auth: process.env.NOTION_TOKEN! });
const BLOG_DATABASE_ID: string = process.env.NOTION_DATABASE_ID!;

const n2m = new NotionToMarkdown({ notionClient: notion });
const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
}).use(mdPrism, { defaultLanguage: 'plaintext' });

const toSlug = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

function joinRichText(
  r: RichTextItemResponse | RichTextItemResponse[]
): string {
  return Array.isArray(r)
    ? r.map((t) => t.plain_text).join('')
    : r.plain_text;
}

export function asPlainText(
  prop?: PageObjectResponse['properties'][string] | null
): string {
  if (!prop) return '';
  switch (prop.type) {
    case 'title':
      return joinRichText(prop.title);
    case 'rich_text':
      return joinRichText(prop.rich_text);
    case 'formula':
      return prop.formula.type === 'string'
        ? (prop.formula.string ?? '')
        : '';
    case 'url':
      return prop.url ?? '';
    default:
      return '';
  }
}

function pageToMeta(page: PageObjectResponse): BlogPostMeta {
  const props = page.properties as Record<
    string,
    PageObjectResponse['properties'][string]
  >;
  const rawSlug = asPlainText(props.Slug);
  const readable = rawSlug ? toSlug(rawSlug) : '';
  const fallback = page.id.replace(/-/g, '');
  const slug = readable || fallback;

  const title = asPlainText(props.Title);
  const description = asPlainText(props.Description);

  let date = '';
  const dateProp = props.Date;
  if (dateProp?.type === 'date') {
    date = dateProp.date?.start ?? '';
  } else if (dateProp?.type === 'created_time') {
    date = dateProp.created_time ?? '';
  }

  const tags =
    props.Tags?.type === 'multi_select'
      ? props.Tags.multi_select.map((t) => t.name)
      : [];

  return {
    slug,
    title,
    description,
    date,
    tags,
    coverImage: `/blog/${slug}/cover.png`,
    headings: [],
  };
}

export async function getPosts(): Promise<BlogPostMeta[]> {
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const resp: QueryDatabaseResponse = await notion.databases.query({
      database_id: BLOG_DATABASE_ID,
      sorts: [{ property: 'Date', direction: 'descending' }],
      start_cursor: cursor,
      page_size: 100,
    });

    const typed = resp.results.filter(
      (r): r is PageObjectResponse => 'properties' in r
    );
    pages.push(...typed);
    cursor = resp.has_more
      ? (resp.next_cursor ?? undefined)
      : undefined;
  } while (cursor);

  return pages.map(pageToMeta);
}

export type BlogPost = {
  frontMatter: BlogPostMeta;
  html: string;
};

export async function getPost(slug: string): Promise<BlogPost> {
  if (!slug) {
    throw new Error('getPost: you must pass a non-empty slug.');
  }

  const { results } = await notion.databases.query({
    database_id: BLOG_DATABASE_ID,
    page_size: 1,
    filter: {
      property: 'Slug',
      rich_text: { equals: slug },
    },
  });

  if (!results.length || !('properties' in results[0])) {
    throw new Error(`No post found for slug “${slug}”.`);
  }

  const page = results[0] as PageObjectResponse;

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const { parent: markdown } = n2m.toMarkdownString(mdBlocks);
  const html = md.render(markdown);

  const headings: string[] =
    markdown
      .match(/^#{1,6}\s+.+$/gm)
      ?.map((h) => h.replace(/^#{1,6}\s+/, '').trim()) ?? [];

  const frontMatter: BlogPostMeta = { ...pageToMeta(page), headings };

  return {
    frontMatter,
    html,
  };
}
