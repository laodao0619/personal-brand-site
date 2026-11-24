import { basename, extname } from 'node:path';
import { defineConfig } from 'astro/config';

function scopeCrossBorderHeadings() {
  return (tree, file) => {
    const name = file.path && basename(file.path, extname(file.path));
    if (!name || !/^(0[1-6]-|2026-11-15$)/.test(name)) return;

    const headings = tree.children.filter(node => node.type === 'heading');
    headings.forEach((heading, index) => {
      heading.depth = Math.min(heading.depth + 1, 6);
      heading.data = { ...heading.data, hProperties: { id: name + '-section-' + (index + 1) } };
    });
  };
}

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  markdown: { remarkPlugins: [scopeCrossBorderHeadings] },
});
