import React from "react";
import { useSystemInfo } from "../../context/SystemProvider";
import Card from "../Card/Card";

export default function Grid() {
  const { data } = useSystemInfo();
  const allowedKeys = ["os", "system", "cpu", "memory", "disks", "gpu", "network", "localPorts"];
  return (
    <div className="grid">
      {Object.keys(data).filter(key => allowedKeys.includes(key)).map((key) => (
        <Card data={data[key]} title={key} key={key}/>
      ))}
    </div>
  );
}
