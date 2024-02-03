import Image from "next/image";
import { Form } from "./registration/page";
import { Inter } from 'next/font/google'
import { Navbar } from "@/components/ui/Navbar";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ['latin'] })
// export default function Home() {
//   return (
//     <div className="flex justify-center items-center ">
//       <Form/>
//     </div>
//   )
//    }

   export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className={inter.className}>
        <Provider {...Navbar}>
        
        </Provider>
          <Form/>
        
        </body>
       
      </html>
    )
  }
  
