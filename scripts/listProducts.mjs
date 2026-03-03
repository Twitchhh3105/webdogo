import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function main() {
    // 1. List products from Sanity
    const products = await client.fetch(`*[_type == "product"]{_id, title, "imageCount": count(images)} | order(title asc)`);
    console.log('=== PRODUCTS IN SANITY ===');
    products.forEach((p, i) => {
        console.log(`${i + 1}. [${p._id}] ${p.title} (images: ${p.imageCount})`);
    });

    // 2. List image folders
    const productsDir = path.resolve(process.cwd(), 'public/images/products');
    const folders = fs.readdirSync(productsDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => {
            const folderPath = path.join(productsDir, d.name);
            const files = fs.readdirSync(folderPath);
            return { name: d.name, files };
        });

    console.log('\n=== IMAGE FOLDERS ===');
    folders.forEach((f, i) => {
        console.log(`${i + 1}. "${f.name}" => [${f.files.join(', ')}]`);
    });
}

main().catch(console.error);
