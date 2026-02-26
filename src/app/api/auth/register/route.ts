import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { client, writeClient } from '@/sanity/client'

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Vui lòng điền đầy đủ thông tin' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Mật khẩu phải có ít nhất 6 ký tự' },
                { status: 400 }
            )
        }

        // Check if email already exists in Sanity
        const existingUser = await client.fetch(
            `*[_type == "user" && email == $email][0]`,
            { email }
        )

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email này đã được sử dụng' },
                { status: 409 }
            )
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user in Sanity
        const newUser = await writeClient.create({
            _type: 'user',
            name,
            email,
            password: hashedPassword,
            role: 'user',
            provider: 'credentials',
            createdAt: new Date().toISOString(),
        })

        return NextResponse.json(
            { success: true, userId: newUser._id },
            { status: 201 }
        )
    } catch (error) {
        console.error('Register error:', error)
        return NextResponse.json(
            { error: 'Đã xảy ra lỗi, vui lòng thử lại' },
            { status: 500 }
        )
    }
}
