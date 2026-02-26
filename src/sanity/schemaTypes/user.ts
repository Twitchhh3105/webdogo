import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'password',
            title: 'Password (Hashed)',
            type: 'string',
            description: 'Stored as bcrypt hash — do not edit manually',
            hidden: false,
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            options: {
                list: [
                    { title: 'User', value: 'user' },
                    { title: 'Admin', value: 'admin' },
                ],
                layout: 'radio',
            },
            initialValue: 'user',
            validation: (Rule) => Rule.required(),
        }),
        {
            name: 'image',
            title: 'Profile Image',
            type: 'image',
        },
        defineField({
            name: 'provider',
            title: 'Auth Provider',
            type: 'string',
            description: 'google / facebook / credentials',
            options: {
                list: [
                    { title: 'Credentials', value: 'credentials' },
                    { title: 'Google', value: 'google' },
                    { title: 'Facebook', value: 'facebook' },
                ],
            },
            initialValue: 'credentials',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            description: 'Số điện thoại liên hệ',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'string',
            description: 'Địa chỉ giao hàng',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
            media: 'image',
        },
    },
})
