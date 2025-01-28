"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'primereact/resources/themes/lara-light-purple/theme.css'
import 'primereact/resources/primereact.min.css'; // Estilos principais
import 'primeicons/primeicons.css'; // Ícones
import 'primeflex/primeflex.css'; // Opcional: PrimeFlex para Grid System
import Header from "./_components/Header";
import {PrimeReact, PrimeReactProvider} from 'primereact/api';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex justify-center antialiased`}
      >
        <PrimeReactProvider>
        <Header/>
      
      {children}
        </PrimeReactProvider>
        
      </body>
    </html>
  );
}
