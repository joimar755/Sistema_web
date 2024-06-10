import axios from "axios";

const API = "http://127.0.0.1:8000/datos/insertar";


export const Pro = pro => axios.post(`${API}`, pro);

