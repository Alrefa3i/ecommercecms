/* eslint-disable @next/next/next-script-for-ga */
import React from 'react'
import { Metadata } from 'next'
import { Tajawal } from 'next/font/google'

import { AdminBar } from './_components/AdminBar'
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
import { Providers } from './_providers'
import { InitTheme } from './_providers/Theme/InitTheme'
import { mergeOpenGraph } from './_utilities/mergeOpenGraph'

import 'boxicons/css/boxicons.min.css'
import './_css/app.scss'
import './_css/app.css'

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['500', '700', '400'],
})
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link rel="icon" href="/icon.ico" sizes="32x32" />
        <meta
          name="google-site-verification"
          content="sOCMVcfuS72xkz7w8J-Jt6wVY-FHT96dn28zJ0PIH_o"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
           (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WS88L6NM');
          `,
          }}
        ></script>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className={tajawal.className}>
        <Providers>
          <AdminBar />
          {/* @ts-expect-error */}
          <Header />
          {/* test icon */}
          <main className="main">{children}</main>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WS88L6NM"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          {/* @ts-expect-error */}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL),
  twitter: {
    card: 'summary_large_image',
    creator: '@Baitalelm',
  },
  openGraph: mergeOpenGraph(),
}
