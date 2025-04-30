import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import productsData from "../data/products.json";
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const audioProducts = productsData.products.slice(0, 9);
    setProducts(audioProducts);
  }, []);

  return (

    <div style={styles.container}>
      <div style={styles.grid}>
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    paddingLeft: "60px",
    fontFamily: "Arial, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    justifyContent: "center",
  },
};

export default Products;
