import Link from "next/link"
import { Post } from "../../typings"
import { urlFor } from "../../sanity"

type Props = {
    post: Post,
    index: number
}

interface PostPreviewProps {
    post: Post;
    index: number;
  }

  const PostPreview: React.FC<PostPreviewProps> = ({ post, index }) => {
    return (
        <Link href={`/post/${post.slug.current}`} className={`w-full bg-white`}>
            <div id="post-container" className="flex justify-between gap-5 w-full py-2 my-2">
                <div id="info-cont" className="pb-2 w-2/3">
                    <div className="border-b-2 border- border-black mb-1">
                        <h1 className="text-lg font-bold">{post.title}</h1>
                    </div>
                    <div className="flex justify-between text-xs">
                        <p>{post.author.name}</p>
                        <p>{new Date(post._createdAt).toLocaleString().split(',')[0]}</p>
                    </div>
                </div>
                <div id="img-cont" className="w-1/3 flex justify-center place-items-center">
                    <img src={urlFor(post.mainImage).url()!} alt="image" className='object-cover object-center rounded-full w-[5rem] h-[5rem]' />
                </div>
            </div>
            <article>
                <p className="text-sm text-gray-700">{post.intro}</p>
            </article>
            {/* {(index === 0 || index === 1) && (
                 <div id="hidden-img" className="relative pt-6">
                 <img
                   src={urlFor(post.mainImage).url()!}
                   alt="image"
                   className="object-cover object-center w-full"
                   style={{ maxHeight: "100%", width: "100%" }}
                 />
               </div>
            )} */}
        </Link>
  )
}

export default PostPreview;