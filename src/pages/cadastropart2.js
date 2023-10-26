import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Platform,
  Dimensions,
  TextInput,
  ImageBackground,
} from "react-native";

import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Logado({ route }) {
  const [nmusuario, setNmusuario] = useState("");
  const [descrição, setDescrição] = useState("");
  const [erro, setErro] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const [imageData, setImageData] = useState("");

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageB64 = result.assets[0].base64;
      setImage(result.assets[0].uri);
      setImageData(imageB64);
    }

    console.log(result.assets[0].base64);
  };

  const backbutton = () => {
    navigation.goBack();
  };

  const renderCaracteresRestantes = () => {
    const caracteresRestantes = 255 - descrição.length;
    const corCaracteres =
      caracteresRestantes === 0 ? "#FF0000" : "rgba(255, 255, 255, 0.5)";
    return <Text style={{ color: corCaracteres }}>{caracteresRestantes}</Text>;
  };

  const userData = route.params.userData;

  // // adicionando mais dados no objeto do cliente
  userData["nmUser"] = nmusuario;
  userData["descricao"] = descrição;
  userData["imgData"] = imageData;

  const handleVamosLaPress = () => {
    if (!nmusuario || !descrição || !image) {
      setErro("Preencha todos os campos obrigatórios.");
      setTimeout(() => {
        setErro("");
      }, 4000);
    } else {
      console.log(image);
      navigation.navigate("termos", { userImage: image, userData: userData });
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/telap2.png")}
      style={styles.container}
      resizeMode="cover">
      <Pressable style={styles.backButton} onPress={backbutton}>
        <Image
          source={require("../assets/images/icons/backicon.png")}
          style={styles.backIcon}
        />
      </Pressable>

      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.textInputContainer}>
            <Image
              source={require("../assets/images/icons/Group.png")}
              style={styles.iconuser}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Nome de usuario"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={100}
              value={nmusuario}
              onChangeText={setNmusuario}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Image
              source={require("../assets/images/icons/page.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.textInput2}
              placeholder="Descrição"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={255}
              value={descrição}
              onChangeText={setDescrição}
            />
            <Text style={styles.caracteresRestantes}>
              {renderCaracteresRestantes()}
            </Text>
          </View>
        </View>

        <Pressable onPress={handleImagePicker} style={{ top: -350 }}>
          <View style={styles.imageContainer}>
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../assets/images/icons/layer1.png")
              }
              style={styles.image}
            />
          </View>
        </Pressable>

        <Text style={styles.textTitle}>Adicionar Foto</Text>

        <Pressable style={styles.button} onPress={handleVamosLaPress}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>

        {erro !== "" && (
          <Animatable.View
            style={[
              styles.errorBanner,
              {
                display: erro ? "flex" : "none",
                borderRadius: 10,
                marginTop: erro ? 20 : 0,
              },
            ]}
            animation="shake"
            iterationCount={1}
            duration={800}>
            <Text style={styles.errorMessage}>{erro}</Text>
          </Animatable.View>
        )}
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
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  content: {
    justifyContent: "center",
    alignItems: "center",
    top: 120,
  },

  button: {
    backgroundColor: "rgba(255, 1, 108, 0.4)",
    paddingVertical: 14,
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    top: Platform.OS === "web" ? 140 : 160,
  },

  backButton: {
    position: "absolute",
    top: Platform.OS === "web" ? 55 : 50,
    left: 27,
    zIndex: 1,
  },

  backIcon: {
    width: 30,
    height: 24,
  },

  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.7,
  },

  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS === "web" ? "118%" : "85%",
    height: Platform.OS === "web" ? 50 : 55,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginBottom: 13,
    justifyContent: "center",
    bottom: -150,
  },

  textInput: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
  },

  textInput2: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    left: Platform.OS === "web" ? 33 : 10,
  },

  icon: {
    width: 19,
    height: 24,
    marginRight: 14,
    left: 5,
  },

  iconuser: {
    width: 23,
    height: 23,
    marginRight: 14,
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

  caracteresRestantes: {
    fontSize: 12,
    marginLeft: 0,
  },

  imageContainer: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 100,
    overflow: "hidden",
    top: Platform.OS === "web" ? 75 : 102,
  },

  image: {
    width: 200,
    height: 200,
  },

  textTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    bottom: 250,
    opacity: 0.6,
  },
});
