import Link from 'next/link';

function header() {
  return (
    <div className='z-50 bg-black text-white'>
      <div className='mx-auto flex h-11 max-w-7xl items-center justify-between'>
        <div className='flex items-center'>
          <div className='ml-3 cursor-not-allowed text-xl uppercase md:ml-10'>
            moma
          </div>
          <ul className='ml-6 flex md:ml-10'>
            <li className='mr-3 h-6 hover:border-b-2'>
              <Link href='/'>blog</Link>
            </li>
            <li className='mr-3 h-6 hover:border-b-2'>
              <Link href='/about'>about</Link>
            </li>
          </ul>
        </div>
        <div className='group cursor-pointer'>
          <h1 className='mr-3 group-hover:hidden md:mr-10'>search</h1>
          <h1 className='mr-3 hidden bg-white p-1 text-black group-hover:inline-block md:mr-10'>
            working on it ^,^
          </h1>
        </div>
      </div>
    </div>
  );
}

export default header;
