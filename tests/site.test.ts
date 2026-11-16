import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
function page() {
  assert.ok(existsSync(join(dist, 'index.html')), 'generated page dist/index.html must exist');
  return readFileSync(join(dist, 'index.html'), 'utf8');
}

test('generated page has business identity, hierarchy and services', () => {
  const html = page();
  assert.match(html, /ShadeTree\.IT LLC/);
  assert.deepEqual([...html.matchAll(/<(h[1-6])\b/g)].map(match => match[1]), ['h1', 'h2', 'h3', 'h3', 'h3', 'h3', 'h3', 'h3', 'h2', 'h2']);
  for (const text of ['Less busywork.', 'Better decisions.', 'More room to grow.']) assert.ok(html.includes(text), text);
  const articles = [...html.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)];
  assert.equal(articles.length, 4);
  const headings = ['AI consulting &amp; training', 'Custom software &amp; better processes', 'Data &amp; business insights', 'Leadership training &amp; executive coaching'];
  articles.forEach(([, article], index) => assert.match(article, new RegExp(`<h3[^>]*>${headings[index]}</h3>`)));
});

test('contact and social links go directly to the correct destinations', () => {
  const html = page();
  for (const link of ['tel:+13097501461', 'mailto:adam@shadetreeit.biz?subject=Hello%20from%20shadetreeit.biz', 'https://www.linkedin.com/in/adam-jelinek/', 'https://medium.com/@shadetreeit']) assert.ok(html.includes(`href="${link}"`), link);
});

test('site is static and excludes unapproved claims', () => {
  const html = page();
  const scripts = [...html.matchAll(/<script\b([^>]*)>/gi)].map(match => match[1]);
  assert.ok(scripts.every(attributes => /type="application\/ld\+json"/.test(attributes)), 'only JSON-LD scripts are allowed');
  assert.doesNotMatch(html, /<form\b|<iframe\b|State Farm/i);
  for (const tag of html.match(/<[a-z][^>]*>/gi) || []) {
    for (const [, attribute, url] of tag.matchAll(/\b(src|href)="([^"]+)"/gi)) {
      if (/^(?:https?:)?\/\//i.test(url)) {
        const allowedAnchor = /^<a\b/i.test(tag) && attribute === 'href' && ['https://www.linkedin.com/in/adam-jelinek/', 'https://medium.com/@shadetreeit'].includes(url);
        const canonical = /^<link\b/i.test(tag) && /rel="canonical"/.test(tag) && url === 'https://shadetreeit.biz/';
        assert.ok(allowedAnchor || canonical, `unexpected network URL: ${tag}`);
      }
    }
  }
});

test('metadata and local sharing assets are complete', () => {
  const html = page();
  assert.match(html, /rel="canonical" href="https:\/\/shadetreeit\.biz\/"/);
  const title = 'ShadeTree.IT LLC | Practical technology for small business';
  const description = 'Practical AI, software, data, and leadership guidance for small businesses ready to work smarter and grow.';
  const image = 'https://shadetreeit.biz/share.png';
  const alt = 'ShadeTree.IT LLC: Less busywork. Better decisions. More room to grow.';
  const metadata: Record<string, string> = {
    description, 'og:site_name': 'ShadeTree.IT LLC', 'og:type': 'website', 'og:url': 'https://shadetreeit.biz/',
    'og:title': title, 'og:description': description, 'og:image': image, 'og:image:type': 'image/png',
    'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': alt, 'twitter:card': 'summary_large_image',
    'twitter:title': title, 'twitter:description': description, 'twitter:image': image, 'twitter:image:alt': alt,
  };
  assert.ok(html.includes(`<title>${title}</title>`));
  for (const [key, value] of Object.entries(metadata)) {
    const attribute = key.startsWith('og:') ? 'property' : 'name';
    assert.ok((html.match(/<meta\b[^>]*>/g) || []).some(tag => tag.includes(` ${attribute}="${key}"`) && tag.includes(` content="${value}"`)), key);
  }
  for (const asset of ['share.png', 'favicon.svg', 'favicon.png', 'apple-touch-icon.png', 'robots.txt', 'sitemap.xml', '404.html', 'CNAME', '.nojekyll']) assert.ok(existsSync(join(dist, asset)), asset);
  assert.equal(readFileSync(join(dist, 'CNAME'), 'utf8').trim(), 'shadetreeit.biz');
  for (const asset of ['share.png', 'favicon.png']) {
    const png = readFileSync(join(dist, asset));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', asset);
  }
  const png = readFileSync(join(dist, 'share.png'));
  assert.equal(png.readUInt32BE(16), 1200); assert.equal(png.readUInt32BE(20), 630);
  const resources = (html.match(/<(?:img|link)\b[^>]*>/g) || [])
    .filter(tag => !/rel="canonical"/.test(tag))
    .flatMap(tag => [...tag.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(match => match[1]));
  assert.ok(resources.some(url => url.endsWith('.css')));
  assert.ok(resources.some(url => url.includes('/_astro/')));
  for (const url of resources) {
    const path = join(dist, decodeURIComponent(new URL(url, 'https://shadetreeit.biz/').pathname));
    assert.ok(existsSync(path), url);
    if (url.endsWith('.png')) assert.equal(readFileSync(path).subarray(0, 8).toString('hex'), '89504e470d0a1a0a', url);
    if (url.endsWith('.webp')) {
      const image = readFileSync(path);
      assert.equal(image.subarray(0, 4).toString(), 'RIFF', url);
      assert.equal(image.subarray(8, 12).toString(), 'WEBP', url);
    }
    if (url.endsWith('.css')) {
      const css = readFileSync(path, 'utf8');
      assert.doesNotMatch(css, /@import\b/i, 'CSS imports are not used by this site');
      for (const [, resource] of css.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)) {
        assert.doesNotMatch(resource, /^(?:https?:)?\/\//i);
        if (!resource.startsWith('data:') && !resource.startsWith('#')) {
          const resolved = new URL(resource, `https://shadetreeit.biz${url}`);
          assert.ok(existsSync(join(dist, decodeURIComponent(resolved.pathname))), resource);
        }
      }
    }
  }
});

test('native section links point to existing targets', () => {
  const html = page();
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), id);
  assert.match(html, /href="#main"/);
});

test('structured data describes the business', () => {
  const html = page();
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'JSON-LD block');
  const data = JSON.parse(match[1]);
  assert.equal(data['@type'], 'ProfessionalService');
  assert.equal(data.name, 'ShadeTree.IT LLC');
  assert.equal(data.founder.name, 'Adam Jelinek');
});
