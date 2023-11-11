import type { Metadata } from 'next';
import Image from 'next/image';

import { MainNav } from './components/main-nav';
import { UserNav } from './components/user-nav';
import logo from '@/../public/assets/icon.svg';

export const metadata: Metadata = {
  title: 'Wearable FIT',
  description: 'Wearable FIT health tracking system',
}

interface DashboardSettingsProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardSettingsProps) {
  
  return (
      <main style={ {height:'100%'} }>
        <div className="hidden flex-col md:flex">
          <div>
            <div className="flex h-16 items-center px-4 border-b">
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
            <div className="flex-1 space-y-4 p-10 pt-6">
              {children}
            </div>
          </div>
        </div>
      </main>
  )
}
