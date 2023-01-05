import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ( {children} ) => {
    return  (
        <div>
            <Navbar/>
                <div id="plnts-contents" className='my-20'>
                    {children}
                </div>
            <Footer/>
        </div>
    )
}

export default Layout;