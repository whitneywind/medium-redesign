import Link from "next/link"
import { SiMedium } from "react-icons/si"

type Props = {}
const Header = (props: Props) => {
  return (
    <div className="px-4 sm:px-14 pt-8 pb-4 w-full border-b border-black">
        <Link href="/" className="flex items-center justify-center w-full">
            <SiMedium className="text-6xl mr-2"/>
            <h1 className="text-5xl font-serif tracking-tighter">Medium</h1>
        </Link>
        {/* <div className="flex items-center justify-around space-x-6">
            <p className="hidden md:block">Our Story</p>
            <p className="hidden md:block">Write</p>
            <p>Sign In</p>
            <p className="bg-black text-white text-md py-2 px-4 rounded-full">Get Started</p>
        </div> */}
    </div>
  )
}
export default Header