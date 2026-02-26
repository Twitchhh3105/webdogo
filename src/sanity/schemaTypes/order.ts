import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who placed the order.',
        },
        {
            name: 'customerInfo',
            title: 'Customer Information',
            type: 'object',
            fields: [
                { name: 'firstName', title: 'First Name', type: 'string' },
                { name: 'lastName', title: 'Last Name', type: 'string' },
                { name: 'email', title: 'Email', type: 'string' },
                { name: 'phone', title: 'Phone Number', type: 'string' },
                { name: 'address', title: 'Street Address', type: 'string' },
                { name: 'city', title: 'City', type: 'string' },
                { name: 'state', title: 'State / Province', type: 'string' },
                { name: 'zipCode', title: 'Zip / Postal Code', type: 'string' },
                { name: 'country', title: 'Country', type: 'string' },
            ],
            description: 'Shipping and contact information for the order.',
        },
        {
            name: 'items',
            title: 'Order Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'product',
                            title: 'Product',
                            type: 'reference',
                            to: [{ type: 'product' }],
                        },
                        { name: 'quantity', title: 'Quantity', type: 'number' },
                        { name: 'price', title: 'Price at Purchase', type: 'number' },
                        { name: 'color', title: 'Selected Color', type: 'string' },
                    ],
                    preview: {
                        select: {
                            title: 'product.title',
                            subtitle: 'quantity',
                            media: 'product.images.0',
                        },
                        prepare(selection: any) {
                            const { title, subtitle, media } = selection
                            return {
                                title: title,
                                subtitle: `Quantity: ${subtitle}`,
                                media: media,
                            }
                        },
                    },
                },
            ],
        },
        {
            name: 'subtotal',
            title: 'Subtotal Amount',
            type: 'number',
        },
        {
            name: 'shippingFee',
            title: 'Shipping Fee',
            type: 'number',
        },
        {
            name: 'totalAmount',
            title: 'Total Amount',
            type: 'number',
            description: 'The total amount paid including shipping and taxes.',
        },
        {
            name: 'paymentMethod',
            title: 'Payment Method',
            type: 'string',
            options: {
                list: [
                    { title: 'Cash on Delivery (COD)', value: 'cod' },
                    { title: 'Credit Card (Stripe)', value: 'stripe' },
                    { title: 'Bank Transfer', value: 'bank_transfer' },
                ],
            },
            initialValue: 'cod',
        },
        {
            name: 'paymentStatus',
            title: 'Payment Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Paid', value: 'paid' },
                    { title: 'Failed', value: 'failed' },
                    { title: 'Refunded', value: 'refunded' },
                ],
            },
            initialValue: 'pending',
        },
        {
            name: 'orderStatus',
            title: 'Order Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Processing', value: 'processing' },
                    { title: 'Confirmed', value: 'confirmed' },
                    { title: 'Shipped', value: 'shipped' },
                    { title: 'Delivered', value: 'delivered' },
                    { title: 'Cancelled', value: 'cancelled' },
                ],
            },
            initialValue: 'processing',
        },
        {
            name: 'notes',
            title: 'Order Notes',
            type: 'text',
        },
        {
            name: 'orderDate',
            title: 'Order Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        },
    ],
    preview: {
        select: {
            title: 'customerInfo.firstName',
            lastName: 'customerInfo.lastName',
            amount: 'totalAmount',
            status: 'orderStatus',
            date: 'orderDate',
        },
        prepare(selection) {
            const { title, lastName, amount, status, date } = selection
            return {
                title: `${title} ${lastName} - $${amount}`,
                subtitle: `${new Date(date).toLocaleDateString()} - ${status.toUpperCase()}`,
            }
        },
    },
})
