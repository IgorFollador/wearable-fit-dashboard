import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainNav } from './components/main-nav';
import { UserNav } from './components/user-nav';
import logo from '@/../public/assets/icon.svg';
import Image from 'next/image';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wearable FIT',
  description: 'Wearable FIT health tracking system',
}

interface DashboardSettingsProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardSettingsProps) {
  return (
    <html lang="pt-BR" style={ {height:'100%'} }>
      <Head>
      </Head>
      <body className={inter.className} style={ {height:'100%'} }>
        <div className="hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <Image
                src={logo}
                alt="Wearable FIT Icon"
                width={40}
                className="m-4"
                priority
              />
              <h1>Wearable FIT</h1>
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <UserNav />
              </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
