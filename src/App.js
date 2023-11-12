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

    fetch("https://localhost:8000/product", {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(product)
    })
    .then(function(response) {
      if (!response.ok){                                        // if the response is not OK
        throw alert("Unvaild information, product not saved");  // alert to user product not saved
      }
      return response.json();                                   // if response is OK, convert to JSON
    }).then(function(response) {
      alert("Ok, product saved");                                // alert product saved
    }).then((product) => {
      setProducts([ ...products, product])
    }).catch(function(error) {
      console.log("Unvaild information som user, 400 bad request");
    });  
    
  };

  const handleClickAdd = () => { // when "Add Product" button is pressed, show 
    setIsShownSee(current => !current); // change the state
  };

  const handleClickSearch = () => { // when "Search Product" button is pressed, show
    setIsShownSearch(current => !current); // change the state
  };

  const handleClickSee = () => { // when "see all products" button is pressed, show 
    setIsShownAdd(current => !current); // change the state
  };

  const handleOnDelete = (sku) => { // take the id of the product chosen

    fetch(`https://localhost:8000/product/${sku}`, {  // use fetch to create delete call to API
            method: "delete",
        }).then((resp) => {
          const newProducts = products.filter(x => x.sku != sku); // create array and filter away the productId from list
          setProducts(newProducts); // setproducts with newProducts
        }); 

    alert("Product deleted")    
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

    {isShownSearch && <SearchProduct products={products} onDelete={handleOnDelete} />}

    {isShownSee && <ProductForm onAdd={addProduct} />}


    </div>
  );
}


export default App;
