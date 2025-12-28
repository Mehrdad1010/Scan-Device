import React from "react";
import CardHeader from "../CardHeader/CardHeader";
import InfoRow from "../InfoRow/InfoRow";

export default function Card({ data, title }) {
  function progress_calculator(total, free, inuse) {
    if (free) {
      return (total - free) / total;
    }
    return inuse / total;
  }

  const headers = {
    os: {icon:"OS", title: "Operating System"},
    system : {icon:"HW", title: "Hardware"},
    cpu: {icon:"⚡", title: "Processor"},
    memory : {icon:"💾", title: "Memory"},
    disks: {icon:"💿", title: "Storage Devices"},
    gpu : {icon:"🎮", title: "Graphics Processing"},
    network: {icon:"🌐", title: "Network"},
    localPorts : {icon:"🔌", title: "OActive Ports"},
  }

  var section = "";
  if(title === "disks" || title === "gpu" || title === "network" || title === "localPorts") {
    section = "section-wide";
  } 

  return (
    <div className={`card ${section}`}>
      <CardHeader icon={headers.title.icon} title={headers.title.title} />
      {Object.keys(data).forEach((key) => {
        < InfoRow label={key} value={data[key]}/>
        console.log(key, data[key]);
      })}

    </div>
  );
}
