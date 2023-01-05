import Link from 'next/link'
export default function CarsList( {photos} ) {
    // debugger;
    return <div>
        <h1 className='text-4xl text-green-400'>PLNTS Webshop</h1>
        <div id="list" className='flex flex-wrap'>
            {photos.map( p => 
                <div key={p.id} className="product-card h-1/2 p-4 border border-black m-4 w-1/4" styles={{
                    width: '100px'
                }}>
                    <Link href={`/webshop/${p.id}`}>
                        <img className="product-img w-32" src={p.image}/>
                        </Link>
                    <div className='flex flex-col m-w-58'>
                        <div className="product-title">{p.title}</div>
                        <div className="product-price">{p.price}</div>
                        {/* <div className="product-price">{p.description}</div> */}
                    </div>
                </div>
            )}
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



export const getStaticProps = async () => {
    
    // const req = await fetch(`https://localhost:3000/unsplash.json`)
    // const req = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const req = await fetch(`https://fakestoreapi.com/products`)
    const data = await req.json()
    return {
        props: {photos: data}
    }
}

// export const getStaticPaths = async () => {
//         // const req = await fetch(`https://localhost:3000/unsplash.json`)
//         const req = await fetch(`https://jsonplaceholder.typicode.com/users`)
//         const data = await req.json()

//         const paths = data.map(car => {
//             return {
//                 params: {id: car.id.toString()}
//             }
//         })
//         return {
//             paths,
//             fallback: false
//         }
    
// }