"use client";
import { Card } from "@/components/cards";

import { ethers } from "ethers";
import React from "react";
import abi from "@/utils/abi.json";

export default function Page() {
  const [contract, setContract] = React.useState<ethers.Contract | null>(null)
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider | null>(null)
  const [signer, setSigner] = React.useState<ethers.providers.JsonRpcSigner | null | undefined>(null)


  async function getAccount() {
    const accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err: { code: number; }) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    const account = accounts[0];
    console.log(account);
  }
  React.useEffect(() => {
    getAccount()
    const newProvider = new ethers.providers.Web3Provider(window.ethereum, "any")

    const newSigner = newProvider?.getSigner()
    setSigner(newSigner)
    setProvider(newProvider)

    const verifierContract = new ethers.Contract("0xA76361bfe70b53697Ef90876e2E386Cf05327488", abi, newSigner)
      setContract(verifierContract)
    // }
  }, [])

  async function getUri() {
    // await contract?.connect(signer)
    console.log(contract)
    const uri = await contract?.grantVerifierRole("0x8298F4605f9893F80966826B8a301c963d0FC514")
    console.log(uri)
  }
  // const {contract}= useContract("0x7da3A33AdeaBC37f8F362fDd804573b382704D98");
  // const {j
  //   data:baseuri,
  //   isLoading
  // }= useContractRead(contract,"getRoleAdmin")

  return (
    <main className="">
      <button onClick={() => getUri()}>Make call</button>
    </main>
  );
}