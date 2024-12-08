import './globals.css'

export const metadata = {
  title: 'Food Identifier',
  description: 'Identify food items using AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}