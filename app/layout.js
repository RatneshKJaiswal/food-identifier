import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: 'Food Identifier',
  description: 'Identify food items using AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}