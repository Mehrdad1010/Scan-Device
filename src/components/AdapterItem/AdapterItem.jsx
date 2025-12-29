import React from "react";
import InfoRow from "../InfoRow/InfoRow";

export default function Adapteritem({ data }) {
  const allowedKeys = {
    name: "Name",
    ip4: "IPv4",
    ip6: "IPv6",
    mac: "MAC Address",
  };
  return (
    <div className="adapter-item">
      {Object.entries(data)
        .filter(([key, value]) => allowedKeys[key] && value)
        .map(([key, value]) => (
          <InfoRow key={key} label={allowedKeys[key]} value={value} />
        ))}
      <span className={`badge ${parseInt(data.speed) === 0 ? "warning" : ""}`}>
        {parseInt(data.speed) === 0
          ? `speed ${data.speed} Mbps (Disconnected)`
          : `speed ${data.speed} Mbps`}
      </span>
      <span className="badge">Type {data.type}</span>
    </div>
  );
}
