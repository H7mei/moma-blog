import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';

function about() {
  return (
    <>
      <Head>
        <title>About</title>
        <link rel='icon' href='/connection.png' />
      </Head>
      <body className='scroll-smooth'>
        <Header />
        <div className='container mx-auto mt-5 text-center md:mt-16 lg:text-left xl:px-32'>
          <div className='grid items-center lg:grid-cols-2'>
            <div className='mb-12 lg:mb-0'>
              <div className='relative block px-6 py-12 shadow-lg md:px-12 lg:-mr-14'>
                <h2 className='display-5 mb-4 text-3xl font-bold'>
                  Hi there! I'm hanafi!
                </h2>
                <p className='mb-0 mr-0 text-gray-700 lg:mr-10'>
                  blog ini di bikin untuk mendokumentasikan apa yang saya
                  pelajari selama berkarir sebagai programmer
                </p>
                <p className='mt-3 mb-0 mr-0 text-gray-600 lg:mr-10'>
                  feel free to check out my{' '}
                  <a
                    href='https://hanafichoi.netlify.app/'
                    className='underline'
                  >
                    portfolio.
                  </a>
                </p>
              </div>
            </div>

            <div className='relative h-[80vh] w-full shadow-lg'>
              <Image
                src='https://mdbootstrap.com/img/new/ecommerce/vertical/088.jpg'
                layout='fill'
                width={100}
                height={100}
                className='fancy-border-radius rotate-lg-6 w-full '
                objectFit='cover'
                alt=''
                priority
              />
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default about;
