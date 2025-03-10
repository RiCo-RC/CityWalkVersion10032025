import { useState } from "react";
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../context/ThemeProvider";
import { height } from "../utils/variables";

import { CustomInput, CustomButtonText, CustomButtonLink, Header } from "../components";

import { registerUser } from "../utils/apiRouter";

const RegisterScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const getViewBackgroundColorStyle =
    theme === "dark" ? styles.containerDark : styles.containerLight;

  const validateForm = () => {
    let isValid = true;
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validation du prénom
    if (!firstName) {
      setFirstNameError("First name is required");
      isValid = false;
    }

    // Validation du nom de famille
    if (!lastName) {
      setLastNameError("Last name is required");
      isValid = false;
    }

    // Validation de l'email
    if (!email.includes("@")) {
      setEmailError("Invalid email address");
      isValid = false;
    }

    // Validation du nom d'utilisateur
    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    }

    // Validation du mot de passe
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    // Validation de la confirmation du mot de passe
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      setLoading(true);
      console.log("Registering:", { firstName, lastName, email, username, password });

      try {
        const user = { firstName, lastName, email, username, password };
  
        const response = await registerUser(user);
        console.log("API answer:", response);
  
        if (response.message === 'User already exists') {
          setLoading(false);
          return;
        }
  
        if (response.message === 'User created successfully' && response.user) {
          console.log("Retrieved user:", response.user);
          await AsyncStorage.setItem("user", JSON.stringify(response.user));
          navigation.navigate('Main', { screen: 'HomeScreen', params: { user: user}});
        }
      } catch (error) {
        console.log("Registration error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={[styles.container, getViewBackgroundColorStyle]}>
              <Header />
              <View style={[styles.containerContent]}>
                <View style={[styles.containerForm]}>
                  <CustomInput
                    placeholder="First name..."
                    type="text"
                    value={firstName}
                    onChangeText={setFirstName}
                    error={firstNameError}
                  />
                  <CustomInput
                    placeholder="Last name..."
                    type="text"
                    value={lastName}
                    onChangeText={setLastName}
                    error={lastNameError}
                  />
                  <CustomInput
                    placeholder="Email..."
                    type="email"
                    value={email}
                    onChangeText={setEmail}
                    error={emailError}
                  />
                  <CustomInput
                    placeholder="Username..."
                    type="text"
                    value={username}
                    onChangeText={setUsername}
                    error={usernameError}
                  />
                  <CustomInput
                    placeholder="Password..."
                    type="password"
                    value={password}
                    onChangeText={setPassword}
                    error={passwordError}
                  />
                  <CustomInput
                    placeholder="Confirm password..."
                    type="password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    error={confirmPasswordError}
                  />
                </View>
                <View style={[styles.containerButtons]}>
                  <CustomButtonText
                    type="primary"
                    onBackground={true}
                    withBackground={true}
                    withBorder={true}
                    buttonStyle={styles.button}
                    onPress={handleRegister}
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Join the community"}
                  </CustomButtonText>
                  <CustomButtonLink
                    text="Already have an account?"
                    linkText="Login!"
                    type="primary"
                    onPress={() => navigation.navigate("Main", { screen: "HomeScreen" })}
                  />
                </View>
              </View>
              <View style={[styles.containerBack, getViewBackgroundColorStyle]}>
                <CustomButtonText
                  type="tertiary"
                  onBackground={false}
                  withBackground={false}
                  withBorder={true}
                  buttonStyle={styles.button2}
                  onPress={() => navigation.navigate("Main", { screen: "HomeScreen" })}
                >
                  Go back
                </CustomButtonText>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  containerLight: {
    backgroundColor: "#ECF0F1",
  },
  containerDark: {
    backgroundColor: "#2D46AF",
  },
  containerContent: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    width: "100%",
    paddingTop: Math.min(60, height * 0.1),
  },
  containerForm: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  containerButtons: {
    alignItems: "center",
    gap: 10,
    height: 200,
    justifyContent: "center",
    width: "100%",
  },
  containerBack: {
    alignItems: "center",
    height: height * 0.08,
    justifyContent: "center",
    width: "100%",
  },
  button: {
    height: 60,
    width: "90%",
  },
  button2: {
    width: "90%",
  },
});