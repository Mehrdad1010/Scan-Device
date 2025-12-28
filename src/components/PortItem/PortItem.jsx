import React from 'react';

export default function PortItem() {
  return (
    <div className="port-item">
      <span className="port-proto">UDP</span> 0.0.0.0:53
      <br />
      <span className="port-state">BOUND · PID 3576</span>
    </div>
  );
}
