import {
  ADD_TODO,
  EDIT_TODO,
  TODO_SEARCH,
  TODO_FILTER,
  TODO_DELETE,
  SORT_BY_DATE,
  SORT_BY_PRIORITY,
  RESET_SORT,
} from "./actionTypes";

export const addTodo = (todoData) => ({
  type: ADD_TODO,
  payload: { todoData },
});

export const editTodo = (id, updatedTodo) => ({
  type: EDIT_TODO,
  payload: { id, updatedTodo },
});

export const filterTodo = (filter) => ({
  type: TODO_FILTER,
  payload: { filter },
});

export const searchTodo = (search) => ({
  type: TODO_SEARCH,
  payload: { search },
});

export const deleteTodo = (id) => ({
  type: TODO_DELETE,
  payload: {
    id,
  },
});

export const sortByDate = () => ({
  type: SORT_BY_DATE,
});

export const sortByPriority = () => ({
  type: SORT_BY_PRIORITY,
});

export const resetSort = () => ({
  type: RESET_SORT,
});
