import {useRouter} from 'next/router'
import React, { useState } from 'react';


export default function Car ( {product} ) {
    const router = useRouter();
    const { id } = router.query;

    const [count, setCount] = useState(0);
  
    // debugger;
    
    // let basket = localStorage.getItem('basket') || [];
    // let basket = localStorage.getItem('basket') || [];
    // addedToCart = isAdded(basket, product.id)

    const isAdded = (cart = [], id) =>{
        return cart.some( p => p.id == id);
    }

    const add = ()=>{
        // alert('hello')
        setCount(count+1);
        debugger;
        return 0;
        let basket = localStorage.getItem('basket');
        basket = !!basket? JSON.parse(basket) : [];
        if (!isAdded(basket, product.id)){
            basket.push(product)
            localStorage.getItem('basket', JSON.stringify(basket))
            console.log('Added to basket')
        }
        else console.log('Already Added')
    }

    return <div>
        <div className='text-4xl'> {product.title} {count}</div>
        <div className="product-details m-10 flex">
            {/* {JSON.stringify(product)} */}
            <img className="product-img-full float-left" src={product.image}/>
            <div className="product-info w-1/2 m-l-10">
                <div className="product-category uppercase">{product.category}</div>
                <span className="product-title text-2xl">{product.title}</span>
                <div className="product-price text-2xl"> € {product.price}</div>
                <div className="product-descr m-t-2">{product.description}</div>
            </div>
            {/* <button onClick={()=>{alert('add')}}> Add to Basket</button> */}
            <button onClick={ () => {add(); }}> Add to Basket</button>
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