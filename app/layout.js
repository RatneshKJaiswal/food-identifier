import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"

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
        <SpeedInsights/>
      </body>
    </html>
  )
}