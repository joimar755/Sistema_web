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
      const url = await axios.get("http://127.0.0.1:8000/total-diario");
      const resultado = url;
      setP(resultado.data);
    };
    obtenerP();
  }, []);
  console.log(Products)
  const  Chardata = Products.map((item) => ({
    fecha : item.fecha,
    total: item.total
   }))
  return (
    <>
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: Chardata.map((item) => item.fecha),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: Chardata.map((item) => item.total),
            },
          ]}
          width={1200}
          height={500}
          grid={{ vertical: true, horizontal: true }}

        />
    </>
  );
}
