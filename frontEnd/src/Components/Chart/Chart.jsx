import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-5 py-2 rounded-sm bg-black bg-opacity-5">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
};

export default function Chart({ data, dataKey, grid, height }) {
  return (
    <>
      <ResponsiveContainer width="100%" height={height} aspect={3}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#fff" />
          <Line type="monotone" dataKey="sale" stroke="#43c67a" />
          <Tooltip content={<CustomTooltip />} />
          {grid && <CartesianGrid stroke="#fff" />}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
