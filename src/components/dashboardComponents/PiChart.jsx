import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const PiChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: data.map((item) => item.label),
          datasets: [
            {
              data: data.map((item) => item.value),
              backgroundColor: ["#82CD47", "#E9B824", "#C70039"],
            },
          ],
        },
      });
    }
  }, [data]);

  return (
    <div className="sm:scale:50 md:scale-100 scale:20  rounded-xl bg-white shadow-lg shadow-black p-3 hover:scale-105 transition duration-500">
      <canvas ref={chartRef} className=""/>
    </div>
  );
};

export default PiChart;
