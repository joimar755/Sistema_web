import React from "react";
import { useState } from "react";

import { Create } from "./Create";

export const Carrito = () => {
  const [carrito, agregarProducto] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAddClick = (item) => {
    //console.log('Añadir clicado para:', id);
    agregarProducto([...carrito, item]);
    const initialValue = item.price;

    const sumWithInitial = carrito.reduce(
      (accumulator, item) => accumulator + item.price,
      initialValue
    );
    setTotal(sumWithInitial);
    console.log(total);
  };
  return (
    <>
     <Create
            showAddButton={true}
            showForm={true}
            onAddClick={handleAddClick}
            showDelete={true}
          />
       <div className="flex space-x-8 p-4"> 
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-black divide-y divide-gray-200">
            {carrito.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-3  dark:bg-black-800">{item.id}</td>
                <td className="px-6 py-3  dark:bg-black-800">{item.name}</td>
                <td className="px-6 py-3  dark:bg-black-800">{item.price}</td>
                <td className="px-6 py-3  dark:bg-black-800">{item.category}</td>
                <td className="px-6 py-3  dark:bg-black-800">{item.Stock}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr class="font-semibold text-gray-900 dark:text-white">
                <th scope="row" class="px-6 py-3 text-base">Total:</th>
                <td class="px-6 py-3">${total.toFixed(2)}</td>
            </tr>
        </tfoot>
        </table>
       
      </div>
    </div>
    </>
  );
};
