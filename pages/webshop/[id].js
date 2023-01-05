import {useRouter} from 'next/router'
import React, { useState, useEffect, useContext } from 'react';
import {useCookies} from 'react-cookie'
import Link from 'next/link'


// import { Context } from "../../context";


export default function Car ( {product} ) {
    // const { state, dispatch } = useContext(Context);
    
    const router = useRouter();
    const { id } = router.query;

    const [count, setCount] = useState(0);
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    // console.log('cookies')
    // console.log('removing cookies' , cookies)
    // // removeCookie('mycart')
    // setCookie('mycart', [])
    // console.log('removed cookies' , cookies)

    const [mycart, setNextJsCookie] = useState([]);
    const [qtyAdded, setQuantityAdded] = useState(-1);
    // useEffect(() => setNextJsCookie(cookies.mycart), [])

    const syncCookiesData = () => {
        useEffect( () => {
            if (Array.isArray(cookies.mycart) ) {
                let count = cookies.mycart.reduce( (count, p) => count+ (p.id == product.id ? 1 : 0), 0)
                setNextJsCookie(cookies.mycart)
                setQuantityAdded(count)
                // setTotalPrice(sum_price)
                console.log('mycart', cookies.mycart)
                console.log('qty', count)
            }
        })
    }
    syncCookiesData()

  
    
    let basket = cookies.mycart;
    basket = basket ? (basket) : []
    // try {
    // basket = basket ? JSON.parse(basket) : []
    // }
    // catch (error) {
    //     basket = []
    // }


    const add = ()=>{
        // if (true || !isAdded(basket, product.id)) {
        if (true && qtyAdded == 0 ) {
            let toAdd = Object.assign({}, product)
            delete toAdd.description;
            delete toAdd.category;
            delete toAdd.rating;
            // delete toAdd.image;
            basket.push(toAdd)
            console.log('update basket :' + JSON.stringify(basket))
            setCookie('mycart', basket)
            console.log('Added to basket')
            setQuantityAdded(qtyAdded + 1)
            
        }
        else console.log('Already Added')
    }

    return <div>
        <div className='text-4xl'> {product.title}</div>
        <div className="product-details m-10 flex">
            {/* {JSON.stringify(product)} */}
            <img className="product-img-full float-left" src={product.image}/>
            <div className="product-info w-1/2 m-l-10">
                <div className="product-category uppercase">{product.category}</div>
                <span className="product-title text-2xl">{product.title}</span>
                <div className="product-price text-2xl"> € {product.price}</div>
                <div className="product-descr m-t-2">{product.description}</div>
                { qtyAdded ==0 ? (
                    <button className="text-white bg-yellow-500 p-2 p-l-4 p-r-4 my-4 rounded-3xl" onClick={ () => {add(); }}> Add to Basket</button>
                ) : (
                    <>
                    {/* <button disabled="true" className="opacity-50 cursor-not-allowed text-white bg-yellow-500 p-2 p-l-4 p-r-4 rounded-3xl"> Added to Basket</button> */}
                    <div className='my-4 text-green-500'> Product added to you cart! </div>
                    <Link href="/basket">
                        <button className="text-white bg-yellow-700 p-2 p-l-4 p-r-4 rounded-3xl"> Proceed to Checkout</button>
                    </Link>
                    </>
                ) }
                {/* <button className="text-white bg-yellow-500 p-2 p-l-4 p-r-4 rounded-3xl" onClick={ () => {add(); }}> Add to Basket</button> */}
                {/* <div> Total added is {qtyAdded} </div> */}
            </div>
        </div>
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



export async function getServerSideProps22(context) {
    return {
      props: { photos: []}, // will be passed to the page component as props
    }
  }

  export const getStaticProps = async ( {params}) => {
    
    // const req = await fetch(`https://localhost:3000/unsplash.json`)
    // const req = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const req = await fetch(`https://fakestoreapi.com/products/${params.id}`)
    const data = await req.json()
    return {
        props: {product: data}
    }
}

export const getStaticPaths = async () => {
        // const req = await fetch(`https://localhost:3000/unsplash.json`)
        // const req = await fetch(`https://jsonplaceholder.typicode.com/users`)
        const req = await fetch(`https://fakestoreapi.com/products`)
        const data = await req.json()

        const paths = data.map(product => {
            return {
                params: {id: product.id.toString()}
            }
        })
        return {
            paths,
            fallback: false
        }
    
}