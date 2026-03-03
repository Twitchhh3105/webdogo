import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/client'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.trim()

    if (!q || q.length < 1) {
        return NextResponse.json([])
    }

    try {
        // Tìm kiếm sản phẩm theo title (case-insensitive, partial match)
        const query = `*[_type == "product" && title match $pattern][0..11]{
      _id,
      title,
      price,
      discountedPrice,
      "imageUrl": images[0].asset->url
    }`

        const products = await client.fetch(query, {
            pattern: `*${q}*`,
        })

        return NextResponse.json(products)
    } catch (error) {
        console.error('[Search API] Error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
