import type { Metadata } from 'next'
import { inter } from '@/config/fonts'

import './globals.css'
import { Provider } from '@/components'



export const metadata: Metadata = {
  title: {
    template:'%s | 4 patitas',
    default: 'Home | 4 patitas'
  },
  description: 'Tienda online de productos de papeleria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Provider>
        
          {children}
          
        </Provider>  
      </body>
    </html>
  )
}
