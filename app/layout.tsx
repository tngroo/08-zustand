import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Header from '@/components/Header/Header'
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ['cyrillic', 'latin'],
  weight: ['400'],
  variable: '--font-roboto',
  display: 'swap'
})
export const metadata: Metadata ={
  title: 'NoteHub',
  description: 'Application for notes',
  openGraph : {
    title: 'NoteHub', 
    description: 'NoteHub application',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 300,
        height: 300,
      alt: 'NoteHub',      
    }
    ]
  }
}

interface LayoutProps{
  children: React.ReactNode
  modal: React.ReactNode
}
export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="en" >
<TanStackProvider>
      <body className={`${roboto.variable} `}>
      <Header />
      {children}
      {modal}
      <Footer />
      </body>
      </TanStackProvider>
    </html>
  );
}
