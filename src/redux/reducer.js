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

const initialState = {
  todos: [],
  originalTodos: [],
  filter: "ALL",
  search: "",
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { todoData: action.payload.todoData }],
        originalTodos: [
          ...state.originalTodos,
          { todoData: action.payload.todoData },
        ],
      };

    case EDIT_TODO:
      const updatedTodos = state.todos.map((todo) =>
        todo.todoData.id === action.payload.id
          ? { todoData: action.payload.updatedTodo }
          : todo
      );
      const updatedOriginalTodos = state.originalTodos.map((todo) =>
        todo.todoData.id === action.payload.id
          ? { todoData: action.payload.updatedTodo }
          : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        originalTodos: updatedOriginalTodos,
      };

    case TODO_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      };

    case TODO_SEARCH:
      return {
        ...state,
        search: action.payload.search,
      };

    case TODO_DELETE:
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.todoData.id !== action.payload.id
        ),
        originalTodos: state.originalTodos.filter(
          (todo) => todo.todoData.id !== action.payload.id
        ),
      };

    case SORT_BY_DATE:
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        }),
      };

    case SORT_BY_PRIORITY:
      return {
        ...state,
        todos: sortTodosByPriority([...state.todos]),
      };

    case RESET_SORT:
      return {
        ...state,
        todos: [...state.originalTodos],
      };

    default:
      return state;
  }
};

const sortTodosByPriority = (todos) => {
  return todos.slice().sort((a, b) => {
    const priorityOrder = { P0: 0, P1: 1, P2: 2 };
    const priorityA = priorityOrder[a.todoData.priority];
    const priorityB = priorityOrder[b.todoData.priority];
    return priorityA - priorityB;
  });
};

export default todoReducer;
