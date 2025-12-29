import React from 'react'
import PortItem from '../PortItem/PortItem'

export default function PortsGrid({ data }) {
  return (
    <div className='ports-grid'>
      {Array.isArray(data) ? (
        data.map((port, index) => <PortItem key={index} data={port} />)
      ) : (
        <PortItem data={data} />
      )}
    </div>
  )
}
