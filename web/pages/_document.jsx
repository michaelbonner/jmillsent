import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RZM6Y4557R"
          strategy="beforeInteractive"
        />
        <Script id="ads-gtag" strategy="beforeInteractive">
          {`
        window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-RZM6Y4557R');
        `}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
