import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const apiUrl = "https://dummyjson.com/products";

const App = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    brand: "",
    image: "",
    price: "",
    discount: "",
    description: "",
    category: ""
  });

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setProducts(response.data.slice(0, 5)); // Отображаем только первые 5 продуктов
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addProduct = () => {
    axios.post(apiUrl, newProduct)
      .then(response => {
        setProducts(prevProducts => [...prevProducts, response.data]);
        setModalIsOpen(false);
      })
      .catch(error => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div>
      <h1>Product Cards</h1>
      <div className="product-container">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Brand: {product.brand}</p>
            <p>Price: {product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
      <button onClick={handleModalOpen}>Add Product</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
      >
        <h2>Add Product</h2>
        <form>
          <label>Title:</label>
          <input type="text" name="title" onChange={handleInputChange} />
          <label>Brand:</label>
          <input type="text" name="brand" onChange={handleInputChange} />
          <label>Image:</label>
          <input type="text" name="image" onChange={handleInputChange} />
          <label>Price:</label>
          <input type="text" name="price" onChange={handleInputChange} />
          <label>Discount:</label>
          <input type="text" name="discount" onChange={handleInputChange} />
          <label>Description:</label>
          <input type="text" name="description" onChange={handleInputChange} />
          <label>Category:</label>
          <input type="text" name="category" onChange={handleInputChange} />
          <button type="button" onClick={addProduct}>Add</button>
        </form>
      </Modal>
    </div>
  );
};

export default App;
