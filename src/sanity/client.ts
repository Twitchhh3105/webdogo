import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
    console.warn('[Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID chưa được cấu hình trong .env.local')
}

// Read-only client (public, for frontend)
export const client = createClient({
    projectId: projectId || 'placeholder',
    dataset,
    apiVersion: '2023-05-03',
    useCdn: true,
})

// Write client (server-side only, requires SANITY_API_TOKEN)
export const writeClient = createClient({
    projectId: projectId || 'placeholder',
    dataset,
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})
