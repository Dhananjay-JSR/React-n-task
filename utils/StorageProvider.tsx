import { createContext, useReducer } from "react";

type Todo = {
  id: number;
  taskName: string;
  dueDate: Date;
  isCompleted: boolean;
};

const initialState: Todo[] = [];

export enum ActionType {
  ADD_TODO = "ADD_TODO",
  UPDATE_TODO_NAME = "UPDATE_TODO_NAME",
  MARK_AS_COMPLETED = "MARK_AS_COMPLETED",
  DELETE_COMPLETED = "DELETE_COMPLETED",
}

type ActionTypeCast = {
  type: ActionType;
  payload: any;
};

const reducer = (state: Todo[], action: ActionTypeCast) => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return [...state, action.payload];
    case ActionType.UPDATE_TODO_NAME:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, taskName: action.payload.taskName }
          : todo
      );
    case ActionType.DELETE_COMPLETED:
      return state.filter((todo) => !todo.isCompleted);
    case ActionType.MARK_AS_COMPLETED:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    default:
      return state;
  }
};

export const TodoContext = createContext<{
  state: Todo[];
  dispatch: React.Dispatch<{
    type: ActionType;
    payload: any;
  }>;
}>(
  {} as {
    state: Todo[];
    dispatch: React.Dispatch<{
      type: ActionType;
      payload: any;
    }>;
  }
);

export default function StorageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
