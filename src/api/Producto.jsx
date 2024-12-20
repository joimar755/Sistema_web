import axios from "axios";

const API = "http://127.0.0.1:8000/datos/insertar";

const Venta = "http://127.0.0.1:8000/datos/comprar";



export const Pro = pro => axios.post(`${API}`, pro);
export const Ven = ven => axios.post(`${Venta}`, ven);

