
import { Card } from "@/components/cards";
import { countContract } from "@/utils/db";
import React from "react";


async function getCardsCount() {
  // Fetch data from your API here.
  const cards = await countContract();
  return cards
}

export default  async function Page() {
  const countResult = await getCardsCount();
  console.log(countResult);
  const roleIssuer = 'Issuer';
  const roleVerifier = 'Verifier';
  const responseIssuer = await fetch('http://localhost:3000/count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roleIssuer }),
  });
  const countIssuer = await responseIssuer.json();

  const responseVerifier = await fetch('http://localhost:3000/count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roleVerifier }),
  });
  const countVerifier = await responseVerifier.json();


  return (
    <main className="w-full  flex   flex-col items-center justify-center">
      <h1 className="text-6xl mb-28 font-bold text-center ">STATISTICS</h1>
      <div className=" flex w-full justify-around">
        <Card title={"Verifiers"} value={`${countVerifier}`} type={"verifiers"} />
        <Card title={"Issuers"} value={`${countIssuer}`} type={"issuers"} />
        <Card title={"Cards"} value={`${countResult}`} type={"cards"} />
      </div>
    </main>
  );
}
