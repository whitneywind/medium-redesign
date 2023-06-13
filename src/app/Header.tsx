import Link from "next/link"
import { SiMedium } from "react-icons/si"

type Props = {}
const Header = (props: Props) => {
  return (
    <div className="px-4 sm:px-14 pt-8 pb-4 w-full border-b border-black">
        <Link href="/" className="flex items-center justify-center w-full">
            <SiMedium className="text-6xl mr-1"/>
            <h1 className="text-5xl font-serif tracking-tighter">Medium</h1>
        </Link>
    </div>
  )
}
export default Header