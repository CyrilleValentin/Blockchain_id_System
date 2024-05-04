"use client";
import { Inter } from 'next/font/google'
import { Navbar } from "@/components/ui/Navbar";
import Provider from "@/components/Provider";
import { Banniere } from "@/components/ui/banniere";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from '@/components/themes-provider';

const inter = Inter({ subsets: ['latin'] })
   export default function RootLayout() {
    return (
      <html lang="en">
        <body className={inter.className} >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
       <Navbar/>
          <Banniere/>
          <Footer/>
          </ThemeProvider>
        </body>
       
      </html>
    )
  }
  
