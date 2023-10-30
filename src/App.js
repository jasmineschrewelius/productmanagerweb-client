import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import ProductTable from './components/ProductTable/ProductTable';
import ProductForm from './components/ProductForm/ProductForm';


function App() {

  const [products, setProducts] = useState([]);  // set first state

  const [isShown , setIsShown] = useState(false); // set first state

  const [isVisible , setIsVisible] = useState(false); // set first state

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
      };


  const handleClickSee = (event) => { // when "see all products" button is pressed, show 
    setIsShown(current => !current); // change the state
  };

  const handleClickAdd = (event) => { // when "Add Product" button is pressed, show 
    setIsVisible(current => !current); // change the state
  };

  const handleOnDelete = (productId) => { // take the id of the product chosen

    fetch(`https://localhost:8000/product/${productId}`, {  // use fetch to create delete call to API
            method: "delete",
        }).then((resp) => {
          const newProducts = products.filter(x => x.id != productId); // create array and filter away the productId from list
          setProducts(newProducts); // setproducts with newProducts
        }); 
  };

  return (
    <div className="App">
      <h1>Product Manager</h1>

    <div className="Menu">

      <div>
        <button className="btn" onClick={handleClickAdd}>
          Add Product
        </button>
      </div>

      <div>
        <button className="btn" >
          Search Product
        </button>
      </div>

      <div>
        <button className="btn" onClick={handleClickSee}>
          See All Products
        </button>
      </div>

    </div>

    {isVisible && <ProductForm onAdd={addProduct} />}

    {isShown && <ProductTable products={products} onDelete={handleOnDelete}/>}

    </div>
  );
}

export default App;
