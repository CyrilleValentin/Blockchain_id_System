"use client";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ModeToggle } from "../theme-toggle";
export const Navbar = () => {
  const router = useRouter();
  return (
    <div className="w-full  h-16 flex  shadow-lg justify-between border-gray-400 border-b-[1px]">
      <div className=" h-full w-[16rem]  gap-4 justify-center items-center flex">
        <Image src={"/logo.png"} width={60}  height={30} alt="logo" />
        <h1 className="  font-extrabold text-2xl">ID SCAN APP</h1>
      </div>

      <div className="px-4 flex flex-row gap-4 items-center">
        <ConnectWallet
          theme={"dark"}
          btnTitle="Connect Wallet"
          onConnect={() => {
            console.log("wallet connected");
            router.push("/dashboard");
          }}
        />
        <ModeToggle/>
      </div>
    </div>
  );
};
