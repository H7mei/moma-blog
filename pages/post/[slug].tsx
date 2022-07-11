import {GetStaticProps} from 'next';
import Head from 'next/head';
import Header from '../../components/Header';
import {sanityClient, urlFor} from '../../sanity';
import {Post} from '../../typings';
import PortableText from 'react-portable-text';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useState} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Image from 'next/image';
import Link from 'next/link';
import toast, {Toaster} from 'react-hot-toast';

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function Post({post}: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const notification = toast.loading('Please wait...');

    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
        toast.success('Comment submitted!', {
          id: notification,
        });
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel='icon' href='/connection.png' />
      </Head>
      <body className=' scroll-smooth'>
        <Toaster />
        <Header />
        <div className='relative h-40 w-full'>
          <Image
            layout='fill'
            objectFit='cover'
            src={urlFor(post.mainImage).url()!}
            alt=''
            priority
          />
        </div>
        <article className='mx-auto max-w-3xl p-5'>
          <h1 className='mt-8 mb-3 text-3xl'>{post.title}</h1>
          <h2 className='mb-2 text-xl font-light text-gray-500'>
            {post.description}
          </h2>
          <div className='flex items-center space-x-2'>
            <img
              className='h-10 w-10 rounded-full'
              src={urlFor(post.author.image).url()!}
              alt=''
            />
            <p className='text-sm font-extralight'>
              Blog post by{' '}
              <span className='text-stone-900'>{post.author.name}</span> -
              Published at {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>

          <div className='mt-10'>
            <PortableText
              className=''
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className='my-5 text-2xl font-bold' {...props} />
                ),
                h2: (props: any) => (
                  <h1 className='my-5 text-xl font-bold' {...props} />
                ),
                li: ({children}: any) => (
                  <li className='ml-4 list-disc'>{children}</li>
                ),
                link: ({href, children, blank}: any) => (
                  <a
                    className='text-blue-500 hover:underline'
                    href={href}
                    target={blank ? '_blank' : ''}
                  >
                    {children}
                  </a>
                ),
                // code: ({code, language}: any) => {
                //   return (
                //     <SyntaxHighlighter language={language}>
                //       {code}
                //     </SyntaxHighlighter>
                //   );
                // },
              }}
            />
          </div>
        </article>

        <hr className='my-5 mx-auto max-w-lg border border-black' />

        {submitted ? (
          <div className='my-10 mx-auto flex max-w-2xl flex-col bg-black p-10 text-white'>
            <h3 className='text-3xl font-bold'>
              Thank you for submitting your comment!
            </h3>
            <p>Once it has been approved, it will appear bellow!</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mx-auto mb-10 flex max-w-2xl flex-col p-5'
          >
            <h3 className='text-sm text-black'>Enjoyed this article?</h3>
            <h2 className='text-3xl font-bold'>Leave a comment bellow!</h2>
            <hr className='mt-2 py-3' />

            <input
              {...register('_id')}
              type='hidden'
              name='_id'
              value={post._id}
            />

            <label className='mb-5 block'>
              <span className='text-gray-700 '>Name</span>
              <input
                {...register('name', {required: true})}
                className='form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-black focus:ring'
                placeholder='John Connor'
                type='text'
              />
            </label>
            <label className='mb-5 block'>
              <span className='text-gray-700 '>Email</span>
              <input
                {...register('email', {required: true})}
                className='form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-black focus:ring'
                placeholder='your@email.com'
                type='email'
              />
            </label>
            <label className='mb-5 block'>
              <span className='text-gray-700 '>Comment</span>
              <textarea
                {...register('comment', {required: true})}
                className='form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-black focus:ring'
                placeholder='Enter some long form comment'
                rows={8}
              />
            </label>

            {/* error return validation */}
            <div className='flex flex-col p-5'>
              {errors.name && (
                <span className='text-red-500'>
                  - The Name Field is required
                </span>
              )}
              {errors.comment && (
                <span className='text-red-500'>
                  - The Comment Field is required
                </span>
              )}
              {errors.email && (
                <span className='text-red-500'>
                  - The Email Field is required
                </span>
              )}
            </div>

            <input
              type='submit'
              className='focus:shadow-outline cursor-pointer rounded bg-black py-2 px-4 font-bold text-white shadow hover:bg-gray-900 focus:outline-none'
            />
          </form>
        )}

        {/* Comments */}
        <div className='my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-black'>
          <h3 className='text-4xl'>Comments</h3>
          <hr className='pb-2' />
          {post.comments.map((comment) => (
            <div key={comment._id}>
              <p className=''>
                <span className='text-black'>{comment.name}: </span>
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
        <div className='relative h-10 md:h-0'>
          <div className='absolute  bottom-2 right-2 animate-pulse bg-black p-3 text-white duration-150'>
            <Link href='/'>back</Link>
          </div>
        </div>
      </body>
    </>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
    }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // after 60 seconds, itll update the old cacted version
  };
};
