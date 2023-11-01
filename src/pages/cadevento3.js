import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Platform,
  Dimensions,
  Pressable,
} from "react-native";
import * as Animatable from "react-native-animatable";

export default function Cadevento3() {
  return (
    <ImageBackground
      source={require("../assets/images/telap.png")}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.overlay}></View>
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
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
