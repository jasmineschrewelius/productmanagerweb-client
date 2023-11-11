import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import ProductTable from './components/ProductTable/ProductTable';
import ProductForm from './components/ProductForm/ProductForm';
import SearchProduct from './components/SearchProduct/SearchProduct';


function App() {

  const [products, setProducts] = useState([]);  // set first state

  const [isShownAdd , setIsShownAdd] = useState(false); // set first state to Add

  const [isShownSearch , setIsShownSearch] = useState(false); // set first state to Search

  const [isShownSee , setIsShownSee] = useState(false); // set first state to See

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


  const handleClickAdd = (event) => { // when "Add Product" button is pressed, show 
    setIsShownSee(current => !current); // change the state
  };

  const handleClickSearch = (event) => { // when "Search Product" button is pressed, show
    setIsShownSearch(current => !current); // change the state
  }

  const handleClickSee = (event) => { // when "see all products" button is pressed, show 
    setIsShownAdd(current => !current); // change the state
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
        <button className="btn" onClick={handleClickSearch}>
          Search Product
        </button>
      </div>

      <div>
        <button className="btn" onClick={handleClickSee}>
          See All Products
        </button>
      </div>

    </div>


    {isShownAdd && <ProductTable products={products} onDelete={handleOnDelete}/>}

    {isShownSearch && <SearchProduct products={products} />}

    {isShownSee && <ProductForm onAdd={addProduct} />}

    

    

    </div>
  );
}

export default App;
