export const metadata = {
    title: 'Sanity Studio',
    description: 'Admin dashboard for Sanity Studio',
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
