"use client";
import React from 'react';

import { SessionProvider as AuthSessionProvider } from 'next-auth/react';
import { Provider } from "react-redux";
import store from "@/components/store/store";

const WrapperProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthSessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </AuthSessionProvider>
  )
}

export default WrapperProvider