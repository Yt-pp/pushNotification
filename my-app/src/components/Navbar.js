import Link from 'next/link';
import Settings from '@/app/user/settings';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="font-bold">My App</h1>
        <div className='flex gap-3'>
          <Link href="/user/inbox" className="mr-4">Inbox</Link>
          <Settings/>
          <Link href="/admin/dashboard">Admin Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
