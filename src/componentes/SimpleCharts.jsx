import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

export function SimpleCharts() {
  // Datos originales
  const [Products, setP] = useState([]);

  useEffect(() => {
    const obtenerP = async () => {
      const url = await axios.get("http://127.0.0.1:8000/relacion");
      const resultado = url;
      setP(resultado.data);
    };
    obtenerP();
  }, []);
  const  Chardata = Products.map((item) => ({
    name : item.name,
    price: item.price
   }))
  return (
    <>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: Chardata.map((item) => item.name),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: Chardata.map((item) => item.price),
            },
          ]}
          width={1000}
          height={300}
          grid={{ vertical: true, horizontal: true }}

        />
    </>
  );
}
