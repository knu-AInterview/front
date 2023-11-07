import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  //   CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const UserLIneChart = () => {
  const data = [
    {
      name: "11월 1일",
      이용자수: 2400,
    },
    {
      name: "11월 2일",
      이용자수: 1398,
    },
    {
      name: "11월 3일",
      이용자수: 9800,
    },
    {
      name: "11월 4일",
      이용자수: 3908,
    },
    {
      name: "11월 5일",
      이용자수: 4800,
    },
    {
      name: "11월 6일",
      이용자수: 3800,
    },
    {
      name: "11월 7일",
      이용자수: 4300,
    },
  ];

  return (
    <div>
      UserLIneChart
      <LineChart
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
        <Line
          type="monotone"
          dataKey="이용자수"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default UserLIneChart;
