/**
 * Format số tiền sang định dạng VND
 * @param amount - Số tiền cần format
 * @returns Chuỗi đã được format, ví dụ: "1.500.000₫"
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
}

/**
 * Format số tiền với đơn vị tùy chọn
 * @param amount - Số tiền cần format
 * @param currency - Mã tiền tệ (mặc định: VND)
 * @param locale - Locale (mặc định: vi-VN)
 * @returns Chuỗi đã được format
 */
export function formatPrice(
    amount: number,
    currency: string = "VND",
    locale: string = "vi-VN"
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(amount);
}

/**
 * Format số với dấu phân cách hàng nghìn
 * @param num - Số cần format
 * @returns Chuỗi đã được format, ví dụ: "1.500.000"
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat("vi-VN").format(num);
}

/**
 * Chuyển đổi giá từ USD sang VND (tỷ giá ước tính)
 * @param usdAmount - Số tiền USD
 * @param exchangeRate - Tỷ giá (mặc định: 24,500)
 * @returns Số tiền VND
 */
export function convertUsdToVnd(
    usdAmount: number,
    exchangeRate: number = 24500
): number {
    return Math.round(usdAmount * exchangeRate);
}

export default formatCurrency;
