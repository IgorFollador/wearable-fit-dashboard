import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wearable FIT',
  description: 'Wearable FIT health tracking system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" style={ {height:'100%'} }>
      <body className={inter.className} style={ {height:'100%'} }>{children}</body>
    </html>
  )
}
