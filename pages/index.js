import { useState, useEffect } from 'react'
import Head from 'next/head';
import PageTitle from "../components/PageTitle/PageTitle"
import ProductCard from '../components/ProductCard/ProductCard';

// https://fodebee-default-rtdb.firebaseio.com/products.json

export default function Home(props) {

  const products = props.products;

  return(
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fodebee Storefront</title>
      </Head>

      <PageTitle tagline="Product Specials" title="Fodebee Storefront" />

      <main>
        {products.map(product => <ProductCard key={product.uid} product={product} />)}
      </main>
    </>
  )

//   const [users, setUsers] = useState([])

//   useEffect(() => {
//     async function getUseData() {
//       const response = await fetch('https://jsonplaceholder.typicode.com/users')

//       const userData = await response.json()

//       setUsers(userData)

//       console.log(userData)
//     } 

//     getUseData()

//   }, [])

//   if(users) {
//     return (
//       // You can pass whole data use={user} and filter it down on another function ie. {user.name}
//       users.map(user => <Product key={user.id} user={user} />)
//     )
//   }
//   else {
//     return <p>Data is not yet read.</p>
//   }
// }

// function Product({children, user, ...props}) {
//   return (
//     <div>
//       <p>{user.name}</p>
//     </div>
//   ) 
}

export async function getStaticProps() {
  console.log("i hidden from yer browser, only der server can eye me!")

  const res = await fetch ('https://fodebee-default-rtdb.firebaseio.com/products.json');
  const productData = await res.json();
  const products = Object.values(productData);

  return {
    props:{
      products
    },
    revalidate:60
  }
}
