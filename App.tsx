import { ScrollView, StyleSheet } from "react-native";
import StorageProvider from "./utils/StorageProvider";
import { ViewMapper } from "./Components/ViewMapper";
// ignore ts error
declare module "react-native" {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
}

export default function App() {
  return (
    <StorageProvider>
      <ViewMapper />
    </StorageProvider>
  );
}
