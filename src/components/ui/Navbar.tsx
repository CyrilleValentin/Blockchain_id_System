"use client"
import { ConnectWallet } from "@thirdweb-dev/react";
 export const Navbar=()=>{
return(
    <div className="w-full h-16 flex bg-[#0C061C]  justify-between" >
        <div className="px-4 flex items-center text-white">LOGO</div>
        <div className="flex items-center">
            <nav>
                <ul className="flex items-center gap-8 text-white">
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Contenu</a></li>
                    <li><a href="#">Propos</a></li>
                </ul>
            </nav>
        </div>
    <div className="px-4 flex items-center">
    <ConnectWallet theme={"dark"} btnTitle="Connect Wallet" />
    </div>
  </div>
);
}
