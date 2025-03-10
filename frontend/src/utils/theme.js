import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadTheme = async (defaultTheme) => {
  try {
    const savedTheme = await AsyncStorage.getItem("theme");
    // return "dark" || defaultTheme;
    return savedTheme || defaultTheme;
  } catch (error) {
    console.error("Erreur lors du chargement du thème :", error);
    return defaultTheme;
  }
};

export const saveTheme = async (themeMode) => {
  try {
    await AsyncStorage.setItem(
      "theme",
      themeMode === "dark" ? "dark" : "light"
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du thème :", error);
  }
};
