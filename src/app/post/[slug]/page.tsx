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

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main className='lg:w-3/4 max-w-4xl mx-auto mb-16'>
      <Header />
      <article className="">
        <h1 className="text-5xl my-7 text-center mx-auto w-full tracking-wide font-serif">{post.title}</h1>
        <div className="w-full h-72 md:h-[24rem] xl:h-[30rem] overflow-hidden">
          <img src={urlFor(post.mainImage).url()} alt="main image" className="w-full h-full object-cover object-center" />
        </div>
        <div className="w-2/3 mx-auto lg:w-full">
          <div className="w-full my-10">
            <div className="flex flex-col h-24justify-center items-center space-y-3">
                <p>By {post.author.name}<span className="text-gray-500"> | Staff Writer</span></p>
                <p>{new Date(post._createdAt).toLocaleString().split(',')[0]}</p>
            </div>
          </div>
          <PortableText 
            content={post.body}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            className="text-justify"
            serializers={{
              h1: (props: any) => (
                  <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h4: (props: any) => (
                  <h2 className="text-xl font-bold my-5" {...props} />
              ),
              normal: (props: any) => (
                <p className="my-5" {...props} />
              ),
          }}
          />
          <div>
            <button type="button" className="bg-yellow-500 w-full py-2 rounded-md">Hide Comments</button>
            <div>existing comments here</div>
            <form className="w-full">
              <textarea className="border-2 b block w-full h-24 " placeholder="Write your comment here" />
              <div className="flex justify-center">
                <button type="submit" className="w-1/3 bg-green-500 rounded-md py-2">post comment</button>
              </div>
            </form>
          </div>
        </div>
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