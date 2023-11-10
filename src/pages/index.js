import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";

export default function Index({ navigation }) {
  const VamosLa = () => {
    navigation.navigate("login");
  };

  return (
    <ImageBackground
      source={require("../assets/images/telap.png")}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Animatable.Image
            animation="fadeInUp"
            source={require("../assets/images/logonv.png")}
            style={styles.logo}
          />
        </View>

        <Animatable.View
          delay={700}
          animation="fadeInUp"
          style={styles.vamosLaButton}>
          <Pressable style={styles.button} onPress={VamosLa}>
            <Text style={styles.buttonText}>Vamos lá</Text>
          </Pressable>
        </Animatable.View>
      </View>
    </ImageBackground>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.01)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#95003F",
    paddingVertical: 14,
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: windowHeight * 0.04,
  },

  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.9,
  },

  logo: {
    width: 270,
    height: 270,
    opacity: 0.5,
  },

  vamosLaButton: {
    position: "absolute",
    bottom: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
