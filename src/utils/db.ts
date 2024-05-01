

import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function SaveCard(img: string, doc: string) {
  await prisma.contract.create({
    data: {
      imageHash: img,
      documentHash: doc,

    },
  })

}
//"https://fuchsia-definite-fowl-804.mypinata.cloud/ipfs/QmTnHQ4B4Seztzenz7QG6jqoqZsPKyGDFBNUFUZBQzdJHf");

async function getContracts() {
  const allContracts = await prisma.contract.findMany()
  console.log(allContracts)
  return allContracts;
}
export  {SaveCard, getContracts};

