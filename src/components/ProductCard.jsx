import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <h3 style={styles.title}>{product.title}</h3>
      <p style={styles.description}>{product.description}</p>
      <p style={styles.price}><strong>₹{product.price}</strong></p>
    </div>
  );
};

const styles = {
  card: {
    width: "300px",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "10px",
    margin: "15px",
    textAlign: "center",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
    color: "#333",
    fontFamily: 'Telex'
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
    height: "60px",
    overflow: "hidden",
    fontFamily: 'Varela'
  },
  price: {
    fontSize: "18px",
    fontWeight: "600",
    fontFamily: 'Telex'
  },
};

export default ProductCard;
