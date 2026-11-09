import type { ReactNode } from "react";

export const metadata = { title: "BV-Sallaj Boden & Innenausbau", robots: { index: false, follow: true } };

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="canonical" href="/de/" />
        {/* Choose saved / browser language, fall back to German */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var L=["de","en","sq"],l="de";try{var s=localStorage.getItem("bvsallaj-lang");if(L.indexOf(s)>-1)l=s;else{var n=(navigator.language||"de").slice(0,2).toLowerCase();if(L.indexOf(n)>-1)l=n}}catch(e){}location.replace("/"+l+"/")})();`,
          }}
        />
        <noscript>
          <meta httpEquiv="refresh" content="0; url=/de/" />
        </noscript>
      </head>
      <body style={{ background: "#FFFFFF" }}>{children}</body>
    </html>
  );
}
