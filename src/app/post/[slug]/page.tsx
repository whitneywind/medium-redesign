import Header from "@/app/Header";
import { sanityClient, urlFor } from "../../../../sanity"
import { Post } from "../../../../typings"
import PortableText from "react-portable-text";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const { slug } = params;
  const post: Post = await getData(slug);

  return (
    <main className='lg:w-3/4 max-w-4xl mx-auto'>
      <Header />
      <article className="">
        <div className="w-full h-fit">
          <div className="w-full h-72 md:h-[24rem] xl:h-[30rem] overflow-hidden">
            <img src={urlFor(post.mainImage).url()} alt="main image" className="w-full h-full object-cover object-center" />
          </div>
          <h3>Author: {post.author.name}</h3>
        </div>
        <PortableText 
          content={post.body}
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
        />
      </article>
    </main>
  )
}

const getData = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
        name,
        image
        },
        mainImage,
        slug,
        body}`;
    const post = await sanityClient.fetch(query, {
          slug,
    });
    return post;
}

export async function generateStaticParams() {
  const query = `
        *[_type == "post"]{
            _id,
            slug {
                current
            }
        }
    `;
  const posts = await sanityClient.fetch(query);
 
  return posts.map((post: Post) => ({
    slug: post.slug.current,
  }));
}