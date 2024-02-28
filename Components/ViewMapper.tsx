import { useContext, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
  Alert,
} from "react-native";
import { TodoContext, ActionType } from "../utils/StorageProvider";
import { AddModal } from "./AddModal";
import { EditModal } from "./EditModal";
import { Header } from "./Header";
import { TodoItems } from "./TodoItems";

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
          {modalType.type == "add" && <AddModal setShowModal={setShowModal} />}
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
                dueDate={new Date(item.dueDate)}
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
