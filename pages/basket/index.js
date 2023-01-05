import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react';
import {useCookies} from 'react-cookie'

export default function Basket( ) {
    // debugger;
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    
    const [mycart, syncCookieWithApp] = useState([]);
    const [totalprice, setTotalPrice] = useState(-1);

     

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
    
    // debugger;
    // console.log(mycart)
    
    return <div>
        <h1 className='text-4xl text-green-400'>Shopping Cart</h1>
        {/* <Hydrate> */}

        {/* <div> Cookie =  {JSON.stringify(mycart)}</div> */}
        <div id="list" className='min-w-full'>
            {Array.isArray(mycart) && mycart.map( p => 
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
        <div>Total Price is {totalprice}</div>
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

