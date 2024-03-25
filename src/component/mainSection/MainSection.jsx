import React, { useContext } from "react";
import { Context } from "../../context/context";

const MainSection = () => {
  const { setShowAdd } = useContext(Context);
  const handleAddModel = () => {
    setShowAdd(true);
  };
  return (
    <button
      className=" p-2 w-36 bg-[#25689C] text-sm text-white rounded"
      onClick={handleAddModel}
    >
      Add New Task
    </button>
  );
};

export default MainSection;
