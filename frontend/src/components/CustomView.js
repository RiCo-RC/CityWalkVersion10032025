import { StyleSheet, View } from "react-native";
import { useTheme } from "@/context/ThemeProvider";

const CustomView = ({ children, style }) => {
  const { theme } = useTheme();

  // Styles dynamiques basés sur le thème
  const dynamicStyle = {
    backgroundColor: theme === "dark" ? "#2D46AF" : "#ECF0F1",
  };

  return (
    <View style={[dynamicStyle, style]}>
      {children}
    </View>
  );
};

export default CustomView;

