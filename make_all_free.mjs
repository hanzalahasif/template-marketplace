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

async function makeAllFree() {
  console.log('🔍 Fetching all templates from Sanity...');

  // Fetch all templates with their demoZip URL
  const templates = await client.fetch(`*[_type == "template"]{
    _id,
    title,
    pricingType,
    price,
    "zipUrl": demoZip.asset->url,
    downloadUrl
  }`);

  console.log(`✅ Found ${templates.length} templates.\n`);

  let updated = 0;
  let skipped = 0;

  for (const t of templates) {
    const zipUrl = t.zipUrl;

    if (!zipUrl) {
      console.log(`⚠️  SKIP (no zip): ${t.title}`);
      skipped++;
      continue;
    }

    // Patch: set pricingType = free, price = '', downloadUrl = zipUrl
    await client
      .patch(t._id)
      .set({
        pricingType: 'free',
        price: '',
        downloadUrl: zipUrl,
      })
      .commit();

    console.log(`✅ Updated: ${t.title}`);
    updated++;
  }

  console.log(`\n🎉 Done!`);
  console.log(`   Updated : ${updated}`);
  console.log(`   Skipped : ${skipped} (no zip file)`);
}

makeAllFree().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
