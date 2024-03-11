import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

async function main() {
    const allContracts = await prisma.contract.findMany()
    console.log(allContracts)
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })