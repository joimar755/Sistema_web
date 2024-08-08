import axios from "axios";
import { useEffect, useState } from "react";
import { SimpleCharts } from "./SimpleCharts";
import { CardUsageExample } from "./CardUsageExample";

import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { TransactionsTable } from "./TransactionsTable";


export const Listar_users = () => {
  const [dolar, setdolar] = useState([]);
  const [category, setCategory] = useState([]);
  const [Products, setP] = useState([]);

  useEffect(() => {
    const obtener = async () => {
      const url = await axios.get("http://127.0.0.1:8000/dolar");
      const resultado = url;
      setdolar(resultado.data.resultado);
    };
    const category = async () => {
      const url = await axios.get("http://127.0.0.1:8000/category");
      const resultado = url;
      setCategory(resultado.data.resultado);
    };
    const obtenerP = async () => {
      const url = await axios.get("http://127.0.0.1:8000/venta");
      const resultado = url;
      setP(resultado.data);
    };
    obtenerP();
    obtener();
    category();
  }, []);
  //console.log(dolar);
  //console.log(category);
  console.log(Products);

  return (
    <>
      <h1 className="">Graficas Precios</h1>
      <h1>dolar</h1>
      <CardUsageExample dolars={dolar} />
      <Table striped bordered hover responsive="sm">
      <SimpleCharts />
      </Table>
      <TransactionsTable />
    
    </>
  );
};
