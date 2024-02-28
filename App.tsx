import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { Svg, Path } from "react-native-svg";
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
  dueDate,
  isCompleted,
  taskName,
}: {
  taskName: string;
  dueDate: Date;
  isCompleted: boolean;
}) {
  return (
    <View className="w-full h-32 mb-3 border border-gray-400 rounded-sm relative">
      <Pressable
        className="absolute right-2 top-2"
        onPress={() => {
          alert("Editing Task");
        }}
      >
        <Svg width={16} height={16} fill="#000" viewBox="0 0 16 16">
          <Path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <Path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </Svg>
      </Pressable>

      <View className="flex-1 flex-row justify-between items-center h-full p-4">
        <View className="flex flex-col">
          <Text className="text-lg font-bold">{taskName}</Text>
          <Text className="text-sm">
            {dueDate.toDateString()} {dueDate.toTimeString()}
          </Text>
        </View>
        <View className="flex flex-col items-center">
          <Pressable
            onPress={() => {
              alert("Task Completed");
            }}
            className="w-6 h-6 active:bg-blue-400 transition-all rounded-full border border-gray-400"
          />
        </View>
      </View>
    </View>
  );
}

const SampleTodoItems = [
  {
    id: 1,
    taskName: "Buy ToothPaste",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 2,
    taskName: "Buy Colgate",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 3,
    taskName: "Go Gym",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 4,
    taskName: "Eat Healthy",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 5,
    taskName: "Bring Gifts",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 6,
    taskName: "Buy ToothPaste",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 7,
    taskName: "Buy Colgate",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 8,
    taskName: "Go Gym",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 9,
    taskName: "Eat Healthy",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 10,
    taskName: "Bring Gifts",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 11,
    taskName: "Buy ToothPaste",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 12,
    taskName: "Buy Colgate",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 13,
    taskName: "Go Gym",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 14,
    taskName: "Eat Healthy",
    dueDate: new Date(),
    isCompleted: false,
  },
  {
    id: 15,
    taskName: "Bring Gifts",
    dueDate: new Date(),
    isCompleted: false,
  },
];

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
  const [date, setDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
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
              className="border w-4/5 px-4 h-10 mb-6 rounded-sm"
              placeholder="Enter Task Name"
            />
            <Pressable
              onPress={() => {
                setShowDatePicker(true);
                setIsTouched(true);
              }}
              className=" w-fit items-center mb-2 justify-center px-2 bg-blue-600   h-10 rounded-sm"
            >
              <Text className="text-white font-medium">Pick Up Due Date</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (!isTouched) {
                  ToastAndroid.show("Please select Due Date", 2000);
                  return;
                }
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

export default function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaView className=" bg-white flex-1">
      {showModal && <ModalPicker setShowModal={setShowModal} />}
      <Header>
        <View className="w-1/2">
          <Text className="text-4xl font-bold text-black p-4">Todo</Text>
        </View>
        <View className="w-1/2 flex-1 justify-center items-end mr-4">
          <Pressable
            onPress={() => {
              setShowModal(true);
            }}
            className=" border h-9 w-9 justify-center items-center rounded-full"
          >
            <Text className="text-3xl">+</Text>
          </Pressable>
        </View>
      </Header>

      {/* <FlatList
        className="px-4"
        data={SampleTodoItems}
        renderItem={({ item }) => (
          <TodoItems
            key={item.id}
            dueDate={item.dueDate}
            isCompleted={item.isCompleted}
            taskName={item.taskName}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
