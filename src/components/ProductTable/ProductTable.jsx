import './ProductTable.css';
import React from 'react';


const ProductTable = ({ products, onDelete }) => { // gets props (products)
  return (
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
            {products.map(product => (
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
    </table>
  );
}

export default ProductTable;