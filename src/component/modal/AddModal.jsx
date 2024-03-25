import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../redux/action";
import { Context } from "../../context/context";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AddModal = () => {
  function generateUniqueId() {
    const randomNumber = Math.random().toString(16).slice(2);
    const timestamp = new Date().getTime().toString(16);
    const uniqueId = timestamp + randomNumber;
    return uniqueId;
  }
  const { showAdd, setShowAdd } = useContext(Context);

  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState({
    title: "",
    desc: "",
    team: "",
    assignees: "",
    status: "",
    priority: "",
    id: generateUniqueId(),
  });
  const handleCloseTodoClick = () => {
    setShowAdd(false);
  };
  const handleAddTodoClick = () => {
    if (
      newTodo.title.trim() !== "" &&
      newTodo.desc.trim() !== "" &&
      newTodo.team.trim() !== "" &&
      newTodo.assignees.trim() !== "" &&
      newTodo.status.trim() !== "" &&
      newTodo.priority.trim() !== ""
    ) {
      dispatch(addTodo(newTodo));
      setShowAdd(false);
      setNewTodo({
        title: "",
        desc: "",
        team: "",
        assignees: "",
        status: "",
        priority: "",
        id: generateUniqueId(),
      });
    } else {
      alert("Feilds are empty");
    }
  };
  return (
    <>
      {showAdd && (
        <div className="fixed z-10 inset-0 flex top-0 left-0 justify-center items-center bg-black bg-opacity-50">
          <div className=" flex flex-col min-h-[420px] w-[320px] bg-white">
            <div className="m-1 flex flex-row justify-between items-center h-[40px]">
              <h3 className=" font-medium text-2xl">ADD TASK</h3>
              <button onClick={handleCloseTodoClick}>
                <IoIosCloseCircleOutline size={32} />
              </button>
            </div>
            <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="flex flex-col mb-3">
                <h4 className=" font-medium text-1xl">Title:</h4>
                <input
                  id="addTodoInputTitle"
                  className="w-72 bg-gray-200 p-1 rounded"
                  type="text"
                  placeholder="Title"
                  value={newTodo.title}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, title: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col mb-3">
                <h4 className=" font-medium text-1xl">Description</h4>
                <input
                  id="addTodoInputDesc"
                  className="w-72 bg-gray-200 p-1 rounded"
                  type="text"
                  placeholder="Desc"
                  value={newTodo.desc}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, desc: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col mb-3">
                <h4 className=" font-medium text-1xl">Team:</h4>
                <input
                  id="addTodoInputTeam"
                  className="w-72 bg-gray-200 p-1 rounded"
                  type="text"
                  placeholder="Team"
                  value={newTodo.team}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, team: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col mb-3">
                <h4 className=" font-medium text-1xl">Assignee:</h4>
                <input
                  id="addTodoInputAssignees"
                  className="w-72 bg-gray-200 p-1 rounded"
                  type="text"
                  placeholder="Assignees"
                  value={newTodo.assignees}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, assignees: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <h4 className=" font-medium text-1xl">Priority:</h4>
                  <select
                    id="addTodoInputPriority"
                    value={newTodo.priority}
                    className="ml-1 rounded"
                    onChange={(e) =>
                      setNewTodo({ ...newTodo, priority: e.target.value })
                    }
                  >
                    <option value="">Priority</option>
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                  </select>
                </div>
                <div className="flex flex-row">
                  <h4 className=" font-medium text-1xl">Status:</h4>

                  <select
                    id="addTodoInputStatus"
                    value={newTodo.status}
                    className="w-16 ml-1 rounded"
                    onChange={(e) =>
                      setNewTodo({ ...newTodo, status: e.target.value })
                    }
                  >
                    <option value="">Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Deferred">Deferred</option>
                  </select>
                </div>
              </div>
            </div>
            <div className=" flex justify-end my-2 mx-4">
              <button
                className=" p-1 w-24 bg-[#25689C] text-sm text-white rounded"
                onClick={handleAddTodoClick}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
