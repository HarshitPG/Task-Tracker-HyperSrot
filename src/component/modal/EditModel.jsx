import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../../redux/action";
import { Context } from "../../context/context";
import { IoIosCloseCircleOutline } from "react-icons/io";

const EditModal = ({ todo }) => {
  const {
    showEdit,
    setShowEdit,
    selectedTodoIndex,
    setSelectedTodoIndex,
    openMiniMenuId,
    setOpenMiniMenuId,
  } = useContext(Context);
  const dispatch = useDispatch();
  const [descInputHeight, setDescInputHeight] = useState("auto");
  const [originalTodo, setOriginalTodo] = useState(todo);
  const [updatedTodo, setUpdatedTodo] = useState(todo);

  const handleSaveEdit = () => {
    dispatch(editTodo(todo.id, updatedTodo));

    setShowEdit(false);
    setOpenMiniMenuId(null);
  };
  const handleCloseTodoClick = () => {
    setShowEdit(false);
    setOpenMiniMenuId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value,
    });
  };

  const handleResetEdit = () => {
    setUpdatedTodo(originalTodo); // Reset to original todo values
  };

  useEffect(() => {
    const descInput = document.getElementById("addTodoInputDesc");
    if (descInput) {
      setDescInputHeight(`${Math.min(descInput.scrollHeight, 200)}px`);
    }
  }, [updatedTodo.desc]);

  return (
    <>
      {showEdit && (
        <div className="fixed inset-0 z-10  flex top-0 left-0 justify-center items-center bg-black bg-opacity-50 overflow-scroll  scrollbar-hide">
          <div className=" flex flex-col min-h-[420px] w-[320px] bg-white ">
            <div className="m-1 flex flex-row justify-between items-center h-[40px]">
              <div className=" font-medium text-2xl">EDIT TASK</div>
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
                  value={updatedTodo.title}
                  readOnly
                />
              </div>
              <div className="flex flex-col mb-3">
                <h4 className=" font-medium text-1xl">Description</h4>
                <textarea
                  id="addTodoInputDesc"
                  className="h-auto w-72 bg-gray-200 p-1 rounded overflow-y-auto"
                  type="text"
                  placeholder="Desc"
                  value={updatedTodo.desc}
                  style={{ height: descInputHeight }}
                  readOnly
                />
              </div>
              <div className="flex flex-col mb-3">
                <h4 className=" font-medium text-1xl">Team:</h4>
                <input
                  id="addTodoInputTeam"
                  className="w-72 bg-gray-200 p-1 rounded"
                  type="text"
                  placeholder="Team"
                  value={updatedTodo.team}
                  readOnly
                />
              </div>
              <div className="flex flex-col mb-3">
                <h4 className=" font-medium text-1xl">Assignee:</h4>
                <input
                  id="addTodoInputAssignees"
                  className="w-72 bg-gray-200 p-1 rounded"
                  type="text"
                  placeholder="Assignees"
                  value={updatedTodo.assignees}
                  readOnly
                />
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <h4 className=" font-medium text-1xl">Priority:</h4>
                  <select
                    id="addTodoInputPriority"
                    className="ml-1 rounded"
                    value={updatedTodo.priority}
                    onChange={handleChange}
                    name="priority"
                  >
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                  </select>
                </div>
                <div className="flex flex-row">
                  <h4 className=" font-medium text-1xl">Status:</h4>

                  <select
                    id="addTodoInputStatus"
                    className="w-16 ml-1 rounded"
                    value={updatedTodo.status}
                    onChange={handleChange}
                    name="status"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Deferred">Deferred</option>
                  </select>
                </div>
              </div>
            </div>
            <div className=" flex flex-row justify-end my-2 mx-4">
              <button
                className=" p-1 w-24 bg-[#25689C] text-sm text-white rounded"
                onClick={handleSaveEdit}
              >
                Submit
              </button>
              <button
                className=" p-1 w-24 ml-[5%] bg-[#25689C] text-sm text-white rounded"
                onClick={handleResetEdit}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
