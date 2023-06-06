import Link from "next/link"
import { Post } from "../../typings"
import { urlFor } from "../../sanity"

type Props = {
    post: Post
}

const PostPreview = (props: Props) => {
    const post = props.post;
  return (
    <Link key={post._id} href={`/post/${post.slug.current}`} className='w-full bg-white shadow-lg border border-1 border-gray-200 p-4'>
        <div className="flex justify-between gap-5 w-full py-2 my-2">
            <div className="pb-2 w-2/3">
                <div className="border-b-2 border- border-black mt-4 mb-1">
                    <h1 className="text-lg font-bold">{post.title}</h1>
                </div>
                <div className="flex justify-between text-xs">
                    <p>{post.author.name}</p>
                    <p>{new Date(post._createdAt).toLocaleString().split(',')[0]}</p>
                </div>
            </div>
            <div className="w-1/3 flex justify-center place-items-center">
                <img src={urlFor(post.mainImage).url()!} alt="image" className='object-cover object-center rounded-full w-[5rem] h-[5rem]' />
            </div>
        </div>
        <article>
            <p className="text-sm text-gray-700">{post.intro}</p>
        </article>
    </Link>
  )
}

export default PostPreview;