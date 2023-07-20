import ThemeProvider from "@/components/helpers/ThemeProvider";
import Provider from "@/components/helpers/WrapperProvider";
import NavBar from "@/components/ui/NavBar";
import "@uploadthing/react/styles.css";
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ReactNode } from "react";
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

const montserrat = Montserrat({
  weight: ['400', '700'],
  style: 'italic',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'jsonify',
  description: 'Application for uploading JSON files',
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: ReactNode,
  params: { locale: string }
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={montserrat.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
