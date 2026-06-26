import axios from "../../utils/axios"
import './HomePage.css'
import { Header } from '../../component/Header';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router';


export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  // fetch("http://localhost:3000/api/products")
  //   .then((response)=>{
  //     return response.json()
  //   }).then((data)=>{
  //     console.log(data)
  //   });

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  // console.log(search)

  useEffect(() => {
    const getHomeData = async () => {
      if (search) {
        const response = await axios.get(`/api/products/?search=${search}`);
        setProducts(response.data);
      } else {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      }
    }
    getHomeData();
  }, [search]);


  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <title>ecommerce-project</title>
      <Header
        cart={cart}
      />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}