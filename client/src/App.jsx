import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const baseURL = "http://localhost:4001/products";

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}/${id}`)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting product: ", error);
      });
  };

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>

      {products.map((product) => (
        <div className="product-list" key={product.id}>
          <div className="product">
            <div className="product-preview">
              <img
                src={product.image}
                alt="some product"
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>{product.name}</h1>
              <h2>{product.price}</h2>
              <p>{product.description}</p>
            </div>

            <button
              className="delete-button"
              onClick={() => deleteProduct(product.id)}>
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
