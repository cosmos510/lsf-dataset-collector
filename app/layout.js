import localFont from "next/font/local";
import "./globals.css";
import ClientSessionWrapper from "./components/ClientSessionWrapper";
import CookieConsent from "./components/CookieConsent";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "LSF Dataset Creator - Contribuez à la langue des signes",
  description: "Participez à la création d'un dataset pour la reconnaissance de la Langue des Signes Française. Contribuez à rendre la technologie plus accessible.",
  keywords: "LSF, langue des signes, dataset, accessibilité, machine learning, reconnaissance gestuelle",
  authors: [{ name: "LSF Dataset Creator" }],
  openGraph: {
    title: "LSF Dataset Creator",
    description: "Contribuez à la création d'un dataset pour la LSF",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ClientSessionWrapper>
          {children}
        </ClientSessionWrapper>
        <CookieConsent />
      </body>
    </html>
  );
}
