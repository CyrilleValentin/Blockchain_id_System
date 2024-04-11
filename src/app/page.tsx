"use client";
import { Inter } from 'next/font/google'
import { Navbar } from "@/components/ui/Navbar";
import Provider from "@/components/Provider";
import { Banniere } from "@/components/ui/banniere";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ['latin'] })
   export default function RootLayout() {
    return (
      <html lang="en">
        <body className={inter.className}>
       <Navbar/>
          <Banniere/>
          <Footer/>
        </body>
       
      </html>
    )
  }
  
