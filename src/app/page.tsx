import Header from './Header'
import { sanityClient } from "../../sanity"
import { Post } from '../../typings'
import PostPreview from './PostPreview';

export default async function Home() {
  const posts: Post[] = await getData();
  return (
    <div className='sm:w-3/4 max-w-4xl mx-16 md:mx-auto'>
      <Header />
      <div className='w-full flex justify-center border-b border-black'>
        <ul className='inline-flex text-sm space-x-8 my-3 tracking-wide text-gray-800'>
          <li>Home</li>
          <li>Art</li>
          <li>Exploration</li>
          <li>Culinary</li>
        </ul>
      </div>
      <div className='max-w-full min-h-[35rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-4 gap-4 my-4'>
        {posts.map((post, ind) => (
          <div key={ind} className={`art${ind} w-full shadow-lg border border-1 border-gray-200 p-5`}>
            <PostPreview key={ind} index={ind} post={post} />
          </div>
        ))}
      </div>
      <main className="flex sm:col-span-2 flex-col items-center justify-between">
        <div className='bg-amber-300 w-full p-12 sm:flex border-y border-black'>
          <h3 className='font-serif text-5xl text-center sm:text-left'>Stay curious.</h3>
          <p className='hidden sm:block sm:w-2/3 mt-2 lg:ml-24 sm:text-justify lg:text-right lg:mt-6'><span className='underline'>Medium</span> is the place to discover `stories, thinking, and expertise from writers on any topic.</p>
        </div>
      </main>
    </div>
  )
}

export async function getData() {
  let query = `*[_type == "post"]{
    _id,
    _createdAt,
    title,
    slug,
    mainImage,
    author -> {
      name,
      image
    },
    body,
    intro
  }`;
  const posts = await sanityClient.fetch(query)
    if (!posts) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return posts
}