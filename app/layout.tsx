import ThemeProvider from "@/components/helpers/ThemeProvider";
import Provider from "@/components/helpers/WrapperProvider";
import NavBar from "@/components/ui/NavBar";
import "@uploadthing/react/styles.css";
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ReactNode } from "react";
import './globals.css';

const montserrat = Montserrat({
  weight: ['400', '700'],
  style: 'italic',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'jsonify',
  description: 'Application for uploading JSON files',
}

export default function RootLayout({
  children,
}: {
    children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider>
          <div className="h-screen bg-white dark:bg-slate-800">
            <Provider>
              <NavBar />
              <div style={{ height: "calc(100vh - var(--navbar-height))" }}>
                {children}
              </div>
            </Provider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
