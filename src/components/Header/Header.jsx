import React from "react";
import "./Header.module.css";
import { useSystemInfo } from "../../context/SystemProvider";

export default function Header() {
  const { data } = useSystemInfo();

  return (
    <header>
      <h1>System Diagnostics</h1>
      <p className="subtitle">
        <span className="status-indicator"></span>Real-Time Monitoring
      </p>
      <div className="timestamp">⏱ {data.notes.timestamp}</div>
    </header>
  );
}
