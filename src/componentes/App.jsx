import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Create } from "./Create";
import { Listar_users } from "./Listar_users";
import { Navegacion } from "./Navegacion";
import {Carrito} from "./Carrito";
import { Ventas } from "./Ventas";

export const App = () => {
  return (
    <Router>
      <Navegacion />
      <div className="container p-4">
        <Routes>
          <Route path="/" exact element={<Listar_users />} />
          <Route path="/create" exact element={<Create />} />
          <Route path="/carrito" exact element={<Carrito />} />
          <Route path="/ventas" exact element={<Ventas />} />
          <Route path="/edit/:id" exact element={<Create />} />
        </Routes>
      </div>
    </Router>
  );
};
