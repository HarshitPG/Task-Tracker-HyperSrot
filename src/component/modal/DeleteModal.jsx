import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../redux/action";
import { Context } from "../../context/context";
import { IoIosCloseCircleOutline } from "react-icons/io";

const DeleteModal = ({ todo, index }) => {
  const { showDelete, setShowDelete, setOpenMiniMenuId } = useContext(Context);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    setShowDelete(false);
    setOpenMiniMenuId(null);
  };
  const handleCloseTodoClick = () => {
    setShowDelete(false);
    setOpenMiniMenuId(null);
  };

  return (
    <>
      {showDelete && (
        <div className="fixed inset-0 z-10 flex top-0 left-0 justify-center items-center bg-black bg-opacity-50 overflow-scroll  scrollbar-hide">
          <div className=" flex flex-col min-h-[120px] w-[320px] bg-white ">
            <div className="m-1 flex flex-row justify-between items-center h-[40px]">
              <div className=" font-medium text-2xl">DELETE A TASK</div>
              <button onClick={handleCloseTodoClick}>
                <IoIosCloseCircleOutline size={32} />
              </button>
            </div>
            <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50">
              <div className=" p-3">
                <div className="pb-4">Do You Wish to Delete Task</div>
                <div className="flex flex-row justify-between">
                  <div className=" font-semibold"> Task {index + 1}</div>
                  <button
                    className=" p-1 w-24 bg-[#25689C] text-sm text-white rounded"
                    onClick={handleDelete}
                  >
                    Yes
                  </button>
                  <button
                    className=" p-1 w-24 bg-[#25689C] text-sm text-white rounded"
                    onClick={handleCloseTodoClick}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
