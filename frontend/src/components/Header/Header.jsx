import React from "react";
import "./Header.module.css";
import { useSystemInfo } from "../../context/SystemProvider";

export default function Header({ time }) {
  // const { os, system, cpu, memory, disks, localPorts, gpu, network, notes } =
  //   useSystemInfo();

  // console.log(notes);

  return (
    <header>
      <h1>System Diagnostics</h1>
      <p className="subtitle">
        <span className="status-indicator"></span>Real-Time Monitoring
      </p>
      <div className="timestamp">⏱ {time} </div>
    </header>
  );
}
