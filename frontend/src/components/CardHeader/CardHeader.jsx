import React from 'react';

export default function CardHeader({ icon, title }) {
  return (
    <div className="card-header">
      <dic className="card-icon">{icon}</dic>
      <h2 className="card-title">{title}</h2>
    </div>
  );
}
            