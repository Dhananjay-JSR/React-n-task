import { useContext, useState } from "react";
import { Pressable, TextInput, Text, View, ToastAndroid } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { ActionType, TodoContext } from "../utils/StorageProvider";

export function AddModal({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { dispatch, state } = useContext(TodoContext);
  const [date, setDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [taskName, setTaskName] = useState("");
  return (
    <View className="bg-black/80 absolute top-0 left-0 w-full h-full z-10 flex-1 justify-center items-center">
      <View className="w-4/5 flex items-center justify-center  bg-white relative rounded-sm min-h-[250]">
        {showDatePicker ? (
          <DateTimePicker
            mode="single"
            date={date}
            onChange={(params) => {
              if (params && params.date) {
                setShowDatePicker(false);
                setDate(params.date as dayjs.Dayjs);
              }
            }}
          />
        ) : (
          <>
            <Pressable
              onPress={() => {
                setShowModal(false);
              }}
              className=" border h-9 w-9 justify-center items-center absolute top-2 right-2 rounded-full"
            >
              <Text className="text-3xl">X</Text>
            </Pressable>
            <Text className="text-2xl mb-2 underline">Task Name</Text>
            <TextInput
              value={taskName}
              onChangeText={setTaskName}
              className="border w-4/5 px-4 h-10 mb-6 rounded-sm"
              placeholder="Enter Task Name"
            />
            <Pressable
              onPress={() => {
                setShowDatePicker(true);
                setIsTouched(true);
              }}
              className={`w-fit items-center mb-2 justify-center px-2    h-10 rounded-sm ${
                !isTouched ? "bg-blue-600" : "bg-white"
              }`}
            >
              <Text
                className={` font-medium ${
                  !isTouched ? "text-white" : "text-black"
                }`}
              >
                {!isTouched ? "Pick Up Due Date" : date.format("MMM DD, YYYY")}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (!isTouched || !taskName) {
                  if (!isTouched) {
                    ToastAndroid.show("Please Pick Up Due Date", 2000);
                  }
                  if (!taskName) {
                    ToastAndroid.show("Please Enter Task Name", 2000);
                  }
                  return;
                }
                dispatch({
                  type: ActionType.ADD_TODO,
                  payload: {
                    id: state.length + 1,
                    taskName: taskName,
                    dueDate: date.toDate(),
                    isCompleted: false,
                  },
                });
                setShowModal(false);
              }}
              className=" w-fit items-center justify-center px-2 bg-blue-800   h-10 rounded-sm"
            >
              <Text className="text-white font-medium">Add to Task</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}
