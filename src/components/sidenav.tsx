import Link from 'next/link';
import NavLinks from './nav-links';
import Image from 'next/image';


export default function SideNav() {
  return (
    <div className="flex w-full h-full flex-col justify-center px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 justify-center w-full items-center rounded-md bg-gray-100 p-4 md:h-40"
        href="/"
      >
        <div className="w-full flex flex-col gap-2 items-center justify-center text-black md:w-40">
          <Image src={'/logo.png'} width={80} height={80} alt='logo'/>
          <h1 className='font-extrabold text-blue-500'>ID CARD APP</h1>
          
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <Link href={"/"} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            
            <div className="hidden md:block">Sign Out</div>
          </Link>
        </form>
      </div>
    </div>
  );
}
