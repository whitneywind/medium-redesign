import Link from "next/link"
import { Post } from "../../typings"
import { urlFor } from "../../sanity"
import PortableText from "react-portable-text"

type Props = {
    post: Post
}

const PostPreview = (props: Props) => {
    const post = props.post;
  return (
    <Link key={post._id} href={`/post/${post.slug.current}`} className='w-full bg-white shadow-lg border border-1 border-gray-200 p-4'>
        <div className="flex justify-between">
            <div className="mb-4">
                <div className="border-b border-black w-3/4 mt-4 mb-1 pb-2">
                    <h1 className="text-lg font-bold">{post.title}</h1>
                </div>
                <div className="flex w-2/3 justify-between">
                    <p>{post.author.name}</p>
                    <p>{new Date(post._createdAt).toLocaleString().split(',')[0]}</p>
                </div>
            </div>
            <div className="">
                <img src={urlFor(post.mainImage).url()!} alt="image" className='object-cover object-center h-[6rem] w-[6rem] rounded-full' />
            </div>
        </div>
        <article>
            <p className="text-sm">{post.intro}</p>
        </article>
    </Link>
  )
}

export default PostPreview;