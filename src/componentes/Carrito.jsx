import React from "react";
import { useState } from "react";

import { Create } from "./Create";
import MUIDataTable from "mui-datatables";

import { TransactionsTable } from "./TransactionsTable";
import { Ven } from "../api/Producto";

export const Carrito = () => {
  const [carrito, agregarProducto] = useState([]);
  const [total, setTotal] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    cant_idad: 0.1,
  });

  const calcularTotal = (nuevoCarrito) => {
    const initialValue = item.price;
    const sumWithInitial = nuevoCarrito.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );

    setTotal(sumWithInitial);
    console.log(total);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const agregar = (e) => {
    e.preventDefault();
    console.log(name, cant_idad, price);
    const newproducto = {
      id: Math.floor(Math.random() * 100),
      quantity: parseFloat(cant_idad),
      price: price,
      name: name,
    };
    console.log(newproducto);
    const nuevoCarrito = [...carrito, newproducto];
    agregarProducto(nuevoCarrito);
    calcularTotal(nuevoCarrito);
  };

  const handleAddClick = (item) => {
    //console.log('Añadir clicado para:', id);
    const itemExists = carrito.some((element) => element.id === item.id);

    let nuevoCarrito;

    if (itemExists) {
      // Actualizar la cantidad del producto en el carrito
      nuevoCarrito = carrito.map((element) =>
        element.id === item.id
          ? { ...element, quantity: element.quantity + 1 }
          : element
      );
    } else {
      // Añadir el producto al carrito con cantidad inicial de 1
      nuevoCarrito = [...carrito, { ...item, quantity: 1 }];
    }
    agregarProducto(nuevoCarrito);

    //agregarProducto([...carrito, item]);
    calcularTotal(nuevoCarrito);
  };
  const aumentar = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    agregarProducto(nuevoCarrito);
    calcularTotal(nuevoCarrito);
  };

  const disminuir = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    const dis = nuevoCarrito.filter((item) => item.quantity > 0);

    agregarProducto(dis);
    calcularTotal(nuevoCarrito);
  };
  const handleInputChange = (event, id) => {
    const newQuantity = Number(event.target.value);
    const nuevoCarrito = carrito.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    agregarProducto(nuevoCarrito);
    calcularTotal(nuevoCarrito);
  };

  const Comprar = async () => {
    try {
      const res = await Ven({
        items: carrito.map((item) => ({
          product_id: item.id,
          cantidad: item.quantity,
          Subtotal: item.price * item.quantity,
        })),
        total: total,
      });
      const data = res.data;
      console.log(data);
      console.log(res);
      // Limpiar el carrito después de la compra
      agregarProducto([]);
      setTotal(0);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://gateway.payulatam.com/ppp-web-gateway/";

      const inputs = {
        merchantId: "1013710",
        accountId: "1022612",
        description: "Test PAYU",
        referenceCode: data.referenceCode, // Recibirlo desde el backend
        amount: data.amount,// Ajustar el cálculo si es necesario
        currency: "COP",
        signature: data.signature, // Generada desde el backend
        test: "1", // Cambiar a "1" para pruebas
        buyerEmail: "test@test.com",
        responseUrl: "http://www.test.com/response",
        confirmationUrl: "http://www.test.com/confirmation",
      };

      // Crear los campos hidden del formulario
      for (const key in inputs) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = inputs[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit(); // Enviar el formulario a PayU

    } catch (error) {
      console.error("Error al realizar la compra", error);
    }
    /* 
     const data = carrito.map(item=>({
       Product: item.name,
       Cantidad:item.quantity,
       stock:item.Stock - item.quantity,
       SubTotal:item.price * item.quantity
     }))
     const total1 ={
      Total: total.toFixed(2)
     }
     
     localStorage.setItem('compras', JSON.stringify(data))
     localStorage.setItem('total', JSON.stringify(total1))

     console.log(data, total1)
     agregarProducto([]);
     setTotal(0); */
    
  };

  const { name, cant_idad, price } = form;
  

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
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  id
                </th>
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Subtotal
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                 <th scope="col" class="px-6 py-3 text-center">
                  cantidad
                </th>
              </tr>
            </thead>

            <tbody className="bg-black divide-y divide-gray-200">
              {carrito.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-3  dark:bg-black-800">{item.id}</td>
                  <td className="px-6 py-3  dark:bg-black-800">{item.name}</td>
                  <td className="px-6 py-3  dark:bg-black-800">{item.price}</td>
                  <td className="px-6 py-3  dark:bg-black-800">{item.price * item.quantity}</td>
                  <td className="px-6 py-3  dark:bg-black-800">
                    {item.category}
                  </td>
                  <td className="px-6 py-3  dark:bg-black-800">
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          disminuir(item.id);
                        }}
                      >
                        -
                      </button>
                    </td>
                    <th scope="row" class="px-6 py-3 text-base">
                     
                      <input
                        step={0.1}
                        min={1}
                        className="text-black"
                        type="number"
                        value={item.quantity}
                        onChange={(event) => handleInputChange(event, item.id)} // Añade el controlador del evento onChange
                      />
                    </th>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => aumentar(item.id)}
                      >
                        +
                      </button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr class="font-semibold text-gray-900 dark:text-white">
                <th scope="row" class="px-6 py-3 text-base">
                  Total:
                </th>
                <td class="px-6 py-3">${total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <button
            type="button"
            onClick={Comprar}
            class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Comprar
          </button>
        </div>
      </div>
      <div className="flex space-x-8 p-4"></div>
    </>
  );
};
