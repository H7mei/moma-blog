import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import Link from 'next/link';

function Not() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }, [router]);
  return (
    <>
      <Head>
        <title>404</title>
        <link rel='icon' href='/connection.png' />
      </Head>
      <body className='overflow-hidden'>
        <div className='flex h-[100vh] w-[100vw] items-center justify-center bg-white filter'>
          <div className='z-10 cursor-pointer bg-black p-5 text-center text-white shadow-2xl'>
            <Link href='/' passHref>
              <h1 className='text-lg'>Halaman tidak ditemukan</h1>
            </Link>
          </div>
        </div>
      </body>
    </>
  );
}

export default Not;
