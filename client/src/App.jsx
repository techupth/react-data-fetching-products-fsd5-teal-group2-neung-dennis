import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [error, setError] = useState("Loading...");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const result = await axios.get("http://localhost:4001/products");
      setData(result.data.data);
    } catch (error) {
      setError("Fetching Error...");
    }
  }
  async function handleDelete(id) {
    await axios.delete(`http://localhost:4001/products/${id}`);
    await getData();
  }
  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {!data ? (
          <p>{error}</p>
        ) : (
          data.map(({ id, name, price, image, description }, index) => {
            return (
              <div key={index} className="product">
                <div className="product-preview">
                  <img
                    src={image}
                    alt="some product"
                    width="350"
                    height="350"
                  />
                </div>
                <div className="product-detail">
                  <h1>Product name: {name}</h1>
                  <h2>Product price: {price} Baht</h2>
                  <p>Product description: {description}</p>
                </div>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(id)}
                >
                  x
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
