/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export const Banniere = () => {

  return (
    <header className="w-full h-screen flex px-4  flex-row my-2 gap-4  ">
      <Image
        className=" rounded-xl w-[50%] h-full object-cover  "
        src="/hero.jpg"
        width={200}
        height={400}
        alt="hero"
      ></Image>
      <div className="  flex justify-center items-center flex-col gap-4 rounded-xl w-[50%] h-full">
        <h1 className="md:text-xl lg:text-6xl text-center text-[#1C9BD6] font-extrabold  ">
          Create and Verify Identity Card
        </h1>
        <span className=" text-xl text-center font-light">
        Our ID card authentication system uses the latest technology to verify the authenticity 
        of your ID card, ensuring that your identity is secure and protected against fraud and identity theft.
         It's fast, efficient and easy to use, allowing you to access the online services you need with confidence.
        </span>
        
      </div>
    </header>
  );
};


