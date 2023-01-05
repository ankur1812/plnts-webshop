import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react';
import Modal  from "../../comps/Modal";

import {useCookies} from 'react-cookie'

export default function Basket( ) {
    // debugger;
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    
    const [mycart, syncCookieWithApp] = useState([]);
    const [totalprice, setTotalPrice] = useState(-1);
    const [showModal, toggleModdle] = useState(false);
    const [successMsg, updateSuccessMsg] = useState("");

     

    useEffect( () => {
        debugger;
        if (Array.isArray(cookies.mycart) && totalprice == -1 ) {
            let sum_price = cookies.mycart.reduce( (price, product) => price+product.price, 0)
            syncCookieWithApp(cookies.mycart)
            setTotalPrice(sum_price)
        }
    })


    const remove = (id) => {
        let newcart = mycart.filter( item => item.id !== id);
        let sum_price_new = newcart.reduce( (price, product) => price+product.price, 0)
        setCookie('mycart', newcart)
        syncCookieWithApp(newcart)
        setTotalPrice(sum_price_new)
    }

    const placeOrder = () => {
        toggleModdle(false);
        setCookie('mycart', [])
        syncCookieWithApp([])
        updateSuccessMsg("success")
        setTotalPrice(0)
    }
    
    
    return <div>
        {showModal && (
            <Modal title="Place Order" onClose={()=>toggleModdle(false)}>
                <div className='text-2xl'> Enter Delivery Details</div>
                <form className='flex flex-wrap justify-between'>
                    <div><label>First Name</label><input placeholder='First Name'/></div>
                    <div><label>Last Name</label><input placeholder='Last Name'/></div>
                    <div><label>Phone</label><input type='number' placeholder='Phone'/></div>
                    <div><label>House Number</label><input placeholder='Address'/></div>
                    <div><label>Street</label><input placeholder='Street'/></div>
                    <div><label>City</label><input placeholder='City'/></div>
                    <div><label>PIN</label><input placeholder='Pincode'/></div>
                    <div><label>Country</label><input placeholder='Country'/></div>
                </form>
                <button className="text-white bg-yellow-500 p-2 p-l-4 p-r-4 my-4 rounded-3xl" onClick={()=> placeOrder()}> Place Order</button>

            </Modal>
        )}
        <h1 className='text-4xl text-green-400'>Shopping Cart</h1>
        {
            Array.isArray(mycart) && (
                <>
                    <div id="list" className='min-w-full'>
                        {mycart.length == 0 && (<div>
                            You haven't added any items to the cart yet. Check the <Link href="webshop">Products page</Link> to select items!
                        </div>)}
                        {mycart.map( p => 
                            <div key={p.id} className=" flex h-1/2 p-2 border border-black m-4 w-1/2" styles={{width: '100px'}}>
                                <Link href={`/webshop/${p.id}`} className="float-left">
                                    <img className="product-img w-12 mx-2" src={p.image}/>
                                </Link>
                                <div className="product-title mx-6 ">{p.title}</div>
                                <div className="product-price float-right">{p.price}</div>
                                <button className="text-white bg-yellow-500 p-2 p-l-4 p-r-4 my-4 rounded-3xl" onClick={ () => {remove(p.id); }}> Remove</button>
                                {/* </div> */}
                            </div>
                        )}
                    </div>
                    {mycart.length > 0 && (<>
                        <div>Total Price is {totalprice}</div>
                        <button className="text-white bg-yellow-500 p-2 p-l-4 p-r-4 my-4 rounded-3xl" onClick={ () => {toggleModdle(true); }}> Place Order</button>
                    </>)}
                </>
            )
        }
    </div>
}

const sample_product  =   {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  }

