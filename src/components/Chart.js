import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  //   CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart = () => {
  const data = [
    {
      name: "11월 1일",
      질문수: 4000,
    },
    {
      name: "11월 2일",
      질문수: 3000,
    },
    {
      name: "11월 3일",
      질문수: 2000,
    },
    {
      name: "11월 4일",
      질문수: 2780,
    },
    {
      name: "11월 5일",
      질문수: 1890,
    },
    {
      name: "11월 6일",
      질문수: 2390,
    },
    {
      name: "11월 7일",
      질문수: 3490,
    },
  ];

  return (
    <div>
      Chart
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="질문수" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Chart;
