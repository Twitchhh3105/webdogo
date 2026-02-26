import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'discountedPrice',
            title: 'Discounted Price',
            type: 'number',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
        },
        defineField({
            name: 'material',
            title: 'Material',
            type: 'string',
        }),
        defineField({
            name: 'dimensions',
            title: 'Dimensions',
            type: 'string',
        }),
        defineField({
            name: 'warranty',
            title: 'Warranty',
            type: 'string',
        }),
        defineField({
            name: 'brand',
            title: 'Brand',
            type: 'string',
        }),
        defineField({
            name: 'weight',
            title: 'Weight',
            type: 'string',
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'string',
        }),
    ],
})
