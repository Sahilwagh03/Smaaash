import Link from 'next/link'
import { FaFacebookF, FaInstagram } from 'react-icons/fa6'

type Props = {}

const SocialFloating = (props: Props) => {
    return (
        <div className='fixed top-[80%] md:top-[40%] right-0 bg-white rounded-tl-xl rounded-bl-xl h-auto px-7 py-4 z-10 gap-8 w-10 flex flex-col items-center justify-center'>
            <Link href='#'>
                <FaInstagram className='w-8 h-8 text-black hover:text-[var(--brand-primary)]' />
            </Link>
            <Link href='#'>
                <FaFacebookF className='w-8 h-8 text-black hover:text-[var(--brand-primary)]' />
            </Link>
        </div>
    )
}

export default SocialFloating