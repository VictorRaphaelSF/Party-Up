import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Platform,
  Dimensions,
  Pressable,
  TextInput,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Backbutton from "../components/backbutton";
import axios from "axios";

export default function Emailvalidation() {
  const navigation = useNavigation();
  const route = useRoute();
  const [code, setCode] = useState("");
  const [searchText, setSearchText] = useState("");
  const [codeError, setCodeError] = useState(null);

  const handleCode = () => {
    axios
      .post("http://localhost:3003/authCode", {
        code: code,
      })
      .then((e) => {
        setCodeError(false);
        navigation.navigate("login", {
          userImage: route.params.userImage,
        });
      })
      .catch((err) => {
        console.log(err);
        setCodeError(true);
      });
  };

  const InputNum = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  };

  return (
    <ImageBackground
      source={require("../assets/images/telap.png")}
      style={styles.container}
      resizeMode="cover">
      <Backbutton />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Animatable.Image
            animation="fadeInUp"
            source={require("../assets//images/icons/logotwo.png")}
            style={styles.logo}
          />
        </View>

        <Animatable.View animation="fadeInUp">
          <Text style={styles.title}>
            Um código de verificação foi enviado para o endereço de e-mail{" "}
          </Text>
        </Animatable.View>
      </View>

      <Animatable.View delay={700} animation="fadeInUp">
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o código de verificação"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            maxLength={4}
            value={code}
            onChangeText={(text) => InputNum(text, setCode)}
          />
        </View>
      </Animatable.View>

      <Pressable style={styles.button} onPress={handleCode}>
        <Text style={styles.buttonText}>Avançar</Text>
      </Pressable>
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

  content: {
    flex: 1,
    position: "absolute",
    top: 55,
  },

  logo: {
    width: 174,
    height: 170,
    opacity: 0.4,
  },

  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#FFFFFF",
    bottom: 150,
    opacity: 0.8,
  },

  searchBarContainer: {
    alignSelf: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#582C74",
    padding: 12,
    position: "absolute",
    bottom: 400,
    borderRadius: 10,
  },

  searchInput: {
    color: "#FFFFFF",
    fontSize: 16,
    width: "100%",
    flex: 1,
    borderRadius: 5,
    textAlign: "center",
    outlineWidth: 0,
  },

  button: {
    position: "absolute",
    backgroundColor: "rgba(255, 1, 108, 0.50)",
    paddingVertical: 14,
    paddingHorizontal: 100,
    alignSelf: "center",
    borderRadius: 10,
    bottom: Platform.OS === "web" ? 50 : 160,
  },

  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.7,
  },
});
