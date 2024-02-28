import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
  FlatList,
  Pressable,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Alert,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { Svg, Path } from "react-native-svg";
import StorageProvider, {
  ActionType,
  TodoContext,
} from "./utils/StorageProvider";
// ignore ts error
declare module "react-native" {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
}

function TodoItems({
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

function Header({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StatusBar style="light" />
      <View className="h-24 w-full pt-6  flex flex-row bg-gray-100">
        {children}
      </View>
    </>
  );
}

function ModalPicker({
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

function EditModal({
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

export default function App() {
  return (
    <StorageProvider>
      <ViewMapper />
    </StorageProvider>
  );
}

export function ViewMapper() {
  const [showModal, setShowModal] = useState(false);

  const [modalType, setModalType] = useState<{
    type: "add" | "edit" | "delete";
    id?: number;
  }>({
    type: "add",
  });

  const { state, dispatch } = useContext(TodoContext);

  const [sortState, setSortState] = useState<"date" | "status" | null>(null);

  return (
    <SafeAreaView className=" bg-white flex-1 ">
      {showModal && (
        <>
          {modalType.type == "add" && (
            <ModalPicker setShowModal={setShowModal} />
          )}
          {modalType.type == "edit" && (
            <EditModal setShowModal={setShowModal} id={modalType.id} />
          )}
        </>
      )}
      <Header>
        <View className="w-1/2">
          <Text className="text-4xl font-bold text-black p-4">Todo</Text>
        </View>
        <View className="w-1/2 flex-1 justify-center items-end mr-4">
          <Pressable
            onPress={() => {
              setShowModal(true);
              setModalType({
                type: "add",
              });
            }}
            className=" border h-9 w-9 justify-center items-center rounded-full"
          >
            <Text className="text-3xl">+</Text>
          </Pressable>
        </View>
      </Header>

      {state.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold">No Task Found</Text>
        </View>
      ) : (
        <>
          <View className="h-10 w-full  flex-row justify-between my-2 px-2 ">
            <Pressable
              className={`px-2 py-0.5 border justify-center ${
                sortState === "date" ? "bg-gray-200" : "bg-white"
              }`}
              onPress={() => {
                if (sortState === "date") {
                  setSortState(null);
                } else {
                  setSortState("date");
                }
              }}
            >
              <Text>SORT BY DATE</Text>
            </Pressable>
            <Pressable
              className={`px-2 py-0.5 border justify-center ${
                sortState === "status" ? "bg-gray-200" : "bg-white"
              }`}
              onPress={() => {
                if (sortState === "status") {
                  setSortState(null);
                } else {
                  setSortState("status");
                }
              }}
            >
              <Text>SORT BY STATUS</Text>
            </Pressable>
          </View>
          <View className="h-10 w-full  flex-row justify-center mb-2 px-2 ">
            <Pressable
              onPress={() => {
                Alert.alert(
                  "Delete Completed Task",
                  "Are you sure you want to delete all completed task?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        dispatch({
                          type: ActionType.DELETE_COMPLETED,
                          payload: null,
                        });
                      },
                    },
                  ]
                );
              }}
              className="px-2 py-0.5 border justify-center"
            >
              <Text>DELETE COMPLETED</Text>
            </Pressable>
          </View>

          <FlatList
            className="px-4 pt-4 mt-1 "
            contentContainerStyle={{
              paddingBottom: 10,
            }}
            data={state.sort((a, b) => {
              if (sortState === "date") {
                return a.dueDate.getTime() - b.dueDate.getTime();
              }
              if (sortState === "status") {
                return a.isCompleted === b.isCompleted
                  ? 0
                  : a.isCompleted
                  ? 1
                  : -1;
              }

              return 0;
            })}
            renderItem={({ item }) => (
              <TodoItems
                id={item.id}
                key={item.id}
                dueDate={item.dueDate}
                isCompleted={item.isCompleted}
                taskName={item.taskName}
                setModalType={setModalType}
                setShowModal={setShowModal}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </SafeAreaView>
  );
}
