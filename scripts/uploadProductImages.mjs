import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const logFile = path.resolve(process.cwd(), 'scripts', 'upload_log.txt');

function log(msg) {
    const line = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync(logFile, line);
    process.stdout.write(msg + '\n');
}

// Clear log file
fs.writeFileSync(logFile, '');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

log(`Sanity Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
log(`Sanity Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`);
log(`Token present: ${!!process.env.SANITY_API_TOKEN}`);

// Mapping: Sanity product _id -> folder name(s) in public/images/products/
const productFolderMapping = {
    'AYpq9JnWExjNvV7jSnPpxs': ['dongodecaycanh'],
    'AYpq9JnWExjNvV7jSnPqGG': ['caycanbot'],
    'AYpq9JnWExjNvV7jSnR3PY': ['kedolaptop'],
    'AYpq9JnWExjNvV7jSnRFkS': ['giatreoquanaothanhdonXL'],
    'AYpq9JnWExjNvV7jSnRG6W': ['mocgotreoquanaogantuong'],
    'AYpq9JnWExjNvV7jSnRIm0': ['giatreoquanaothanhdonmautrang'],
    'AYpq9JnWExjNvV7jSnRKCG': ['kegotreotuongnhieukichthuoc'],
    'AYpq9JnWExjNvV7jSnRKQy': ['giatreoquanaothanhdonXL'],
    'AYpq9JnWExjNvV7jSnRPau': ['khuondauphubanggo'],
    'AYpq9JnWExjNvV7jSnU7z6': ['kelaptopmaytinhkemanhinh'],
    'AYpq9JnWExjNvV7jSnUA08': ['dongodebinhnuoc2tang'],
    'AYpq9JnWExjNvV7jSnUHXA': ['giagotreotainghe'],
    'AYpq9JnWExjNvV7jSnUHwu': ['giatreoquanaochuA2tang'],
    'AYpq9JnWExjNvV7jSnUIMe': ['giatreoquanaochuA1tang'],
    'AYpq9JnWExjNvV7jSnUJfY': ['kekinh2tangkieuhan'],
    'LJInH2h67LnJd8VEvrxqwq': ['dongodecaycanh'],
    'LJInH2h67LnJd8VEvrxs4O': ['dongodebinhnuoc'],
    'LJInH2h67LnJd8VEvrxsWq': ['conlancanbotbanggo'],
    'LJInH2h67LnJd8VEvrxuvQ': ['onghutinox'],
    'LJInH2h67LnJd8VEvrxwVQ': ['dochoiDomino'],
    'LJInH2h67LnJd8VEvrxzZ6': ['kesach4tang'],
    'LJInH2h67LnJd8VEvs2UQC': ['moctreoquanaogotamgiac'],
    'xfUCZ6xEEeYQ6HWfAs66qM': ['giatreotuonghinhvuong'],
};

const productsDir = path.resolve(process.cwd(), 'public', 'images', 'products');

async function uploadImagesForProduct(productId, folderNames) {
    log(`Processing product: ${productId}`);

    const allImagePaths = [];
    for (const folderName of folderNames) {
        const folderPath = path.join(productsDir, folderName);
        if (!fs.existsSync(folderPath)) {
            log(`  WARNING: Folder not found: "${folderName}"`);
            continue;
        }
        const files = fs.readdirSync(folderPath)
            .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
            .sort();
        for (const file of files) {
            allImagePaths.push(path.join(folderPath, file));
        }
        log(`  Found ${files.length} images in "${folderName}"`);
    }

    if (allImagePaths.length === 0) {
        log(`  ERROR: No images found for product`);
        return;
    }

    // Upload each image to Sanity
    const imageRefs = [];
    for (const imgPath of allImagePaths) {
        try {
            const imgBuffer = fs.readFileSync(imgPath);
            const asset = await client.assets.upload('image', imgBuffer, {
                filename: path.basename(imgPath),
            });
            imageRefs.push({
                _type: 'image',
                _key: asset._id.replace('image-', '').substring(0, 12),
                asset: {
                    _type: 'reference',
                    _ref: asset._id,
                },
            });
            log(`  Uploaded: ${path.basename(imgPath)} -> ${asset._id}`);
        } catch (err) {
            log(`  UPLOAD ERROR for ${path.basename(imgPath)}: ${err.message}`);
        }
    }

    if (imageRefs.length === 0) {
        log(`  ERROR: No images were uploaded successfully`);
        return;
    }

    // Update the product in Sanity
    try {
        await client
            .patch(productId)
            .set({ images: imageRefs })
            .commit();
        log(`  SUCCESS: Updated product with ${imageRefs.length} images`);
    } catch (err) {
        log(`  PATCH ERROR: ${err.message}`);
    }
}

async function main() {
    log('Starting image upload to Sanity...');

    // First verify connection
    try {
        const test = await client.fetch('*[_type == "product"][0]{_id}');
        log(`Connection test OK. Sample product: ${test?._id}`);
    } catch (err) {
        log(`Connection test FAILED: ${err.message}`);
        return;
    }

    const entries = Object.entries(productFolderMapping);
    for (let i = 0; i < entries.length; i++) {
        const [productId, folders] = entries[i];
        log(`\n--- [${i + 1}/${entries.length}] ---`);
        await uploadImagesForProduct(productId, folders);
    }

    log('\nAll done!');
}

main().catch(err => {
    log(`FATAL ERROR: ${err.message}`);
    log(err.stack);
});
