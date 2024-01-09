import type { Metadata } from 'next'
import { inter } from '@/config/fonts'

import './globals.css'



export const metadata: Metadata = {
  title: 'Pape 4P',
  description: 'Tienda online de productos de papeleria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
