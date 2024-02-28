import { useContext, useState } from "react";
import { Pressable, TextInput, Text, View } from "react-native";
import { TodoContext, ActionType } from "../utils/StorageProvider";

export function EditModal({
  id,
  setShowModal,
}: {
  id?: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { dispatch, state } = useContext(TodoContext);
  const GetDetail = state.find((item) => item.id === id);
  const [taskName, setTaskName] = useState(GetDetail?.taskName);
  return (
    <View className="bg-black/80 absolute top-0 left-0 w-full h-full z-10 flex-1 justify-center items-center">
      <View className="w-4/5 flex items-center justify-center  bg-white relative rounded-sm min-h-[250]">
        <Text className="mb-2 text-2xl underline">Update Task</Text>
        <TextInput
          value={taskName}
          onChangeText={setTaskName}
          className="border w-4/5 px-4 h-10 mb-6 rounded-sm"
          placeholder="Enter Task Name"
        />
        <Pressable
          onPress={() => {
            dispatch({
              type: ActionType.UPDATE_TODO_NAME,
              payload: {
                id: id,
                taskName: taskName,
              },
            });
            setShowModal(false);
          }}
          className=" w-fit items-center justify-center px-2 bg-blue-800   h-10 rounded-sm"
        >
          <Text className="text-white font-medium">Update Task</Text>
        </Pressable>
      </View>
    </View>
  );
}
