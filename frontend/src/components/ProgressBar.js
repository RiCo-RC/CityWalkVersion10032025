import React, { useState, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

import { useTheme } from "../context/ThemeProvider";
import { height, width } from '../utils/variables';

import CustomText from './CustomText';

const ProgressBar = () => {
  const { theme } = useTheme();
  const [progress] = useState(new Animated.Value(0)); 
  const [percentage, setPercentage] = useState(0);

  // Styles dynamiques
  const getBackgroundColorStyle = theme === 'dark' ? styles.containerDark : styles.containerLight;
  const getAnimatedViewBackgroundColorStyle = theme === 'dark' ? styles.animatedDark : styles.animatedLight;
  const getTextColorStyle = theme === 'dark' ? styles.textDark : styles.textLight;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false, // Ne supporte pas la largeur, donc `false`
    }).start();

    // Écouteur pour suivre la progression
    const progressListener = progress.addListener(({ value }) => {
      setPercentage(Math.round(value * 100));
    });

    // Nettoyage à la fin
    return () => {
      progress.removeListener(progressListener); 
    };
  }, [progress]);

  return (
    <View style={[styles.container, getBackgroundColorStyle]}>
      <Animated.View
        style={[
          styles.animated,
          getAnimatedViewBackgroundColorStyle,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      >
      </Animated.View>
      <CustomText level='p' style={[styles.text, getTextColorStyle]}>{percentage}%</CustomText>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  //--- VIEW ----\\
  container: {
    alignItems: 'center',
    gap: 10,
    height: 40,
    justifyContent: 'center',
    marginVertical: 10,
    maxWidth: width * 0.95,
    width: width * 0.9,
  },
  containerLight: {
    backgroundColor: "#ECF0F1",
  },
  containerDark: {
    backgroundColor: "#2D46AF",
  },
  //--- BAR ----\\
  animated: {
    height: 20,
    maxWidth: width * 0.95,
    width: '0%',
  },
  animatedDark: {
    backgroundColor: '#ECF0F1',
  },
  animatedLight: {
    backgroundColor: '#007BFF',
  },
  //--- TYPOGRAPHY ---\\
  text: {
    fontSize: 14,
    fontFamily: "Montserrat-bold",
  },
  textLight: {
    color: "#2D46AF",
  },
  textDark: {
    color: "#ECF0F1",
  },
});