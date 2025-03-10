import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import { ThemeProvider } from "./src/context/ThemeProvider";
import AppNavigator from "./src/navigation/StackNavigator";

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar hidden={false} />
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
