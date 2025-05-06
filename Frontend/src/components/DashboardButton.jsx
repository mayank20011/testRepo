import React from "react";

const DashboardButton = ({ children ,setOperation , data, operation}) => {
  return (
    <button onClick={()=>{setOperation(data)}} className={`cursor-pointer border p-2 rounded-md hover:scale-95 transition hover:shadow-sm hover:shadow-black ${operation==data? 'bg-black text-white':'bg-white text-black'}`}>
      {children}
    </button>
  );
};

export default DashboardButton;
