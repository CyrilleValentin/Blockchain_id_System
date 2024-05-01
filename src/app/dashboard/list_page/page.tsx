import DataTable, { Cards, columns } from "@/components/datatable";
import { getContracts } from "@/utils/db";

async function getData():Promise<Cards[]> {
  // Fetch data from your API here.
  const data = await getContracts();
  return data.map(contract => ({
    imgHash: contract.imageHash,
    docHash: contract.documentHash,
  }));
 
}

export default async function ListCard() {
  const data = await getData();
  return (
    <main className=" w-[55rem] h-[28rem] flex justify-center items-center flex-col">
      <h1 className="text-6xl mb-8 font-bold ">LIST OF ID CARDS </h1>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
