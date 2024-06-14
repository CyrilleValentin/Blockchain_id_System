import { File, FilePlus2, FileSearch2 } from 'lucide-react';
const iconMap = {
  verifiers: FileSearch2,
  issuers: FilePlus2,
  cards: File,
};

export default async function CardWrapper() {
  return (
    <>

      {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number |string;
  type: 'verifiers' | 'cards'| 'issuers' ;
}) {
   const Icon = iconMap[type];

  return (
    <div className="rounded-xl w-[10rem] bg-gray-100 p-2 shadow-sm">
      <div className="flex h-10 justify-center items-center">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-xl font-medium">{title}</h3>
      </div>
      <p
        className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
