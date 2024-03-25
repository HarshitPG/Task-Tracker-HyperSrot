import React, { createContext, useState } from "react";

export const Context = createContext(null);

export const ContextProvider = (props) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);
  const [openMiniMenuId, setOpenMiniMenuId] = useState(null);

  const contextValue = {
    showAdd,
    setShowAdd,
    showEdit,
    setShowEdit,
    showDelete,
    setShowDelete,
    selectedTodoIndex,
    setSelectedTodoIndex,
    openMiniMenuId,
    setOpenMiniMenuId,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
