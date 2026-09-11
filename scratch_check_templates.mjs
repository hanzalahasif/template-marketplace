import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ath1uvh6',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function run() {
  const templates = await client.fetch(`*[_type == "template"]{
    _id,
    title,
    "slug": slug.current,
    pricingType,
    price,
    "hasZip": defined(demoZip),
    "hasDownloadUrl": defined(downloadUrl),
    downloadUrl
  }`);
  console.log(`Total templates: ${templates.length}`);
  console.table(templates.map(t => ({
    title: t.title?.slice(0, 30),
    slug: t.slug?.slice(0, 25),
    pricingType: t.pricingType,
    price: t.price,
    hasZip: t.hasZip,
    hasDownload: t.hasDownloadUrl
  })));
}

run().catch(console.error);
