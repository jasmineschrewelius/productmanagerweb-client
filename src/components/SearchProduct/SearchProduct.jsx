import React, { useEffect, useState } from 'react'
import './SearchProduct.css';

const SearchProduct = ({ products, onDelete }) => {

  const [sku, setSku] = useState([]); // set first state

  const [product, setProducts] = useState([]); 

  const [isFound , setIsFound] = useState(false); 

  const [isNotFound, setIsNotFound] = useState(false); 


  const handleSubmit = (event) => { // when button is pressed

    event.preventDefault();   // prevent the page from reloadning

    const product = products.filter(x => x.sku == sku); // create array and filter to select the choosen SKU

    setProducts(product); // set the new state
  };
  

  useEffect(() => {  // check if results where found or not
    if (product.length > 0)
    {
      setIsFound(current => !current); // change the state
    }
    if (product.length === 0)
    {
      setIsNotFound(current => !current); // change the state
    }

  }, [product]);



  return (
    <div className="searchinput">

      <form className="searchform" onSubmit={handleSubmit}>
        <label htmlFor="name"> SKU: </label>
        
        <input type="text" id="sku" name="sku" value={sku} onChange={(event) => setSku(event.target.value)} />

        <button>
          Search
        </button>
      </form>

      <div className="results">
        {isFound &&
        <table>
          <thead>
            <tr>
              <th>Namn</th>
              <th>Sku</th>
              <th>Beskrivning</th>
              <th>Bild</th>
              <th>Pris</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {product.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.description}</td>
              <td>{product.picture}</td>
              <td>{product.price}</td>
              <td>
              <button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) onDelete(product.sku)}}> Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>}
        {isNotFound && <h3>Product not found</h3>}
      
      </div>  
    </div>
  )
}

export default SearchProduct;