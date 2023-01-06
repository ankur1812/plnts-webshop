import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react';
import Modal  from "../../comps/Modal";

import {useCookies} from 'react-cookie'
import { HiShoppingCart } from 'react-icons/hi';

export default function Basket( ) {
    // debugger;
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    
    const [mycart, syncCookieWithApp] = useState([]);
    const [totalprice, setTotalPrice] = useState(-1);
    const [showModal, toggleModdle] = useState(false);
    const [formValues, updateFormValues] = useState({});
    const [successMsg, updateSuccessMsg] = useState("");

     

    useEffect( () => {
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
        // syncCookieWithApp([])
        updateSuccessMsg("success")
        // setTotalPrice(0)
    }

    const changeHandler = (e) => {
        let newFormValues = {...formValues}
        console.log(e.target.id  + ' ' + e.target.value);
        newFormValues[e.target.id] = e.target.value;
        console.log(newFormValues)
        updateFormValues({...newFormValues})
    }
    
    
    return <div>
        {showModal && (
            <Modal title="Place Order" onClose={()=>toggleModdle(false)}>
                <div className='text-2xl'> Enter Delivery Details</div>
                <form className='flex flex-wrap justify-between'>
                    <div><label>First Name</label><input id="fname" onChange={changeHandler} placeholder='First Name'/></div>
                    <div><label>Last Name</label><input id="lname" onChange={changeHandler}  placeholder='Last Name'/></div>
                    <div><label>Phone</label><input type='number' id="phone" onChange={changeHandler}  placeholder='Phone'/></div>
                    <div><label>House Number</label><input id="house" onChange={changeHandler}  placeholder='Address'/></div>
                    <div><label>Street</label><input id="street" onChange={changeHandler}  placeholder='Street'/></div>
                    <div><label>City</label><input id="city" onChange={changeHandler}  placeholder='City'/></div>
                    <div><label>PIN</label><input id="pin" onChange={changeHandler}  placeholder='Pincode'/></div>
                    <div><label>Country</label><input id="country" onChange={changeHandler}  placeholder='Country'/></div>
                </form>
                {successMsg != "success" && <button className="text-white bg-yellow-500 p-2 p-l-4 p-r-4 my-4 rounded-3xl" onClick={()=> placeOrder()}> Place Order</button>}
                {/* <button className="text-white bg-yellow-500 p-2 p-l-4 p-r-4 my-4 rounded-3xl" onClick={()=> placeOrder()}> Place Order</button> */}

            </Modal>
        )}
        <h1 className='text-4xl text-black-400 flex'>
            <HiShoppingCart/>
            My Cart
        </h1>
        {successMsg == "success" && <div className="my-12 text-green-700"> You have successfully placed your order ! Below are your order details: </div>}
        {
            Array.isArray(mycart) && (
                <>
                    <div id="cart-list" className='min-w-full'>
                        {mycart.length == 0 && successMsg != "success" &&  (<div>
                            You haven't added any items to the cart yet. Check our <Link className='font-bold' href="webshop"><button>Webshop</button></Link> to select items!
                        </div>)}
                        {mycart.map( p => 
                            <div key={p.id} className="cart-list-item flex flex-wrap h-1/2 p-2xxxx border border-black m-4xxxx w-1/2" styles={{width: '100px'}}>
                                <Link href={`/webshop/${p.id}`} className="float-left">
                                    <img className="product-img w-12 mx-2" src={p.image}/>
                                </Link>
                                <div className="product-title ">{p.title}</div>
                                <div className='item-end-col bg-white'>
                                    <div className="product-price font-bold">€{p.price}</div>
                                    {successMsg != "success" && 
                                        <div>
                                            <button className="text-white bg-red-500 p-2 p-l-4 p-r-4 rounded-3xl" onClick={ () => {remove(p.id); }}> Remove</button> 
                                        </div>
                                    }
                                    {/* <button className="text-white bg-yellow-500 p-2 p-l-4 p-r-4 my-4 rounded-3xl" onClick={ () => {remove(p.id); }}> Remove</button> */}
                                    {/* </div> */}
                                </div>
                            </div>
                        )}
                    </div>
                    {mycart.length > 0 && (<>
                        {successMsg == "success" && <div className='shipping-address'>
                            <div className='font-bold text-xl'>Shipping Address</div>
                            <div className='uppercase'>
                                <div className='uppercase'> {formValues.fname} {formValues.lname} </div>
                                <div> {formValues.phone} </div>
                                <div> {formValues.street} {formValues.house} </div>
                                <div> {formValues.city} {formValues.pin} </div>
                                <div> {formValues.country} </div>
                            </div>
                        </div>}
                        <div className="font-bold my-4">Order Price:  <span className="font-bold">€ {totalprice}</span></div>
                        {successMsg != "success" && 
                            <button className="text-white bg-yellow-500 p-2 p-l-4 p-r-4 my-4 rounded-3xl" onClick={ () => {toggleModdle(true); }}> Place Order</button>
                        }
                        {/* <button className="text-white bg-yellow-500 p-2 p-l-4 p-r-4 my-4 rounded-3xl" onClick={ () => {toggleModdle(true); }}> Place Order</button> */}
                        {successMsg == "success" && 
                            <div>
                                Check out our <Link className='font-bold' href="webshop"><button>Webshop</button></Link> for more gifts!
                            </div>
                        }
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

