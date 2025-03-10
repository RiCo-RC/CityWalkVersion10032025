import React from "react";
import { Image, StyleSheet } from "react-native";

import { useTheme } from "../context/ThemeProvider";
import { height, width } from "../utils/variables";

import loadingImageDark from "../../assets/dark/loading.png";
import loadingImageLight from "../../assets/light/loading.png";

import logoImageDark from "../../assets/dark/logo.png";
import logoImageLight from "../../assets/light/logo.png";

import settingsDark from "../../assets/dark/settings.png";
import settingsLight from "../../assets/light/settings.png";

const CustomIcon = ({
  icon = "loading",
  onBackground = false, // Maintenant un booléen
  style = {},
}) => {
  const { theme } = useTheme();

  // Définition du style
  const defStyle = {
    loading: styles.loading,
    settings: styles.settings,
  };

  // Récupération du style
  const getComponentStyle = defStyle[icon];

  // Définition de la source avec un booléen
  const defSource = {
    dark: {
      loading: onBackground ? loadingImageLight : loadingImageDark,
      logo: onBackground ? logoImageLight : logoImageDark,
      settings: onBackground ? settingsLight : settingsDark,
    },
    light: {
      loading: onBackground ? loadingImageDark : loadingImageLight,
      logo: onBackground ? logoImageDark : logoImageLight,
      settings: onBackground ? settingsDark : settingsLight,
    },
  };

  // Récupération de la source
  const getSource = defSource[theme][icon];

  return (
    <Image 
      source={getSource}
      style={[styles.base, getComponentStyle, style]}
    />
  );
};

export default CustomIcon;

const styles = StyleSheet.create({
  base: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  loading: {
    width: width * 0.9,
    height: height * 0.25,
    resizeMode: "contain",
  },
  settings: {
    height: "100%",
    width: 40,
  },
});