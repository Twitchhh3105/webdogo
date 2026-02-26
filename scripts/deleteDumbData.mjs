import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load env variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Setup Sanity Client
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function findAndDeleteDumbData() {
    console.log('Fetching all products from Sanity...');
    const allProducts = await client.fetch(`*[_type == "product"]{_id, title, price}`);

    console.log(`Found ${allProducts.length} products in Sanity.`);

    // Read official products from my_products.json
    const officialProductsJSON = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'scripts/my_products.json'), 'utf-8'));
    const officialTitles = new Set(officialProductsJSON.map(p => p.title.trim()));

    const idsToDelete = [];
    const validTitlesSeen = new Set();

    for (const product of allProducts) {
        const title = product.title ? product.title.trim() : "";
        if (!officialTitles.has(title)) {
            // It's dumb data
            console.log(`Dumb data found: ${title}`);
            idsToDelete.push(product._id);
        } else {
            // It's an official product, but check for duplicates
            if (validTitlesSeen.has(title)) {
                console.log(`Duplicate found: ${title}`);
                idsToDelete.push(product._id);
            } else {
                validTitlesSeen.add(title);
            }
        }
    }

    console.log(`Found ${idsToDelete.length} products to delete (dumb data + duplicates).`);

    if (idsToDelete.length === 0) {
        console.log('No dumb data or duplicates found. Sanity is clean.');
        return;
    }

    console.log('Proceeding to delete them...');
    // Delete in batches or sequentially
    for (const id of idsToDelete) {
        try {
            await client.delete(id);
            console.log(`Deleted product ${id}`);
        } catch (error) {
            console.error(`Failed to delete product ${id}:`, error);
        }
    }
    console.log('Cleanup complete!');
}

findAndDeleteDumbData();
