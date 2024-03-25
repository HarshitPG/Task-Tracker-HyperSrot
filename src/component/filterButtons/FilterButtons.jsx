import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTodo,
  resetSort,
  searchTodo,
  sortByDate,
  sortByPriority,
} from "../../redux/action";
import MainSection from "../mainSection/MainSection";

const FilterButtons = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filter);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = (filter) => {
    dispatch(filterTodo(filter));
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(searchTodo(value));
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "date") {
      dispatch(sortByDate());
    } else if (selectedOption === "priority") {
      dispatch(sortByPriority());
    } else {
      dispatch(resetSort());
    }
  };

  return (
    <>
      <div className="flex  md:flex-row justify-between flex-col ">
        <div className="flex flex-row items-center mb-4 sm:mb-0 ">
          <h2 className="text-black sm:text-2xl text-1xl font-medium md:w-24 w-32">
            Filter By:{" "}
          </h2>
          <div className="mx-6 pt-1">
            <input
              className="sm:w-36 w-16 rounded"
              type="text"
              placeholder="  Assignee Name"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <select
            className=" w-28 rounded text-[#9CA3AF]"
            value={currentFilter}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="ALL"> Priority</option>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
        <div className="sm:block hidden">
          <MainSection />
        </div>
      </div>
      <div className="flex flex-row items-center sm:mt-4">
        <h2 className="text-black sm:text-2xl text-1xl font-medium w-32  md:w-24">
          Sort By:{" "}
        </h2>
        <select
          className=" w-20 sm:ml-6 h-6 rounded text-[#9CA3AF]"
          onChange={handleSortChange}
        >
          <option value="">Sort By</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="sm:hidden mt-4">
        <MainSection />
      </div>
    </>
  );
};

export default FilterButtons;
