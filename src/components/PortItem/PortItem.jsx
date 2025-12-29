import React from 'react';

export default function PortItem({ data }) {
  return (
    <div className="port-item">
      <span className="port-proto">{data.proto}</span> {data.address}:{data.port}
      <br />
      <span className="port-state">{data.state} · PID {data.pid}</span>
    </div>
  );
}
