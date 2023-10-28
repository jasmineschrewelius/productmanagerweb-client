import './ProductTable.css';
import React from 'react';


const ProductTable = ({ products }) => { // gets props (products)
  return (
    <table>
        <thead>
        <tr>
            <th>Namn</th>
            <th>Sku</th>
            <th>Beskrivning</th>
            <th>Bild</th>
            <th>Pris</th>
        </tr>
        </thead>
        <tbody>
            { products.map(product => (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.description}</td>
                    <td>{product.picture}</td>
                    <td>{product.price}</td>
                </tr>
            ))}

        </tbody>
    </table>
  );
}

export default ProductTable