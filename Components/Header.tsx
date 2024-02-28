import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StatusBar style="light" />
      <View className="h-24 w-full pt-6  flex flex-row bg-gray-100">
        {children}
      </View>
    </>
  );
}
