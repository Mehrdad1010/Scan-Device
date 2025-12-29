import React from "react";
import InfoRow from "../InfoRow/InfoRow";

export default function GpuItem({ data }) {
  return (
    <div className="gpu-item">
      <InfoRow label="Vendor" value={data.Vendor} />
      <InfoRow label="Model" value={data.Model} />
      <InfoRow label="VRAM" value={`${data.VRAM} MB`} />
    </div>
  );
}
