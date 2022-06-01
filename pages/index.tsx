import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import {sanityClient, urlFor} from '../sanity';
import {Post} from '../typings';
import Hero from '../components/Hero';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {useState} from 'react';

interface Props {
  posts: [Post];
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Home({posts}: Props) {
  const [isLoading, setLoading] = useState(true);
  return (
    <>
      <Head>
        <title>Moma Blog</title>
        <link rel='icon' href='/connection.png' />
      </Head>
      <body className='scroll-smooth'>
        <Header />
        <Hero />
        {/* post */}
        <div className='mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 gap-3 p-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6 md:p-6 lg:grid-cols-4'>
            {posts.map((post) => (
              <Link key={post._id} href={`/post/${post.slug.current}`}>
                <div className='group cursor-pointer overflow-hidden border'>
                  <div className='relative h-40 w-full'>
                    <Image
                      className={cn(
                        'duration-100 ease-in-out group-hover:scale-105 group-hover:opacity-75',
                        isLoading
                          ? 'scale-110 blur-sm '
                          : 'scale-100 blur-none',
                      )}
                      src={urlFor(post.mainImage).url()!}
                      layout='fill'
                      objectFit='cover'
                      alt=''
                      onLoadingComplete={() => setLoading(false)}
                    />
                  </div>
                  <div className='flex justify-between bg-white p-5'>
                    <div>
                      <p className='text-lg font-bold'>{post.title}</p>
                      <p className='text-xs'>
                        {post.description} by {post.author.name}
                      </p>
                      <p className='text-[10px]'>
                        {`${new Date(post._createdAt).getDate()}/${
                          new Date(post._createdAt).getMonth() + 1
                        }/${new Date(post._createdAt).getFullYear()}`}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </body>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
  _createdAt,
    title,
    author -> {
      name,
      image
  },
     description,
     mainImage,
     slug
    }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
