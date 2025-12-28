import React from "react";
import CardHeader from "../CardHeader/CardHeader";
import InfoRow from "../InfoRow/InfoRow";
import ProgressBar from "../ProgressBar/ProgressBar";
import DiskItem from "../DiskItem/DiskItem";

export default function Card({ data, title }) {
  function progress_calculator(total, free, inuse) {
    if (free) {
      return (total - free) / total;
    }
    return inuse / total;
  }

  const headers = {
    os: { icon: "OS", title: "Operating System" },
    system: { icon: "HW", title: "Hardware" },
    cpu: { icon: "⚡", title: "Processor" },
    memory: { icon: "💾", title: "Memory" },
    disks: { icon: "💿", title: "Storage Devices" },
    gpu: { icon: "🎮", title: "Graphics Processing" },
    network: { icon: "🌐", title: "Network" },
    localPorts: { icon: "🔌", title: "Active Ports" },
  }

  var section = "";
  if (title === "disks" || title === "gpu" || title === "network" || title === "localPorts") {
    section = "section-wide";
  }

  if (title === "cpu") {
    data.Cores_Logical = `${data.Cores_Logical} cores`;
    data.Cores_Physical = `${data.Cores_Physical} cores`;
    data.Speed = `${data.Speed} GHz`;
  }

  if (title === "memory") {
    data.Used_Ram = `${(data.Total_RAM - data.Free_RAM).toFixed(2)} GB (${(progress_calculator(parseFloat(data.Total_RAM), parseFloat(data.Free_RAM), null) * 100).toFixed(2)}%)`;
    data.Total_RAM = `${data.Total_RAM} GB`;
    data.Free_RAM = `${data.Free_RAM} GB`;
  }

  return (
    <div className={`card ${section}`}>
      <CardHeader icon={headers[title].icon} title={headers[title].title} />
      {title === "disks" && (
        <>
          {Array.isArray(data) ? data.map((disk, index) => (
            <DiskItem key={index} data={disk} />
          )) : <DiskItem data={data} />}
        </>
      )}
      {title !== "disks" && (
        <>
          {Object.keys(data).map((key) => (
            <InfoRow key={key} label={key} value={data[key]} />
          ))}
          {title === "memory" && (
            <ProgressBar progress={`${(progress_calculator(parseFloat(data.Total_RAM), parseFloat(data.Free_RAM), null) * 100).toFixed(2)}%`} />
          )}
        </>
      )}
    </div>
  );
}
