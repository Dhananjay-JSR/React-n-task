import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// ignore ts error
declare module "react-native" {
  interface ViewProps {
    className?: string;
  }
}

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-yellow-300">
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
