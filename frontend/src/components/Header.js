import {useState} from "react";
import {Image, StyleSheet, View} from "react-native";

import {useTheme} from "@/context/ThemeProvider";
import {height, width} from "@/utils/variables";

import logoImageDark from "@assets/dark/logo.png";
import logoImageLight from "@assets/light/logo.png";

import SettingsModal from "./SettingsModal";
import CustomButtonIcon from "./CustomButtonIcon";

const Header = () => {
    const {theme} = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    // Récupération du style
    const getImageSource = theme === "dark" ? logoImageDark : logoImageLight;

    return (
        <View style={[styles.container]}>
            <Image source={getImageSource} style={[styles.image]}/>

            {/* Bouton pour ouvrir le modal */}
            <CustomButtonIcon
                type="primary"
                withBackground={false}
                icon="settings"
                style={styles.button}
                onPress={() => setModalVisible(true)}
            />

            {/* Modal des paramètres */}
            <SettingsModal visible={modalVisible} onClose={() => setModalVisible(false)}/>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        height: Math.min(60, height * 0.1),
        justifyContent: "space-between",
        left: 0,
        paddingHorizontal: 15,
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 10,
    },
    image: {
        height: "100%",
        width: Math.min(100, width * 0.5),
        resizeMode: "contain",
    },
    button: {
        width: Math.min(60, width * 0.2),
        height: "100%",
    },
});
