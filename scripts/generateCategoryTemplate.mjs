import fs from 'fs';

const productsData = JSON.parse(fs.readFileSync('./scripts/my_products.json', 'utf-8'));

const categoryMap = {};

productsData.forEach(product => {
    const cat = product.categoryTitle || 'Chưa phân loại';
    if (!categoryMap[cat]) {
        categoryMap[cat] = [];
    }
    categoryMap[cat].push(product.title);
});

fs.writeFileSync('./scripts/my_categories.json', JSON.stringify(categoryMap, null, 4));

console.log('Successfully generated `scripts/my_categories.json`.');
