import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Context } from "../../context/context";
import EditModal from "../modal/EditModel";
import DeleteModal from "../modal/DeleteModal";

const Todos = () => {
  const [miniMenu, setMiniMenu] = useState(false);
  const {
    showEdit,
    setShowEdit,
    showDelete,
    setShowDelete,
    selectedTodoIndex,
    setSelectedTodoIndex,
    openMiniMenuId,
    setOpenMiniMenuId,
  } = useContext(Context);
  const todos = useSelector((state) => state.todos);

  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleDeleteClick = (todo, index) => {
    setSelectedTodo(todo);
    setSelectedTodoIndex(index);
    setShowDelete(true);
  };

  const handleMiniMenuClick = (id) => {
    setOpenMiniMenuId(id === openMiniMenuId ? null : id);
  };

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setShowEdit(true);
  };

  const filteredTodo = useSelector((state) => {
    const todos = state.todos;
    const filter = state.filter;
    const search = state.search;
    return todos.filter((todo) => {
      const matchesFilter =
        (filter === "P0" && todo.todoData.priority === "P0") ||
        (filter === "P1" && todo.todoData.priority === "P1") ||
        (filter === "P2" && todo.todoData.priority === "P2") ||
        filter === "ALL";

      const matchesSearch = todo.todoData.assignees
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  });
  const originalTodos = useSelector((state) => state.originalTodos);
  const getIndexFromOriginal = (todo) => {
    const originalIndex = originalTodos.findIndex(
      (originalTodo) => originalTodo.todoData.id === todo.todoData.id
    );
    return originalIndex !== -1 ? originalIndex : null;
  };

  const pendingTodos = filteredTodo.filter(
    (todo) => todo.todoData.status === "Pending"
  );
  const inProgressTodos = filteredTodo.filter(
    (todo) => todo.todoData.status === "In Progress"
  );
  const completedTodos = filteredTodo.filter(
    (todo) => todo.todoData.status === "Completed"
  );
  const deployedTodos = filteredTodo.filter(
    (todo) => todo.todoData.status === "Deployed"
  );
  const deferredTodos = filteredTodo.filter(
    (todo) => todo.todoData.status === "Deferred"
  );
  return (
    <>
      <div
        className={`my-6 grid grid-flow-col gap-4 ${
          openMiniMenuId ? "overflow-x-hidden" : "overflow-x-auto"
        } scrollbar-hide items-center`}
      >
        <div className=" max-h-[480px] min-h-[480px] sm:min-w-[320px] min-w-[273px] bg-white rounded  overflow-auto scrollbar-hide">
          <h2 className=" flex min-h-[52px] rounded-t text-2xl font-medium text-white bg-gray-400 justify-center items-center">
            Pending
          </h2>
          <ul className="p-4 ">
            {pendingTodos.map((todo, index) => {
              const originalTodoIndex = getIndexFromOriginal(todo);
              return (
                <div
                  className=" bg-gray-100 p-4 mb-4 rounded"
                  key={index}
                  id={`todo-${index}`}
                >
                  <div className=" flex flex-row justify-between items-center pb-2">
                    <div className=" text-2xl font-medium">
                      Task {originalTodoIndex + 1}
                    </div>
                    <div className=" px-2 py-0.5 w-8  bg-[#25689C] text-base text-white ">
                      {todo.todoData.priority}
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div>{todo.todoData.desc}</div>
                  </div>
                  <div className=" my-4 flex flex-row justify-between items-center font-medium ">
                    <div className=" text-black text-1xl max-w-56 flex overflow-auto scrollbar-hide ">
                      @{todo.todoData.assignees}
                    </div>
                    <div className="relative z-0">
                      <button
                        className="w-6 px-1.5 pb-0.5 bg-[#25689C] text-base text-white"
                        onClick={() => handleMiniMenuClick(todo.todoData.id)}
                      >
                        +
                      </button>
                      {openMiniMenuId === todo.todoData.id && (
                        <div className="absolute top-8 right-0 border bg-white border-gray-200 p-2">
                          <div onClick={() => handleEditClick(todo.todoData)}>
                            Edit
                          </div>
                          <div
                            onClick={() =>
                              handleDeleteClick(
                                todo.todoData,
                                originalTodoIndex
                              )
                            }
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" flex w-36 px-1.5 pb-0.5 bg-[#25689C] text-base items-center justify-center text-white rounded ">
                    <div>{todo.todoData.status}</div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className=" max-h-[480px] min-h-[480px] sm:min-w-[320px] min-w-[260px] bg-white rounded  overflow-auto scrollbar-hide">
          <h2 className=" flex min-h-[52px] rounded-t text-2xl font-medium text-white  bg-[#E79925] justify-center items-center">
            In Progress
          </h2>
          <ul className="p-4 ">
            {inProgressTodos.map((todo, index) => {
              const originalTodoIndex = getIndexFromOriginal(todo);
              return (
                <div
                  className="  p-4 mb-4 rounded bg-gray-100"
                  key={index}
                  id={`todo-${index}`}
                >
                  <div className=" flex flex-row justify-between items-center pb-2">
                    <div className=" text-2xl font-medium">
                      Task {originalTodoIndex + 1}
                    </div>
                    <div className=" px-2 py-0.5 w-8  bg-[#25689C] text-base text-white ">
                      {todo.todoData.priority}
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div>{todo.todoData.desc}</div>
                  </div>
                  <div className=" my-4 flex flex-row justify-between items-center font-medium ">
                    <div className=" text-black text-1xl max-w-56 flex overflow-auto scrollbar-hide ">
                      @{todo.todoData.assignees}
                    </div>
                    <div className="relative z-0">
                      <button
                        className="w-6 px-1.5 pb-0.5 bg-[#25689C] text-base text-white"
                        onClick={() => handleMiniMenuClick(todo.todoData.id)}
                      >
                        +
                      </button>
                      {openMiniMenuId === todo.todoData.id && (
                        <div className="absolute top-8 right-0 border bg-white border-gray-200 p-2">
                          <div onClick={() => handleEditClick(todo.todoData)}>
                            Edit
                          </div>
                          <div
                            onClick={() =>
                              handleDeleteClick(
                                todo.todoData,
                                originalTodoIndex
                              )
                            }
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" flex w-36 px-1.5 pb-0.5 bg-[#25689C] text-base items-center justify-center text-white rounded ">
                    <div>{todo.todoData.status}</div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className=" max-h-[480px] min-h-[480px] sm:min-w-[320px] min-w-[260px] bg-white rounded  overflow-auto scrollbar-hide">
          <h2 className=" flex min-h-[52px] rounded-t text-2xl font-medium text-white bg-[#42A81F] justify-center items-center">
            Completed
          </h2>
          <ul className="p-4 ">
            {completedTodos.map((todo, index) => {
              const originalTodoIndex = getIndexFromOriginal(todo);
              return (
                <div
                  className=" bg-gray-100 p-4 mb-4 rounded"
                  key={index}
                  id={`todo-${index}`}
                >
                  <div className=" flex flex-row justify-between items-center pb-2">
                    <div className=" text-2xl font-medium">
                      Task {originalTodoIndex + 1}
                    </div>
                    <div className=" px-2 py-0.5 w-8  bg-[#25689C] text-base text-white ">
                      {todo.todoData.priority}
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div>{todo.todoData.desc}</div>
                  </div>
                  <div className=" my-4 flex flex-row justify-between items-center font-medium ">
                    <div className=" text-black text-1xl max-w-56 flex overflow-auto scrollbar-hide ">
                      @{todo.todoData.assignees}
                    </div>
                    <div className="relative">
                      <button
                        className="w-6 px-1.5 pb-0.5 bg-[#25689C] text-base text-white"
                        onClick={() => handleMiniMenuClick(todo.todoData.id)}
                      >
                        +
                      </button>
                      {openMiniMenuId === todo.todoData.id && (
                        <div className="absolute top-8 right-0 border bg-white border-gray-200 p-2">
                          <div onClick={() => handleEditClick(todo.todoData)}>
                            Edit
                          </div>
                          <div
                            onClick={() =>
                              handleDeleteClick(
                                todo.todoData,
                                originalTodoIndex
                              )
                            }
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" flex w-36 px-1.5 pb-0.5 bg-[#25689C] text-base items-center justify-center text-white rounded ">
                    <div>{todo.todoData.status}</div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className=" max-h-[480px] min-h-[480px] sm:min-w-[320px] min-w-[260px] bg-white rounded  overflow-auto scrollbar-hide">
          <h2 className=" flex min-h-[52px] rounded-t text-2xl font-medium text-white bg-[#353976] justify-center items-center">
            Deployed
          </h2>
          <ul className="p-4 ">
            {deployedTodos.map((todo, index) => {
              const originalTodoIndex = getIndexFromOriginal(todo);
              return (
                <div
                  className=" bg-gray-100 p-4 mb-4 rounded"
                  key={index}
                  id={`todo-${index}`}
                >
                  <div className=" flex flex-row justify-between items-center pb-2">
                    <div className=" text-2xl font-medium">
                      Task {originalTodoIndex + 1}
                    </div>
                    <div className=" px-2 py-0.5 w-8  bg-[#25689C] text-base text-white ">
                      {todo.todoData.priority}
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div>{todo.todoData.desc}</div>
                  </div>
                  <div className=" my-4 flex flex-row justify-between items-center font-medium ">
                    <div className=" text-black text-1xl max-w-56 flex overflow-auto scrollbar-hide ">
                      @{todo.todoData.assignees}
                    </div>
                    <div className="relative">
                      <button
                        className="w-6 px-1.5 pb-0.5 bg-[#25689C] text-base text-white"
                        onClick={() => handleMiniMenuClick(todo.todoData.id)}
                      >
                        +
                      </button>
                      {openMiniMenuId === todo.todoData.id && (
                        <div className="absolute top-8 right-0 border bg-white border-gray-200 p-2">
                          <div onClick={() => handleEditClick(todo.todoData)}>
                            Edit
                          </div>
                          <div
                            onClick={() =>
                              handleDeleteClick(
                                todo.todoData,
                                originalTodoIndex
                              )
                            }
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" flex w-36 px-1.5 pb-0.5 bg-[#25689C] text-base items-center justify-center text-white rounded ">
                    <div>{todo.todoData.status}</div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className=" max-h-[480px] min-h-[480px] sm:min-w-[320px] min-w-[260px] bg-white rounded  overflow-auto scrollbar-hide">
          <h2 className=" flex min-h-[52px] rounded-t text-2xl font-medium text-white bg-[#F68871] justify-center items-center">
            Deferred
          </h2>
          <ul className="p-4 ">
            {deferredTodos.map((todo, index) => {
              const originalTodoIndex = getIndexFromOriginal(todo);
              return (
                <div
                  className=" bg-gray-100 p-4 mb-4 rounded"
                  key={index}
                  id={`todo-${index}`}
                >
                  <div className=" flex flex-row justify-between items-center pb-2">
                    <div className=" text-2xl font-medium">
                      Task {originalTodoIndex + 1}
                    </div>
                    <div className=" px-2 py-0.5 w-8  bg-[#25689C] text-base text-white ">
                      {todo.todoData.priority}
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div>{todo.todoData.desc}</div>
                  </div>
                  <div className=" my-4 flex flex-row justify-between items-center font-medium ">
                    <div className=" text-black text-1xl max-w-56 flex overflow-auto scrollbar-hide ">
                      @{todo.todoData.assignees}
                    </div>
                    <div className="relative">
                      <button
                        className="w-6 px-1.5 pb-0.5 bg-[#25689C] text-base text-white"
                        onClick={() => handleMiniMenuClick(todo.todoData.id)}
                      >
                        +
                      </button>
                      {openMiniMenuId === todo.todoData.id && (
                        <div className="absolute top-8 right-0 border bg-white border-gray-200 p-2">
                          <div onClick={() => handleEditClick(todo.todoData)}>
                            Edit
                          </div>
                          <div
                            onClick={() =>
                              handleDeleteClick(
                                todo.todoData,
                                originalTodoIndex
                              )
                            }
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" flex w-36 px-1.5 pb-0.5 bg-[#25689C] text-base items-center justify-center text-white rounded ">
                    <div>{todo.todoData.status}</div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
      {showEdit && <EditModal todo={selectedTodo} />}
      {showDelete && (
        <DeleteModal todo={selectedTodo} index={selectedTodoIndex} />
      )}
    </>
  );
};

export default Todos;
