import { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
type Todo = {
  id: number;
  taskName: string;
  dueDate: Date;
  isCompleted: boolean;
};

const storeData = async (value: Todo[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("todo-key", jsonValue);
  } catch (e) {
    console.error(e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("todo-key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

const initialState: Todo[] = [];

export enum ActionType {
  ADD_TODO = "ADD_TODO",
  UPDATE_TODO_NAME = "UPDATE_TODO_NAME",
  MARK_AS_COMPLETED = "MARK_AS_COMPLETED",
  DELETE_COMPLETED = "DELETE_COMPLETED",
  REPLACE_TODO = "REPLACE_TODO",
}

type ActionTypeCast = {
  type: ActionType;
  payload: any;
};

const reducer = (state: Todo[], action: ActionTypeCast) => {
  switch (action.type) {
    case ActionType.REPLACE_TODO:
      return action.payload;
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) {
        const parsedData = data as Todo[];
        dispatch({ type: ActionType.REPLACE_TODO, payload: parsedData });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      await storeData(state);
    };

    saveData();
  }, [state]);
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
