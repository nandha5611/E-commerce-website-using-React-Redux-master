import React, { useState, useEffect } from "react";

function Product({ fetchProducts, productReducer, addToCart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (productReducer.status === "reject") {
      setIsLoading(false);
      setShowAlert(false);
    } else if (productReducer.status === "success") {
      setProducts(productReducer.products);
      setIsLoading(false);
    }
  }, [productReducer]);

  const handleAddToCart = (product) => {
    setShowAlert(true);
    addToCart(product);
  };

  // New function to handle when user clicks a product to view details
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Function to go back to product list from details view
  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  // If a product is selected, show its details
  if (selectedProduct) {
    return (
      <div className="product-details">
        <button onClick={handleBackToList} className="btn btn-secondary mb-3">
          Back to Products
        </button>
        <div className="custom-card">
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <h3>{selectedProduct.title}</h3>
          <p>{selectedProduct.description}</p> {/* Assuming description exists */}
          <h5>Price: {selectedProduct.price} Rs</h5>
          <button
            className="btn btn-primary"
            onClick={() => handleAddToCart(selectedProduct)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    );
  }

  // Otherwise show the product list
  return (
    <div>
      {!isLoading ? (
        <div>
          {showAlert && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              Product added to cart
              <button
                type="button"
                onClick={() => setShowAlert(false)}
                className="close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <div className="productsWrapper">
            {Array.isArray(products)
              ? products.map((product) => (
                  <div
                    className="custom-card"
                    key={product.id}
                    onClick={() => handleProductClick(product)} // Click to show details
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.image} alt={product.title} />
                    <h5 className="product-title mt-3">
                      {product.title.slice(0, 20)}
                    </h5>
                    <h6>{product.price} Rs</h6>
                    <button
                      className="btn"
                      onClick={(e) => {
                        e.stopPropagation(); // Stop item click event to prevent detail view
                        handleAddToCart(product);
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                ))
              : (
                  <div className="custom-card" key={products.id}>
                    <img src={products.image} alt={products.title} />
                    <h5 className="product-title mt-3">
                      {products.title.slice(0, 20)}
                    </h5>
                    <h6>{products.price} Rs</h6>
                    <button
                      className="btn"
                      onClick={() => handleAddToCart(products)}
                    >
                      Add To Cart
                    </button>
                  </div>
                )}
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
