import Image from 'next/image';

function Hero() {
  return (
    <div className='relative'>
      <Image
        src='https://i.postimg.cc/kGMgt2W9/hero.jpg'
        alt=''
        layout='responsive'
        width={100}
        height={30}
        objectFit='cover'
        className=''
        priority
      />
      <div className='absolute top-0 flex h-[100%] w-[100%] items-center justify-center'>
        <div className='group h-12'>
          <h1 className='text-1xl bg-black p-2 uppercase text-white md:text-2xl'>
            personal technical blog
          </h1>
          <p className='hidden bg-white p-1 text-xs text-black ease-in-out group-hover:inline-block group-hover:translate-x-4 group-hover:animate-pulse'>
            by hanafichoi
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
