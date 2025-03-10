import { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../context/ThemeProvider";
import { height } from "../utils/variables";

import { CustomInput, CustomButtonText, Header } from "../components";

import {
  createBuilding,
  getOneCityByName,
  fetchCityCoordinates,
  createCity,
} from "../utils/apiRouter";

const AddBuildingScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [constructionYear, setConstructionYear] = useState("");
  const [architect, setArchitect] = useState("");
  const [cityName, setCityName] = useState("");

  const getViewBackgroundColorStyle =
    theme === "dark" ? styles.containerDark : styles.containerLight;

  const handleAddBuilding = async () => {
    setLoading(true);
    try {
      let city = await getOneCityByName(cityName);
      console.log("city2", city);
      if (!city.city) {
        const cityData = await fetchCityCoordinates(cityName);
        city = await createCity({
          name: cityData.name,
          latitude: cityData.latitude,
          longitude: cityData.longitude,
        });
      }

      if (city.city) {
        console.log("1", city.city.id, city.city.name);
        const building = {
          name,
          // address,
          latitude: latitude,
          longitude: longitude,
          // type,
          description,
          // constructionYear,
          // architect,
          city: city.city,
        };
        await createBuilding(building);
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error adding building:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.container, getViewBackgroundColorStyle]}>
              <Header />
              <View style={[styles.containerContent]}>
                <View style={[styles.containerForm]}>
                  <CustomInput
                    placeholder="Building Name"
                    value={name}
                    onChangeText={setName}
                  />
                  {/* <CustomInput
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                  /> */}
                  <CustomInput
                    placeholder="Latitude"
                    value={latitude}
                    onChangeText={setLatitude}
                    keyboardType="numeric"
                  />
                  <CustomInput
                    placeholder="Longitude"
                    value={longitude}
                    onChangeText={setLongitude}
                    keyboardType="numeric"
                  />
                  {/* <CustomInput
                    placeholder="Type"
                    value={type}
                    onChangeText={setType}
                  /> */}
                  <CustomInput
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                  />
                  {/* <CustomInput
                    placeholder="Construction Year"
                    value={constructionYear}
                    onChangeText={setConstructionYear}
                  /> */}
                  {/* <CustomInput
                    placeholder="Architect"
                    value={architect}
                    onChangeText={setArchitect}
                  /> */}
                  <CustomInput
                    placeholder="City Name"
                    value={cityName}
                    onChangeText={setCityName}
                  />
                </View>
                <View style={[styles.containerButtons]}>
                  <CustomButtonText
                    type="primary"
                    onBackground={true}
                    withBackground={true}
                    withBorder={true}
                    buttonStyle={styles.button}
                    onPress={handleAddBuilding}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Building"}
                  </CustomButtonText>
                  <CustomButtonText
                    type="secondary"
                    onBackground={false}
                    withBackground={false}
                    withBorder={true}
                    buttonStyle={styles.button}
                    onPress={() => navigation.goBack()}
                  >
                    {loading ? "Adding..." : "Go back"}
                  </CustomButtonText>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddBuildingScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
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
    justifyContent: "center",
    width: "100%",
    paddingTop: Math.min(60, height * 0.1),
  },
  containerForm: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  containerButtons: {
    alignItems: "center",
    gap: 10,
    height: 200,
    justifyContent: "center",
    width: "100%",
  },
  button: {
    height: 60,
    width: "90%",
  },
});
