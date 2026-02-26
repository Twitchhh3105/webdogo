import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

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

const products = [
    {
        _type: 'product',
        title: 'Đôn gỗ để bình nước 20l, Đôn gỗ để cây big size',
        price: 176825,
        description: 'Đôn gỗ chất lượng cao, chịu lực tốt, thích hợp để bình nước hoặc chậu cây lớn trong nhà.',
        material: 'Gỗ',
    },
    {
        _type: 'product',
        title: 'Kệ gỗ treo tường nhiều kích thước, kệ gỗ treo...',
        price: 60000,
        description: 'Kệ gỗ treo tường decor tối giản, phù hợp để đồ trang trí, sách vở nhẹ.',
        material: 'Gỗ',
    }
];

async function seedData() {
    console.log('Bắt đầu thêm sản phẩm mẫu vào Sanity...');
    try {
        for (const product of products) {
            console.log(`Đang thêm: ${product.title}`);
            const res = await client.create(product);
            console.log(`✅ Thành công! ID: ${res._id}`);
        }
        console.log('Hoàn thành thêm dữ liệu!');
    } catch (error) {
        console.error('❌ Lỗi:', error);
    }
}

seedData();
