import React, { useState } from "react";
import CartProductCard from "../../../componets/CardProducts";

function Cart({ cartReducer, removeFromCart, increaseQuantity, decreaseQuantity }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    address: "",
    city: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Remove product
  const handleRemove = (id) => {
    removeFromCart(id);
  };

  // Increase quantity
  const handleIncreaseQuantity = (id) => {
    increaseQuantity(id);
  };

  // Decrease quantity
  const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, address, city, zip } = form;
    const newErrors = {};

    if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (address.trim() === "") {
      newErrors.address = "Address is required";
    }
    if (city.trim() === "") {
      newErrors.city = "City is required";
    }
    if (zip.trim() === "") {
      newErrors.zip = "Zip code is required";
    }

    if (Object.keys(newErrors).length === 0) {
      console.log("Form is valid. Proceed with checkout.");
    } else {
      setErrors(newErrors);
    }
  };

  const { cart, totalPrice } = cartReducer;

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          cart.map((product) => (
            <CartProductCard
              key={product.id}
              product={product}
              onRemove={handleRemove}
              increase={handleIncreaseQuantity}
              decrease={handleDecreaseQuantity}
            />
          ))
        ) : (
          <p style={{fontSize:"1.5rem", color:"gray"}}>Your cart is empty</p>
        )}
      </div>

      <div className="checkout-section">
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? "input-error" : ""}`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              className={`form-input ${errors.password ? "input-error" : ""}`}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              className={`form-input ${errors.address ? "input-error" : ""}`}
              placeholder="Enter your address"
            />
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={handleInputChange}
              className={`form-input ${errors.city ? "input-error" : ""}`}
            />
            {errors.city && <p className="error-message">{errors.city}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="zip">Zip</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={form.zip}
              onChange={handleInputChange}
              className={`form-input ${errors.zip ? "input-error" : ""}`}
            />
            {errors.zip && <p className="error-message">{errors.zip}</p>}
          </div>

          <button type="submit" className="checkout-btn">
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cart;
