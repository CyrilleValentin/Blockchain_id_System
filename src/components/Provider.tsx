"use client"
import React from 'react';
import { ThirdwebProvider, coinbaseWallet, localWallet, magicLink, metamaskWallet, safeWallet, walletConnect } from '@thirdweb-dev/react';
import { Navbar } from './ui/Navbar';




export default function Provider({children}:{children:React.ReactNode}) {
    return (
        <ThirdwebProvider
      clientId="bbede97e901ee491f7c650d66c3b64b2n  "
         activeChain="mumbai"
      //supportedChains={[Sepolia]}
      supportedWallets={[
        metamaskWallet(),
      ]}

    >
      <Navbar/> 
      {children}
    </ThirdwebProvider>
    );
};