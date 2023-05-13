import Image from 'next/image'
import Header from './Header'
import { sanityClient } from "../../sanity"
import { Post } from '../../typings'

interface Props {
  posts: Post[];
}

export default async function Home() {
  const data = await getData();
  console.log('this is the data:', data)
  return (
    <div className='lg:w-3/4 max-w-4xl mx-auto'>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className='bg-amber-300 w-full p-12 border-b border-black'>
          <h3 className='font-serif text-5xl'>Stay curious.</h3>
          <p><span className='underline'>Medium</span> is the place to discover stories, thinking, and expertise from writers on any topic.</p>
        </div>
      </main>
    </div>
  )
}

export async function getData() {
    let query = `*[_type == "post"]{
    _id,
    title,
    slug,
    mainImage,
    author -> {
      name,
      image
    }
  }`;
  const posts = await sanityClient.fetch(query)

  //   if (!posts.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }
  return posts
}

// async function getData() {
//   let query = `*[_type == "post"]{
//     _id,
//     title,
//     slug,
//     mainImage,
//     author -> {
//       name,
//       image
//     }
//   }`;
//   const res = await sanityClient.fetch(query);

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

// export const getServerSideProps = async () => {
//   let query = `*[_type == "post"]{
//     _id,
//     title,
//     slug,
//     mainImage,
//     author -> {
//       name,
//       image
//     }
//   }`;
//   const posts = await sanityClient.fetch(query);
//   return {
//     props: {
//       posts,
//     }
//   }
// }
