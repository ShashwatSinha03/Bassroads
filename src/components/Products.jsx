import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import productsData from "../data/products.json";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const audioProducts = productsData.products.slice(0, 9);
    setProducts(audioProducts);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
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
