import Link from 'next/link'

const Navbar = () => {
    return <nav>
        <div> Navigate our webshop</div>
        <Link href="/">Home</Link>
        <Link href="/webshop">Store</Link>
        <Link href="/basket">Basket</Link>
        {/* <Link href="/">About</Link> */}
        {/* <Link href="/">Contact Us</Link> */}
    </nav>
}

export default Navbar;