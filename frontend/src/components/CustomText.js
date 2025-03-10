import React from "react";
import { Text, StyleSheet } from "react-native";

import { useTheme } from "../context/ThemeProvider";
import { height, width } from "../utils/variables";

const CustomText = ({
  level = "p", // niveau par défaut
  children,
  style = {},
}) => {
  const { theme } = useTheme();

  // Définir les styles par niveau de texte
  const defStyle = {
    h1: styles.h1,
    h2: styles.h2,
    p: styles.p,
    note: styles.note,
    description: styles.description,
  };

  // Récupération du style pour le niveau de texte
  const getComponentStyle = defStyle[level];

  return (
    <Text
      style={[getComponentStyle, { color: theme === 'dark' ? '#fff' : '#000' }, style]}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
  },
  note: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888", 
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666", 
  },
});