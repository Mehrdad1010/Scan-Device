import React from 'react';
import InfoRow from '../InfoRow/InfoRow';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function DiskItem({data}) {
  const progress = parseFloat(data.usePercent) || 0;
  
  return (
    <div className="disk-item">
      <InfoRow label="Drive" value={`${data.fs} ${data.type}`} />
      <InfoRow label="Total Size" value={`${data.Total_Size} GB`} />
      <InfoRow label="Used" value={`${data.Used} GB (${data.usePercent}%)`} />
      <ProgressBar progress={`${progress}%`} />
    </div>
  );
}
