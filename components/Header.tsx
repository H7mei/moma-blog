import Link from 'next/link';

function header() {
  return (
    <header className='mx-auto flex max-w-7xl justify-between p-5'>
      <div className='flex items-center space-x-5'>
        <Link href='/'>
          <img
            className='w-20 cursor-pointer object-contain'
            src='https://i.postimg.cc/QC4btYVG/Logo-Acara-Online-Sederhana-Melingkar-Hijau-dan-Emas.png'
          />
        </Link>
        <div className='hidden items-center space-x-5 md:inline-flex'>
          <h3 className='cursor-pointer'>
            <a href='https://awesome-easley-7e8a3e.netlify.app/'>About</a>
          </h3>
          <h3>Contact</h3>
          <h3 className='rounded-full bg-green-900 px-4 py-1 text-white'>
            Follow
          </h3>
        </div>
      </div>
      <div className='flex items-center space-x-5 text-green-900'>
        <h3>Sign In</h3>
        <h3 className='rounded-full border border-green-900 px-4 py-1'>
          Get Started
        </h3>
      </div>
    </header>
  );
}

export default header;
