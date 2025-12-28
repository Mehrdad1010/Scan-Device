import React from "react";
import { useSystemInfo } from "../../context/SystemProvider";
import Card from "../Card/Card";

export default function () {
  const { data } = useSystemInfo();
  return (
    <div className="grid">
      {Object.keys(data).forEach((key) => { 
        <Card data={data[key]} title={key} key={key}/>
      })}
      {/* Operation System */}
      <Card key={1} data={Os} title={"Operating System"} icon={"OS"} />
      {/* <!-- Hardware System --> */}
      <Card data={System} />
      {/* <!-- CPU --> */}
      <Card data={Cpu} />
      {/* <!-- Memory --> */}
      <Card data={Memory} />
      {/* <!-- Disks --> */}
      <Card data={Disks} />
      {/* <!-- GPU --> */}
      <Card data={Gpu} />
      {/* <!-- Network --> */}
      <Card data={Network} />
      {/* <!-- Local Ports --> */}
      <Card data={LocalPorts} />
    </div>
  );
}
