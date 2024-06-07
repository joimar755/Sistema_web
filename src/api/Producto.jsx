import axios from "axios";

const API = "https://nvcmw7nl-8000.use2.devtunnels.ms/datos/insertar";


export const Pro = pro => axios.post(`${API}`, pro);

