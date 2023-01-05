import Link from 'next/link'
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { HiShoppingCart } from 'react-icons/hi';

const Navbar = () => {
    let logo = "https://cdn3.vectorstock.com/i/1000x1000/11/52/plant-icon-with-leaves-on-stems-that-grow-from-vector-20931152.jpg"
    return <nav className='flex justify-between b-b-2'>
        {/* <div> Navigate our webshop</div> */}
        <div className='flex'>
            <Link href="/" className='float-left flex'>
                <img className="w-12 float-left" src={logo}/>
                <div className='float-left my-4'>PLNTS</div>
            </Link>
            <Link href="/webshop" className='mx-6 my-4'><BsGrid3X3GapFill className='mx-2'/> Store</Link>
        </div>
        <div className='float-right flex'>
            <Link href="/basket" className="mx-6 my-4">
                <HiShoppingCart className='mx-2'/>
                <span>Cart</span>

            </Link>
        </div>
        {/* <Link href="/">About</Link> */}
        {/* <Link href="/">Contact Us</Link> */}
    </nav>
}

export default Navbar;