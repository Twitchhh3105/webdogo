import { chromium } from 'playwright';
import fs from 'fs';

const SHOP_URL = 'https://shopee.vn/shop/181162015?shopCollection=150645601';

async function scrapeShopee() {
    console.log('Khởi động trình duyệt ở chế độ Stealth...');

    // Sử dụng một số cấu hình để giả lập người dùng thật hơn
    const browser = await chromium.launch({
        headless: false,
        args: [
            '--disable-blink-features=AutomationControlled', // Ẩn cờ tự động hóa
            '--start-maximized'
        ]
    });

    const context = await browser.newContext({
        viewport: null, // Dùng viewport mặc định của trình duyệt mở ra
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        locale: 'vi-VN',
        timezoneId: 'Asia/Ho_Chi_Minh',
        permissions: ['geolocation']
    });

    // Chặn WebDriver property
    await context.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => undefined,
        });
    });

    const page = await context.newPage();

    console.log(`Đang truy cập: ${SHOP_URL}`);
    await page.goto(SHOP_URL, { waitUntil: 'load' });

    console.log('--------------------------------------------------');
    console.log('🔴 CHÚ Ý: Đã thêm các cấu hình ẩn danh (Stealth).');
    console.log('Nếu bạn vẫn gặp màn hình Lỗi/Captcha, hãy TỰ F5 (TẢI LẠI TRANG) hoặc NHẤN NÚT "THỬ LẠI".');
    console.log('Code sẽ chờ 60 giây để bạn xử lý xong trang Shopee hợp lệ.');
    console.log('--------------------------------------------------');

    await page.waitForTimeout(60000); // 60 giây chờ

    console.log('Bắt đầu thử tìm và lấy dữ liệu sản phẩm...');
    for (let i = 0; i < 15; i++) {
        await page.mouse.wheel(0, 1000);
        await page.waitForTimeout(1000);
    }

    const products = await page.evaluate(() => {
        // Tìm các thẻ bọc sản phẩm (Shopee thường dùng thẻ div/a bọc ngoài)
        const items = document.querySelectorAll('a[data-sqe="link"]');
        const results = [];

        items.forEach(item => {
            // Lấy trực tiếp text trong thẻ con
            const textContentParts = item.innerText.split('\n');
            // Cấu trúc text con thường là: Tên sản phẩm, Giá cũ, Giá mới, Đã bán...

            // Tìm ảnh
            const imgEl = item.querySelector('img');

            if (textContentParts.length >= 2) {
                results.push({
                    title: textContentParts[0], // Thường dòng đầu là tên
                    textData: item.innerText, // Lưu tạm toàn bộ text để lọc giá sau
                    image: imgEl ? imgEl.src : '',
                });
            }
        });

        // Nếu không tìm thấy class trên, thử tìm theo thẻ tổng quát hơn
        if (results.length === 0) {
            const fallbackItems = document.querySelectorAll('div[data-sqe="item"]');
            fallbackItems.forEach(item => {
                const imgEl = item.querySelector('img');
                results.push({
                    textData: item.innerText,
                    image: imgEl ? imgEl.src : '',
                });
            });
        }

        return results;
    });

    console.log(`Đã lấy được ${products.length} khối dữ liệu.`);

    fs.writeFileSync('shopee_data.json', JSON.stringify(products, null, 2), 'utf-8');
    console.log('Đã lưu dữ liệu thô vào file "shopee_data.json"');

    await browser.close();
}

scrapeShopee().catch(console.error);
