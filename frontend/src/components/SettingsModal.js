import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useTheme } from "../context/ThemeProvider";

import CustomText from "./CustomText";
import CustomButtonText from "./CustomButtonText";

const SettingsModal = ({ visible, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            theme === "dark" ? styles.dark : styles.light,
          ]}
        >
          <CustomText style={styles.title}>Settings</CustomText>

          {/* Affichage de la langue actuelle (décoratif) */}
          <View style={styles.option}>
            <CustomText>Language</CustomText>
            <View style={styles.languageBadge}>
              <CustomText style={styles.optionText}>EN</CustomText>
            </View>
          </View>

          {/* Changement de mode du thème */}
          <View style={styles.option}>
            <CustomText>Dark Mode</CustomText>
            <Switch value={theme === "dark"} onValueChange={toggleTheme} />
          </View>

          {/* Connexion / Déconnexion */}
          <CustomButtonText
            type="primary"
            onPress={handleAuth}
            onBackground={true}
            withBackground={true}
            withBorder={true}
            buttonStyle={styles.button}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </CustomButtonText>

          {/* Fermer la modal */}
          <CustomButtonText
            type="secondary"
            onBackground={false}
            withBackground={false}
            withBorder={true}
            onPress={onClose}
            buttonStyle={styles.button}
          >
            Close
          </CustomButtonText>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  dark: {
    backgroundColor: "#2D46AF",
  },
  light: {
    backgroundColor: "#ECF0F1",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  languageBadge: {
    backgroundColor: "#FFF",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  optionText: {
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    marginTop: 15,
    width: "100%",
  },
});
