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

export default function Forgotpassword() {
  const navigation = useNavigation();
  const route = useRoute();
  const [code, setCode] = useState("");
  const [erro, setErro] = useState("");
  const [emailValido, setEmailValido] = useState(true);
  const [emailInvalido, setEmailInvalido] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [codeError, setCodeError] = useState(null);

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCode = () => {
    if (
        !emailValido 
    ) {
        setErro("Preencha todos os campos obrigatórios");
      setTimeout(() => {
        setErro("");
    }, 4000);
    } else {
        setErro("");
        // navigation.navigate("cadastropart2", { userData });
    }
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
            Digite o e-mail para requisição de uma nova senha{" "}
          </Text>
        </Animatable.View>
      </View>
      {emailInvalido && (
        <Animatable.View
          style={[
            styles.errorBanner,
            {
              display: emailInvalido ? "flex" : "none",
              borderRadius: 10,
              marginTop: emailInvalido ? 20 : 0,
            },
          ]}
          animation="shake"
          iterationCount={1}
          duration={800}>
          <Text style={styles.errorMessage}>
            O E-mail inserido não é válido.
          </Text>
        </Animatable.View>
      )}
      <Animatable.View delay={700} animation="fadeInUp">
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o e-mail"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            maxLength={100}
            value={code}
            onChangeText={setCode}
            onBlur={() => {
                setEmailValido(validarEmail(code));
                setEmailInvalido(!validarEmail(code));
              }}
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

  errorBanner: {
    backgroundColor: "#FF0000",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 12,
    left: 0,
    right: 0,
  },

  errorMessage: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
