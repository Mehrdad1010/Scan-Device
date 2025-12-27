import React from 'react';

export default function Card({ section }) {
  function progress_calculator(total, free, inuse) {
    if (free) {
      return (total - free) / total;
    }
    return inuse / total;
  }

  return <div className={`card ${section}`}></div>;
}
