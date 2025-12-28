import React from "react";

export default function InfoRow({ label, value }) {
  var valueclass = "";
  if ( label === "Used_Ram") {
    valueclass = "warning";
  }
  if ( 
    label === "Name" ||
    label === "Manufacturer" ||
    label === "Total_RAM" ||
    label === "totalGB" ||
    label === "Drive" ||
    label === "Vendor" ||
    label === "Hostname"
  ) {
    valueclass = "highlight";
  }

  if (label === "Used") {
    const persent = parseInt(value.split("(")[1].split("%")[0]);
    if (persent >= 75) {
      valueclass = "critical";
    } else if (persent >= 50) {
      valueclass = "warning";
    }else if(persent <= 25){
      valueclass = "good";
    
    }
  }
  label = label.replace(/_/g, " ");
  
  const renderValue = (val) => {
    if (typeof val === 'object' && val !== null) {
      if (Array.isArray(val)) {
        return val.map((item, index) => (
          <div key={index}>
            {typeof item === 'object' ? JSON.stringify(item) : item}
          </div>
        ));
      } else {
        return JSON.stringify(val);
      }
    }
    return val;
  };

  return (
    <div className="info-row">
      <span className="label">{label}</span>
      <span className={`value ${valueclass}`}>{renderValue(value)}</span>
    </div>
  );
}
