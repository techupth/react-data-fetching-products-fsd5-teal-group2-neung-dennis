import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const baseURL = "http://localhost:4001/products";

  const [products, setProducts] = useState([]);

  const deleteProduct = (id) => {
    axios.delete(`${baseURL}/${id}`).then(() => {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    });
  };

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setProducts(response.data.data);
      // console.log(response.data.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>

      {products.map((products) => (
        <div className="product-list">
          <div className="product">
            <div className="product-preview">
              <img
                src={products.image}
                alt="some product"
                width="350"
                height="350"
                key={products.id}
              />
            </div>
            <div className="product-detail">
              <h1>{products.name}</h1>
              <h2>{products.price}</h2>
              <p>{products.description}</p>
            </div>

            <button
              className="delete-button"
              onClick={
                () => deleteProduct(products.id)
                // console.log(products.id)
              }>
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
