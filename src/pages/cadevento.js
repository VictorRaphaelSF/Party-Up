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
  ScrowView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import axios from "axios";
import Backbutton from "../components/backbutton";

export default function Cadevento({route}) {

  const [nmevento, setNmevento] = useState('');
  const [descrição, setDescrição] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [nmrua, setNmrua] = useState('');
  const [numero, setNumero] = useState('');

  //Linha abaixo somente para validações.
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

  const renderCaracteresRestantes = () => {
    const caracteresRestantes = 255 - descrição.length;
    const corCaracteres =
      caracteresRestantes === 0 ? "#FF0000" : "rgba(255, 255, 255, 0.5)";
    return <Text style={{ color: corCaracteres }}>{caracteresRestantes}</Text>;
  };

  const handleCepChange = async (newCep) => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${newCep}/json/`
      );
      const data = response.data;

      setEstado(data.uf);
      setCidade(data.localidade);
      setBairro(data.bairro);
      setNmrua(data.logradouro);
    } catch (error) {
      console.error("Erro ao consultar o CEP:", error);
    }
  };

  const InputNum = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  };

  const userData = route.params.userData;

  // adicionando mais dados no objeto do cliente
  // userData["nmUser"] = nmusuario;
  // userData["descricao"] = descrição;
  // userData["uri"] = "imagem.png";

  const opa = useRoute();
  const { id } = opa.params;
  const eventData = {
    name_event_code : nmevento,
		desc_event_code : descrição,
    nm_estado_code : estado,
		nm_cidade_code : cidade,
		nm_bairro_code: bairro,
		cd_cep_code: cep,
		nm_rua_code: nmrua,
		num_residencia_code: numero,
    img_Data: imageData,
    idUser_code: id
  
  }
  
  const handleVamosLaPress = () => {
    if (
      !nmevento ||
      !descrição ||
      !cep ||
      !estado ||
      !cidade ||
      !bairro ||
      !nmrua ||
      !numero
    ) {
      setErro("Preencha todos os campos obrigatórios.");
      setTimeout(() => {
        setErro("");
      }, 4000);
    } else {
      setErro("");
      navigation.navigate("cadevento2", {
        userImage: image,
        eventData: eventData,
        id: id,
      });
    }
  };
  // verificando pra ver se ta certo

  return (
    <ImageBackground
      source={require("../assets/images/telap2.png")}
      style={styles.container}
      resizeMode="cover">
        <Backbutton/>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.textInputContainer}>
            <Image
              source={require("../assets/images/icons/Group.png")}
              style={styles.iconuser}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Nome do evento"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={100}
              value={nmevento}
              onChangeText={setNmevento}
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

          <View style={styles.textInputContainerSmall}>
            <TextInput
              style={styles.textInput2}
              placeholder="CEP"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={15}
              value={cep}
              onChangeText={(newCep) => {
                InputNum(newCep, setCep);
                if (newCep.length === 8) {
                  handleCepChange(newCep);
                }
              }}
            />
          </View>

          <View style={styles.textInputContainerSmall}>
            <TextInput
              style={styles.textInput2}
              placeholder="Cidade"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={50}
              value={cidade}
              onChangeText={setCidade}
            />
          </View>

          <View style={styles.textInputContainerSmall2}>
            <TextInput
              style={styles.textInput2}
              placeholder="Estado"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={2}
              value={estado}
              onChangeText={setEstado}
            />
          </View>

          <View style={styles.textInputContainerSmall2}>
            <TextInput
              style={styles.textInput2}
              placeholder="Bairro"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={125}
              value={bairro}
              onChangeText={setBairro}
            />
          </View>

          <View style={styles.textInputContainerSmallCenter}>
            <TextInput
              style={styles.textInput2}
              placeholder="Número"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={4}
              value={numero}
              onChangeText={(text) => InputNum(text, setNumero)}
            />
          </View>

          <View style={styles.textInputContainerLow}>
            <Image
              source={require("../assets/images/icons/location.png")}
              style={styles.iconlocation}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Rua"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={125}
              value={nmrua}
              onChangeText={setNmrua}
            />
          </View>
        </View>

        <Pressable onPress={handleImagePicker} style={{ top: -575 }}>
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

        <Text style={styles.textTitle}>Adicionar foto</Text>

        <Pressable style={styles.button} onPress={handleVamosLaPress}>
          <Text style={styles.buttonText}>Avançar</Text>
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
    position: "absolute",
    backgroundColor: "rgba(255, 1, 108, 0.50)",
    paddingVertical: 14,
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    bottom: Platform.OS === "web" ? 50 : 160,
  },

  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.9,
  },

  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS === "web" ? "130%" : "80%",
    height: Platform.OS === "web" ? 55 : 55,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginBottom: 13,
    justifyContent: "center",
    top: 200,
  },

  textInputContainerSmall: {
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS === "web" ? "45%" : "80%",
    height: Platform.OS === "web" ? 50 : 55,
    borderBottomWidth: 1,
    right: 84,
    borderBottomColor: "#FFFFFF",
    marginBottom: 13,
    justifyContent: "center",
    top: 184,
  },

  textInputContainerSmall2: {
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS === "web" ? "45%" : "80%",
    height: Platform.OS === "web" ? 50 : 55,
    borderBottomWidth: 1,
    left: 84,
    borderBottomColor: "#FFFFFF",
    marginBottom: 13,
    justifyContent: "center",
    top: 58,
  },

  textInputContainerSmallCenter: {
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS === "web" ? "45%" : "80%",
    height: Platform.OS === "web" ? 50 : 55,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginBottom: 13,
    justifyContent: "center",
    top: 58,
  },

  textInputContainerLow: {
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS === "web" ? "130%" : "80%",
    height: Platform.OS === "web" ? 55 : 55,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginBottom: 13,
    justifyContent: "center",
    top: 45,
  },

  textInput: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    outlineWidth: 0,
  },

  textInput2: {
    maxWidth: "100%",
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    left: Platform.OS === "web" ? 50 : 10,
    outlineWidth: 0,
  },

  icon: {
    width: 19,
    height: 24,
    marginRight: 14,
    left: 5,
    opacity: 0.8,
  },

  iconuser: {
    width: 23,
    height: 23,
    marginRight: 14,
    opacity: 0.8,
  },

  iconlocation: {
    width: 20,
    height: 28,
    marginRight: 14,
    opacity: 0.8,
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
    top: -475,
  },
});
