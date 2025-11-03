import React from "react";
import assets from "../assets/assests";

function Navbar() {
  return (
    <div className=" p-2 shadow-md flex gap-8">
      <img src={assets.Logo} alt="logo" className="h-20 w-24  ml-16" />
      <div className="text-gray-700 mt-6">
        <p className="text-[12px] font-semibold mb-0 leading-tight">Partner with</p>
        <h1 className="text-[18px] font-bold mt-0 leading-tight tracking-wide">BSOFT</h1>
      </div>
    </div>
  );
}

export default Navbar;
