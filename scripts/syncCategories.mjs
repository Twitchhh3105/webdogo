import { createClient } from '@sanity/client';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
});

async function syncCategories() {
    console.log('Bắt đầu đồng bộ danh mục...');

    // Đọc file cấu hình danh mục
    let categoriesConfig;
    try {
        categoriesConfig = JSON.parse(fs.readFileSync('./scripts/my_categories.json', 'utf-8'));
    } catch (e) {
        console.error('Không tìm thấy file scripts/my_categories.json hoặc file bị lỗi JSON.', e);
        return;
    }

    // Lấy tất cả danh mục hiện có trên Sanity
    const existingCategories = await client.fetch(`*[_type == "category"]{_id, title}`);
    console.log(`Đã tìm thấy ${existingCategories.length} danh mục trên Sanity.`);

    const categoryNameToId = {};
    existingCategories.forEach(cat => {
        categoryNameToId[cat.title] = cat._id;
    });

    // Tạo các danh mục mới nếu cần
    for (const categoryName of Object.keys(categoriesConfig)) {
        if (!categoryNameToId[categoryName]) {
            console.log(`Đang tạo danh mục mới: ${categoryName}`);
            try {
                const newCategory = await client.create({
                    _type: 'category',
                    title: categoryName
                });
                categoryNameToId[categoryName] = newCategory._id;
            } catch (err) {
                console.error(`Lỗi khi tạo danh mục ${categoryName}:`, err);
            }
        }
    }

    // Lấy tất cả sản phẩm
    const products = await client.fetch(`*[_type == "product"]{_id, title}`);
    const productTitleToId = {};
    products.forEach(p => {
        productTitleToId[p.title] = p._id;
    });

    // Cập nhật sản phẩm
    let updatedCount = 0;
    for (const [categoryName, productTitles] of Object.entries(categoriesConfig)) {
        const categoryId = categoryNameToId[categoryName];
        if (!categoryId) {
            console.warn(`Bỏ qua danh mục ${categoryName} vì không tìm thấy ID.`);
            continue;
        }

        for (const title of productTitles) {
            const productId = productTitleToId[title];
            if (productId) {
                try {
                    await client.patch(productId)
                        .set({
                            category: {
                                _type: 'reference',
                                _ref: categoryId
                            }
                        })
                        .commit();
                    updatedCount++;
                    console.log(`Đã gán "${title}" vào danh mục "${categoryName}"`);
                } catch (err) {
                    console.error(`Lỗi khi cập nhật sản phẩm "${title}":`, err);
                }
            } else {
                console.warn(`Không tìm thấy sản phẩm trên Sanity theo tên: "${title}"`);
            }
        }
    }

    console.log(`=============================`);
    console.log(`Thành công! Đã cập nhật ${updatedCount} sản phẩm.`);
}

syncCategories();
