import { useContext } from "react";
import { Pressable, Text, View, ToastAndroid } from "react-native";
import { Svg, Path } from "react-native-svg";
import { TodoContext, ActionType } from "../utils/StorageProvider";

export function TodoItems({
  setModalType,
  setShowModal,
  id,
  dueDate,
  isCompleted,
  taskName,
}: {
  setModalType: React.Dispatch<
    React.SetStateAction<{
      type: "add" | "edit" | "delete";
      id?: number;
    }>
  >;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  taskName: string;
  dueDate: Date;
  isCompleted: boolean;
}) {
  const { dispatch } = useContext(TodoContext);
  return (
    <View
      className={`w-full h-32 mb-3  border  rounded-sm relative ${
        isCompleted ? "border-gray-200" : "border-gray-400"
      }`}
    >
      <Pressable
        className="absolute right-2 top-2 "
        onPress={() => {
          setShowModal(true);
          setModalType({
            type: "edit",
            id: id,
          });
        }}
      >
        <Svg
          width={16}
          height={16}
          fill={isCompleted ? "gray" : "#000"}
          viewBox="0 0 16 16"
        >
          <Path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <Path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </Svg>
      </Pressable>

      <View className="flex-1 flex-row justify-between items-center h-full p-4">
        <View className="flex flex-col">
          <Text
            className={`text-lg font-bold ${
              isCompleted ? "text-gray-200" : "text-black"
            }`}
          >
            {taskName}
          </Text>
          <Text
            className={`text-sm font-bold ${
              isCompleted ? "text-gray-200" : "text-black"
            }`}
          >
            {dueDate.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>
        <View className="flex flex-col items-center">
          <Pressable
            onPress={() => {
              if (isCompleted) {
                ToastAndroid.show("Task Completed", 2000);
              } else {
                dispatch({
                  type: ActionType.MARK_AS_COMPLETED,
                  payload: {
                    id: id,
                  },
                });
              }
            }}
            className={`w-6 h-6 active:bg-green-300 transition-all rounded-full border border-gray-400 ${
              isCompleted ? "bg-gray-200" : "bg-white"
            }`}
          />
        </View>
      </View>
    </View>
  );
}
