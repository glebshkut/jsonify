"use client";
import React from 'react';
import { SessionProvider as AuthSessionProvider } from 'next-auth/react';

const WrapperProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthSessionProvider>
      {children}
    </AuthSessionProvider>
  )
}

export default WrapperProvider