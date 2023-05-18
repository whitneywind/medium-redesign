import Header from './Header'
import { sanityClient } from "../../sanity"
import { Post } from '../../typings'
import PostPreview from './PostPreview';

export default async function Home() {
  const posts: Post[] = await getData();
  return (
    <div className='md:w-3/4 max-w-4xl mx-auto'>
      <Header />
      <main className="flex flex-col items-center justify-between">
        <div className='bg-amber-300 w-full p-12 border-b border-black'>
          <h3 className='font-serif text-5xl'>Stay curious.</h3>
          <p><span className='underline'>Medium</span> is the place to discover stories, thinking, and expertise from writers on any topic.</p>
        </div>
      </main>
      <div className='max-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {posts.map(post => (
          <PostPreview post={post}/>
        ))}
      </div>
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