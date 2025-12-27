import React from 'react'

export default function 
({label, value, valueclass}) {
  return (
    <div className='info-row'>
        <span className="labael">{label}</span>
        <span className={`value ${valueclass}`}>{value}</span>
    </div>
  )
}
