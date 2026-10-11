import { serverClient } from './client';

// Use serverClient (no CDN, authenticated) for all server-side fetches
const client = serverClient;


// ============================
// TEMPLATES
// ============================

export async function getFreeTemplates() {
  return client.fetch(`
    *[_type == "template" && pricingType == "free"] | order(order asc) {
      title,
      "slug": slug.current,
      description,
      thumbnail,
      "gallery": gallery[].asset->url,
      "category": category->title,
      demoUrl,
      "demoZipUrl": demoZip.asset->url,
      downloadUrl,
      pricingType,
      price,
      technologies,
      features
    }
  `);
}

export async function getPremiumTemplates() {
  return client.fetch(`
    *[_type == "template" && pricingType == "premium"] | order(order asc) {
      title,
      "slug": slug.current,
      description,
      thumbnail,
      "gallery": gallery[].asset->url,
      "category": category->title,
      demoUrl,
      "demoZipUrl": demoZip.asset->url,
      pricingType,
      price,
      buyLinks,
      technologies,
      features
    }
  `);
}

export async function getFeaturedFreeTemplates(limit = 6) {
  return client.fetch(`
    *[_type == "template" && pricingType == "free" && isFeatured == true] | order(order asc) [0...$limit] {
      title,
      "slug": slug.current,
      description,
      thumbnail,
      "gallery": gallery[].asset->url,
      "category": category->title,
      demoUrl,
      "demoZipUrl": demoZip.asset->url,
      pricingType,
      price
    }
  `, { limit });
}

export async function getFeaturedPremiumTemplates(limit = 4) {
  return client.fetch(`
    *[_type == "template" && pricingType == "premium" && isFeatured == true] | order(order asc) [0...$limit] {
      title,
      "slug": slug.current,
      description,
      thumbnail,
      "gallery": gallery[].asset->url,
      "category": category->title,
      demoUrl,
      "demoZipUrl": demoZip.asset->url,
      pricingType,
      price
    }
  `, { limit });
}

export async function getTemplateBySlug(slug: string) {
  return client.fetch(`
    *[_type == "template" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      description,
      seoTitle,
      seoDescription,
      metaImage,
      tags,
      thumbnail,
      "gallery": gallery[].asset->url,
      bundleItems,
      "category": category->title,
      demoUrl,
      "demoZipUrl": demoZip.asset->url,
      downloadUrl,
      pricingType,
      price,
      buyLinks,
      technologies,
      features,
      isFeatured
    }
  `, { slug });
}


export async function getAllTemplates(limit = 12) {
  return client.fetch(`
    *[_type == "template"] | order(order asc) [0...$limit] {
      title,
      "slug": slug.current,
      description,
      thumbnail,
      "gallery": gallery[].asset->url,
      "category": category->title,
      demoUrl,
      pricingType,
      price
    }
  `, { limit });
}

export async function getAllTemplateSlugs() {
  return client.fetch(`
    *[_type == "template"] { "slug": slug.current }
  `);
}

// ============================
// BLOG POSTS
// ============================

export async function getBlogPosts() {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      excerpt,
      thumbnail,
      "category": category->title,
      publishedAt,
      readTime,
      "author": author->{ name, avatar, role }
    }
  `);
}

export async function getLatestBlogPosts(limit = 3) {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
      title,
      "slug": slug.current,
      excerpt,
      thumbnail,
      "category": category->title,
      publishedAt,
      readTime
    }
  `, { limit });
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      excerpt,
      contentFormat,
      body,
      bodyMarkdown,
      thumbnail,
      metaImage,
      "category": category->title,
      publishedAt,
      readTime,
      seoTitle,
      seoDescription,
      "author": author->{ name, avatar, role }
    }
  `, { slug });
}

export async function getAllBlogSlugs() {
  return client.fetch(`
    *[_type == "blogPost"] { "slug": slug.current, publishedAt }
  `);
}

// ============================
// CATEGORIES
// ============================

export async function getCategories(type: 'template' | 'blog') {
  return client.fetch(`
    *[_type == "category" && categoryType == $type] | order(order asc) {
      title,
      "slug": slug.current,
      description
    }
  `, { type });
}

// ============================
// SITE SETTINGS
// ============================

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      siteName,
      logoText,
      logoAccent,
      siteDescription,
      siteKeywords,
      footerDescription,
      socialLinks
    }
  `);
}

// ============================
// FAQ
// ============================

export async function getFAQs(page = 'contact') {
  return client.fetch(`
    *[_type == "faq" && page == $page] | order(order asc) {
      question,
      answer
    }
  `, { page });
}

// ============================
// AUTHORS
// ============================

export async function getAuthors() {
  return client.fetch(`
    *[_type == "author"] {
      name,
      "slug": slug.current,
      avatar,
      role,
      bio,
      social
    }
  `);
}
