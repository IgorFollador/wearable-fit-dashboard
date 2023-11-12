"use client"

import { ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'

import { AuthContext } from '../contexts/AuthContext';

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { isAuthenticated, user } = useContext(AuthContext);
  const router = useRouter();

  console.log("isAuthenticated: " + isAuthenticated);
  console.log("isProfessional: " + user?.isProfessional)

  if (!isAuthenticated) {
    router.push('/login');
  }

  // useEffect(() => {
  //   console.log(isAuthenticated);
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : null;
}
