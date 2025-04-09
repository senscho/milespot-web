import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import yaml from 'js-yaml';

interface Frontmatter {
  styles: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

function parseFrontmatter(content: string): { frontmatter: Frontmatter | null; content: string } {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  
  if (!frontmatterMatch) {
    return { frontmatter: null, content };
  }

  try {
    const frontmatter = yaml.load(frontmatterMatch[1]) as Frontmatter;
    const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    return { frontmatter, content: contentWithoutFrontmatter };
  } catch (e) {
    console.error('Error parsing frontmatter:', e);
    return { frontmatter: null, content };
  }
}

function processCustomTags(content: string, styles: Frontmatter['styles']): string {
  let processed = content;
  
  // Process custom tags
  Object.entries(styles).forEach(([tag, style]) => {
    const styleString = Object.entries(style)
      .map(([key, value]) => `${key}: ${value}`)
      .join(';');
    
    const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'g');
    processed = processed.replace(
      regex,
      `<span style="${styleString}">$1</span>`
    );
  });

  return processed;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  // Parse frontmatter
  const { frontmatter, content } = parseFrontmatter(markdown);
  
  // Process custom tags with styles from frontmatter
  const processedContent = frontmatter?.styles 
    ? processCustomTags(content, frontmatter.styles)
    : content;
  
  // Process markdown using unified pipeline
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { 
      allowDangerousHtml: true,
      handlers: {
        heading: (h, node) => {
          const level = node.depth;
          const className = `text-${level === 1 ? '3xl' : level === 2 ? '2xl' : 'xl'} font-bold mb-2 mt-10`;
          return {
            type: 'element',
            tagName: `h${level}`,
            properties: {
              className,
              style: `margin-top: ${level === 1 ? '2.5rem' : level === 2 ? '2.5rem' : '2rem'}; margin-bottom: ${level === 1 ? '1rem' : level === 2 ? '0.75rem' : '0.5rem'};`
            },
            children: h.all(node)
          };
        },
        list: (h, node) => {
          const tagName = node.ordered ? 'ol' : 'ul';
          const className = node.ordered 
            ? 'list-decimal list-inside pl-4 space-y-2 marker:text-gray-500' 
            : 'list-disc list-inside pl-4 space-y-2 marker:text-gray-500';
          
          return {
            type: 'element',
            tagName,
            properties: { className },
            children: h.all(node)
          };
        },
        listItem: (h, node) => {
          return {
            type: 'element',
            tagName: 'li',
            properties: { className: 'pl-2' },
            children: h.all(node)
          };
        }
      }
    })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(processedContent);

  return result.toString();
} 