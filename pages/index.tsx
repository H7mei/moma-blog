import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div>
      <Head>
        <title>Moma Blog</title>
        <link rel="icon" href="https://i.postimg.cc/QC4btYVG/Logo-Acara-Online-Sederhana-Melingkar-Hijau-dan-Emas.png" />
      </Head>

      <Header />

      <div className=" border-y border-black bg-green-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between  py-10 lg:py-0">
          <div className="space-y-5 px-10">
            <h1 className="max-w-xl font-serif text-6xl">
              <span className="underline decoration-black decoration-4">Aloha!!</span> is a place to my share post and connect
            </h1>
            <h2>everything is so easy to say but hard to do</h2>
          </div>
          <img className="hidden h-32 md:inline-flex lg:h-96" src="https://i.postimg.cc/282SC2Bw/bunga.png" alt="" />
        </div>
      </div>

      {/* post */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="group cursor-pointer overflow-hidden rounded-lg border">
                <img className="transition-trabsform h-60 w-full object-cover duration-200 ease-in-out group-hover:scale-105" src={urlFor(post.mainImage).url()!} alt="" />
                <div className="flex justify-between bg-white p-5">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-xs">
                      {post.description} by {post.author.name}
                    </p>
                  </div>

                  <img className="h-12 w-12 rounded-full" src={urlFor(post.author.image).url()!} alt="" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
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
