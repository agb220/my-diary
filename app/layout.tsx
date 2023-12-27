import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import Logo from '../components/Logo';

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ['latin'], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: 'Diary',
  description: 'Nice diary app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} flex flex-col items-center mt-10 bg-gray-500`}>
        <Logo/>
        {children}
      </body>
    </html>
  )
}
