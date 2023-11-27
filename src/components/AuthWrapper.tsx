"use client"

import { ReactNode, useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'

import { AuthContext } from '../contexts/AuthContext';

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { isAuthenticated, user } = useContext(AuthContext);

  const router = useRouter();
  const pathname = usePathname() || "";

  useEffect(() => {
    console.log("isAuthenticated: " + isAuthenticated);
    console.log("isProfessional: " + user.isProfessional);
  
    if (!isAuthenticated) {
      router.push('/login');
    } else if (
      user.email && 
      !user.isProfessional && 
      isAuthenticated && 
      !pathname.includes('/dashboard/customers/edit/me') && 
      !pathname.includes('/dashboard/settings')
      ) {
      router.push('/dashboard/customers/edit/me');
    }
  }, [pathname]);

  return isAuthenticated ? <>{children}</> : null;
}
