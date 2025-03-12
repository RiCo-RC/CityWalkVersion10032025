import {useState} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useTheme} from "@/context/ThemeProvider";

const CustomButton = ({
                          children,
                          type = "primary",
                          style,
                          withBackground = true,
                          withBorder = true,
                          onPress = () => {},
                          disabled = false,
                      }) => {
    const {theme} = useTheme();
    const [opacity, setOpacity] = useState(1);

    // Détermination des styles effectifs
    let effectiveBackground = null;
    let effectiveBorder = null;

    if (theme === 'light') {
        if (withBorder && !withBackground) {
            effectiveBorder = 'dark';
        }
        if (withBackground) {
            effectiveBackground = 'dark';
        }
    } else {
        if (withBorder && !withBackground) {
            effectiveBorder = 'light';
        }
        if (withBackground) {
            effectiveBackground = 'light';
        }
    }

    // Styles dynamiques
    const backgroundStyle = effectiveBackground
        ? (effectiveBackground === 'dark' ? styles.backgroundColorDark : styles.backgroundColorLight)
        : {};

    const borderStyle = effectiveBorder
        ? [effectiveBorder === 'dark' ? styles.borderColorDark : styles.borderColorLight, styles.border]
        : {};

    // Couleur du texte
    const textColor = effectiveBackground
        ? (effectiveBackground === 'dark' ? styles.textLight : styles.textDark)
        : (theme === 'light' ? styles.textDark : styles.textLight);

    // Styles par type
    const getComponentStyle = {
        primary: [
            withBackground && backgroundStyle,
            withBorder && borderStyle
        ],
        secondary: [
            withBorder && borderStyle
        ],
        tertiary: [{borderWidth: 0}]
    };

    // Style désactivé
    const disabledStyle = disabled ? {opacity: 0.5} : {};

    return (
        <TouchableOpacity
            style={[styles.base, ...getComponentStyle[type], style, disabledStyle]}
            onPress={disabled ? null : onPress}
            onPressIn={() => !disabled && setOpacity(0.8)}
            onPressOut={() => !disabled && setOpacity(1)}
            disabled={disabled}
        >
            <Text style={[styles.text, textColor]}>{children}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    base: {
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
        padding: 10,
        borderRadius: 8,
    },
    border: {
        borderWidth: 1,
    },
    backgroundColorDark: {
        backgroundColor: "#2D46AF",
    },
    backgroundColorLight: {
        backgroundColor: "#ECF0F1",
    },
    borderColorDark: {
        borderColor: "#2D46AF",
    },
    borderColorLight: {
        borderColor: "#ECF0F1",
    },
    text: {
        fontSize: 14,
        fontFamily: "Montserrat-Bold",
    },
    textLight: {
        color: "#ECF0F1",
    },
    textDark: {
        color: "#2D46AF",
    },
});
