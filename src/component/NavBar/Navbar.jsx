import React from "react";
import { VscAccount } from "react-icons/vsc";

function Navbar() {
  return (
    <div className="flex flex-row justify-between p-4 ">
      <div>
        <h2 className=" text-black text-4xl font-medium">Task Board</h2>
      </div>

      <div className="">
        <VscAccount size={36} />
      </div>
    </div>
  );
}
export default Navbar;
