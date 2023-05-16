import { sanityClient } from "../../../../sanity"
import { Post } from "../../../../typings"

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const { slug } = params;
  const post = await getData(slug);
  console.log(post.title)

  return (
    <div>page{slug}</div>
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


// getStaticProps (like getServerSideProps) has been replaced by a new API inside the app folder
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     const query = `*[_type == "post" && slug.current == $slug][0]{
//             _id,
//             _createdAt,
//             title,
//             author-> {
//             name,
//             image
//             },
//             mainImage,
//             slug,
//             body}`
//     const post = await sanityClient.fetch(query, {
//         slug: params?.slug,});
//     if (!post) {return {notFound: true,}}
//     return {props: {post,}}}