import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div style={styles.container}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p style={styles.price}>₹{product.price}</p>
      <div style={styles.actions}>
        <button style={styles.cartBtn} onClick={() => alert("Added to Cart!")}>Add to Cart</button>
        <button style={styles.buyBtn} onClick={() => alert("Buying Now...")}>Buy Now</button>
      </div>
      <button style={styles.back} onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  price: {
    fontSize: "22px",
    color: "#27ae60",
    fontWeight: "bold",
    margin: "10px 0",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    margin: "20px 0",
  },
  cartBtn: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buyBtn: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#e67e22",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  back: {
    marginTop: "20px",
    color: "#666",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default ProductDetail;
