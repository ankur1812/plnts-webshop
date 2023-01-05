import {useRouter} from 'next/router'

export default function Car ( {product} ) {
    const router = useRouter();
    const { id } = router.query;
    debugger;

    return <div>
        <h2> {product.title} </h2>
        <div className="product details">
            {/* {JSON.stringify(product)} */}
            <div className="product-card">
                <img height="80" className="product-img-full" src={product.image}/>
                <div className="product-title">{product.title}</div>
                <div className="product-price">{product.price}</div>
                <div className="product-price">{product.description}</div>
            </div>

        </div>
    </div>

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