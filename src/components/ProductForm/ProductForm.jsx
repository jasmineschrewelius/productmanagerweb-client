import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onAdd }) => {

    const [form, setForm] = useState({  // create first state
        name: "",
        sku: "",
        description: "",
        picture: "",
        price: ""
    });

    const handleSubmit = (event) => { // when button is pressed
       event.preventDefault();   // prevent the page from reloadning
    };


   
    const handleChange = (event) => { // when change is made (button pressed)

      
        const { name, value } = event.target; // take out the name

        setForm({ // set Form, take the forms first state and set the new state with the changes made
        ...form,
        [name]: value,
        });
        


    };

    const handleClick = () => {

        if (!window.confirm('Is the information correct?')) 
        {
            return;
        } else
        {
          createProduct();
        }
    };


    const createProduct = () => {

        const product ={ ...form }; // create a new object with the data from form

        onAdd(product); 
    };

  return (
    <form onSubmit={handleSubmit} className="productform"  >
        <div>
            <label htmlFor="name"> Name </label>

            <input type="text" id="name" name="name" value={form.name} onChange={handleChange}  required/>
        </div>

        <div>
            <label htmlFor="sku"> Sku </label>

            <input type="text" id="sku" name="sku" value={form.sku} onChange={handleChange} required />
        </div>

        <div>
            <label htmlFor="description"> Beskrivning </label>

            <textarea id="description" name="description" value={form.description} onChange={handleChange}  required/>
        </div>


        <div>
            <label htmlFor="picture"> Picture </label>

            <input type="text" id="picture" name="picture" value={form.picture} onChange={handleChange}  required/>
        </div>

        <div>
            <label htmlFor="price"> Price </label>

            <input type="number" id="price" name="price" value={form.price} onChange={handleChange}  required />
        </div>

        <div>
            <button type="submit" onClick={handleClick}>
                Add Product
            </button>
        </div>

    </form>
  )
}

export default ProductForm;