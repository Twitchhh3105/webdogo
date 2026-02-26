import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/client';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            userId,
            customerInfo,
            items,
            subtotal,
            shippingFee,
            totalAmount,
            paymentMethod
        } = body;

        // Basic validation
        if (!customerInfo || !customerInfo.email || !items || items.length === 0) {
            return NextResponse.json(
                { error: 'Missing required order information' },
                { status: 400 }
            );
        }

        // Format items for Sanity reference array
        const sanityItems = items.map((item: any) => ({
            _key: crypto.randomUUID(),
            product: {
                _type: 'reference',
                _ref: item.productId,
            },
            quantity: item.quantity,
            price: item.price,
            color: item.color || '',
        }));

        // Construct the order document
        const orderData: any = {
            _type: 'order',
            customerInfo: {
                firstName: customerInfo.firstName,
                lastName: customerInfo.lastName,
                email: customerInfo.email,
                phone: customerInfo.phone,
                address: customerInfo.address,
                city: customerInfo.city,
                state: customerInfo.state || '',
                zipCode: customerInfo.zipCode || '',
                country: customerInfo.country || 'Vietnam',
            },
            items: sanityItems,
            subtotal: subtotal || 0,
            shippingFee: shippingFee || 0,
            totalAmount: totalAmount || 0,
            paymentMethod: paymentMethod || 'cod',
            paymentStatus: 'pending',
            orderStatus: 'processing',
            orderDate: new Date().toISOString(),
        };

        // If user is logged in, attach their ID
        if (userId) {
            orderData.user = {
                _type: 'reference',
                _ref: userId,
            };
        }

        // Save to Sanity
        const savedOrder = await writeClient.create(orderData);

        return NextResponse.json(
            {
                success: true,
                orderId: savedOrder._id,
                message: 'Order placed successfully!'
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Checkout API error:', error);
        return NextResponse.json(
            { error: 'Failed to process checkout. Please try again.' },
            { status: 500 }
        );
    }
}
