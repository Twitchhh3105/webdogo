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

async function importData() {
    console.log('Bắt đầu đọc file my_products.json...');
    try {
        const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'scripts/my_products.json'), 'utf-8'));

        for (const item of data) {
            console.log(`Đang xử lý sản phẩm: ${item.title}...`);

            let imageAsset = null;
            if (item.ImagePath) {
                const imagePath = path.resolve(process.cwd(), item.ImagePath);
                if (fs.existsSync(imagePath)) {
                    console.log(`- Đang tải ảnh lên Sanity từ: ${imagePath}`);
                    imageAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
                        filename: path.basename(imagePath)
                    });
                    console.log(`  -> Đã upload ảnh thành công, ID: ${imageAsset._id}`);
                } else {
                    console.log(`⚠️ Không tìm thấy ảnh tại đường dẫn: ${imagePath}`);
                }
            }

            // Xây dựng Sanity Document
            const productDoc = {
                _type: 'product',
                title: item.title,
                price: item.price,
                discountedPrice: item.discountedPrice || null,
                description: item.description || '',
                material: item.material || '',
                images: imageAsset ? [{
                    _type: 'image',
                    _key: crypto.randomUUID(),
                    asset: {
                        _type: "reference",
                        _ref: imageAsset._id
                    }
                }] : []
            };

            const res = await client.create(productDoc);
            console.log(`✅ Thành công đăng sản phẩm! Product ID: ${res._id}\n`);
        }
        console.log('🎉 Hoàn thành quá trình Import!');
    } catch (error) {
        console.error('❌ Lỗi:', error);
    }
}

importData();
