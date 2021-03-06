import Head from 'next/head';

import { loadStripe } from '@stripe/stripe-js';
import PageTitle from "../components/PageTitle/PageTitle"
import ProductCard from '../components/ProductCard/ProductCard';

// https://fodebee-default-rtdb.firebaseio.com/products.json

export default function Home(props) {
  const products = props.products;

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  return(
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fodebee Storefront</title>
      </Head>

      <PageTitle tagline="Fodebee's Choice" title="Storefront" />

      <main>
        {products.map(product => <ProductCard key={product.uid} product={product} />)}
      </main>
    </>
  )
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
