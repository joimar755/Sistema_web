import axios from "axios";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Pro } from "../api/Producto";


export const Create = ({ showAddButton, showForm, onAdddClick,onAddClick, showDelete }) => {
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState([]);
  const URL = "https://b197-152-204-153-34.ngrok-free.app"
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    Stock: "",
    category_id: "",
  });

  const obtenerUSers = async () => {
    try {
      const url = await axios.get("http://127.0.0.1:8000/relacion");
      const resultado = url;
      setUsers(resultado.data);
    } catch (error) {}
  };
  const categoria = async () => {
    try {
      const url = await axios.get("http://127.0.0.1:8000/category");
      const resultado = url;
      setCategory(resultado.data.resultado);
    } catch (error) {}
  };

  useEffect(() => {
    categoria();
    obtenerUSers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, price, Stock, category_id, description);
    if (name.length === 0) {
      alert("Llene campo");
    } else if (price.length === 0) {
      alert("Llene campo");
    } else if (description.length === 0) {
      alert("Llene campo");
    } else {
      try {
        const res = await Pro({
          name,
          description,
          price,
          Stock,
          category_id,
        });
        obtenerUSers();

        // Update the users list with the response data
        const data = res.data;
        console.log(data);
        console.log(res);

        //obtenerUSers();
        //console.log(res.password);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const { name, description, price, Stock, category_id } = form;

  const columns = [
    {
      name: 'id',
     label: 'ID',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'name',
     
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'price',
      label: 'Price',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'category',
      label: 'Category',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'Stock',
      label: 'Stock',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'Actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const element = users[tableMeta.rowIndex];
          return (
            <div>
              {showAddButton && (
                <button
                  onClick={() => onAddClick(element)}
                  className="btn btn-primary"
                >
                  Añadir
                </button>
              )}
              {!showAddButton && (
                <Link to={`/create/${element.id}`}>
                  <button
                    type="button"
                    className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Editar
                  </button>
                </Link>
              )}
              {!showDelete && (
                <button className="btn btn-danger">Eliminar</button>
              )}
            </div>
          );
        }
      }
    }
  ];

  const options = {
    responsive: "standard",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15,50],
  };


  console.log(users);
  console.log(category);
  return (
    <>
      <div className="row">
        {!showForm && (
          <div className="col-md-4">
            <div class="max-w-sm p-6 bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Crear Producto
              </h5>
              <form class="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    value={name}
                    name="name"
                    id="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange}
                    required
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nombre
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    value={description}
                    name="description"
                    id="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange}
                    required
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Description
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    id="floating_password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={price}
                    name="price"
                    onChange={handleChange}
                    min={0}
                  />
                  <label
                    for="floating_password"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Precio
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    id="floating_repeat_password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={Stock}
                    name="Stock"
                    min={0}
                    onChange={handleChange}
                  />
                  <label
                    for="floating_repeat_password"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Stock
                  </label>
                </div>

                <div class="relative z-0 w-full mb-5 group">
                  <select
                    onChange={handleChange}
                    id="underline_select"
                    value={category_id}
                    name="category_id"
                    class="block py-2.5 px-0 w-full text-sm text-black-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-black peer"
                  >
                    <option selected>Seleccionar Categoria</option>
                    {category.map((elemento, index) => {
                      return (
                        <option key={index} value={elemento.id}>
                          {elemento.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="col-md-8">
           
        <MUIDataTable
        title={"Lista de productos"}
        data={users}
        columns={columns}
        options={options}
        />
        </div>
      </div>
    </>
  );
};
