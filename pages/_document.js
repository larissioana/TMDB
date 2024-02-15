import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          strategy="beforeInteractive"
        />
        <Script
          id="webfontloader"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              WebFont.load({
                google: {
                  families: ['Roboto Slab']
                }
              });
            `
          }}
        />
      </body>
    </Html>
  );
}