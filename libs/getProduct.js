async function getProduct(uid) {
    const res = await fetch(
      `https://fodebee-default-rtdb.firebaseio.com/products/${uid}.json`
    );
    const data = await res.json();
    return data;
  }
  
  export { getProduct };