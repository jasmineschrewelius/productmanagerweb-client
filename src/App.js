import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import ProductTable from './components/ProductTable/ProductTable';
import ProductForm from './components/ProductForm/ProductForm';


function App() {

  const [products, setProducts] = useState([]);  // create state variable

  const [isShown , setIsShown] = useState(false);

  useEffect(() => { // use useEffect to get products from web API

    fetch("https://localhost:8000/product")  // fetch will send a response to backend and return a promise
    .then((resp) => resp.json())             // will get that promise, callback function will be called, and that response object has a metod(JSON) and will return a new promise
    .then((products) => setProducts(products)); // will get that new promise, callback function will be called, and put products in setProducts

  }, []); //[] <-- so we will only do the useEffect one time

  const addProduct = (product) => { // add product to our list

    fetch("https://localhost:8000/product", {  // use fetch to create post call to API
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product) // make product into json
        })
        .then((resp) => resp.json())  // will convert json javascript object
        .then((product) => {
          setProducts([ ...products, product]); // setproducts, take the current state of products and replace it with the new state
        });

     
  }


  const handleClick = event => {
    setIsShown(current => !current);
   }

  return (
    <div className="App">
      <h1>Product Manager</h1>

    <div className="Menu">

      <div>
        <button>
          Add Product
        </button>
      </div>

      <div>
        <button>
          Search Product
        </button>
      </div>

      <div>
        <button onClick={handleClick}>
          Se Alla Produkter
          </button>
          {isShown && <ProductTable products={products}/>}
      </div>

    </div>

    <ProductForm onAdd={addProduct} />

    </div>
  );
}

export default App;
