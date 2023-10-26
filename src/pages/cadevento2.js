import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Platform,
  Dimensions,
  Modal,
  TextInput,
  ScrollView,
  ImageBackground,
  PanResponder,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";

import axios from "axios";
import Backbutton from "../components/backbutton";

export default function Cadevento2() {
  const [nmtelefone, setTelefone] = useState("");
  const [sitectt, setSitectt] = useState("");
  const [instagram, setInstagram] = useState("");
  const [infoctt, setInfoctt] = useState("");
  const [searchText, setSearchText] = useState("");
  const [eventtype, setEventtype] = useState("");
  const [accessType, setAccessType] = useState("");
  const [ClassificationType, setClassificationType] = useState("");

  const [datainicio, setdataInicio] = useState("");
  const [datafinal, setdataFinal] = useState("");
  const [horainicio, setHoraInicio] = useState("");
  const [horafinal, sethoraFinal] = useState("");

  const [erro, setErro] = useState("");
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isTypeMenuVisible, setTypeMenuVisible] = useState(false);
  const [isAccessTypeMenuVisible, setAccessTypeMenuVisible] = useState(false);
  const [isClassificationTypeMenuVisible, setClassificationTypeMenuVisible] =
    useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [selectedAccessType, setSelectedAccessType] = useState(null);
  const [selectedClassificationType, setSelectedClassificationType] =
    useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setSearchText(option);
    setSelectedEventType(option);
    // toggleModal();
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openTypeMenu = () => {
    setTypeMenuVisible(true);
  };

  const closeTypeMenu = () => {
    setTypeMenuVisible(false);
  };

  const selectEventType = (type) => {
    setSelectedEventType(type);
    setEventtype(type);
    closeTypeMenu();
  };

  const openAccessTypeMenu = () => {
    setAccessTypeMenuVisible(true);
  };

  const closeAccessTypeMenu = () => {
    setAccessTypeMenuVisible(false);
  };

  const selectAccessType = (accessType) => {
    setSelectedAccessType(accessType);
    setAccessType(accessType);
    closeAccessTypeMenu();
  };

  const openClassificationTypeMenu = () => {
    setClassificationTypeMenuVisible(true);
  };

  const closeClassificationTypeMenu = () => {
    setClassificationTypeMenuVisible(false);
  };

  const selectClassificationType = (ClassificationType) => {
    setSelectedClassificationType(ClassificationType);
    setClassificationType(ClassificationType);
    closeClassificationTypeMenu();
  };

  const InputNum = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  };

  // const route = useRoute();
  // const { eventData, id } = route.params;
  // console.log(eventData);
  // eventData["Site_contact_code"] = sitectt;
  // eventData["instagram_user_code"] = instagram;
  // eventData["more_info_code"] = infoctt;
  // eventData["telefone_event_code"] = nmtelefone;
  // eventData["Tp_Event_code"] = eventtype;
  // eventData["Tp_Modality_code"] = accessType;
  // eventData["Event_classification_code"] = ClassificationType;
  // eventData["Dt_begin_code"] = datainicio;
  // eventData["Dt_end_code"] = datafinal;
  // eventData["Hr_begin_code"] = horainicio;
  // eventData["Hr_end_code"] = horafinal;
  // eventData["Tag_event_code"] = searchText;

  // Dt_end_code,
  // Dt_creation_code,

  // Status_event_code,
  // Informative_Classification_code,
  // Event_classification_code//,
  // Tp_Event_code//,
  // Tp_Modality_code//,
  // Site_contact_code//,
  // more_info_code//,
  // instagram_user_code//,

  const bttCriarEvento = () => {
    const horaI = new Date("2000-01-01 " + horainicio);
    const horaF = new Date("2000-01-01 " + horafinal);
    if (
      !nmtelefone ||
      !sitectt ||
      !accessType ||
      !datainicio ||
      !datafinal ||
      !horainicio ||
      !horafinal
    ) {
      setErro("Preencha todos os campos obrigatórios.");
      console.log(horaI);
      console.log(horaF);
      setTimeout(() => {
        setErro("");
      }, 4000);
    } else if (horaI > horaF) {
      setErro("Horário inválido.");
      setTimeout(() => {
        setErro("");
      }, 4000);
    } else {
      setErro("");
      axios
        .post("http://localhost:3003/cadEvent", eventData)
        .then((response) => {
          console.log(response);
          navigation.navigate("telaprincipal", { id: id });
        })
        .catch((error) => {
          console.error("Erro ao enviar os dados para o backend:", error);
        });
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { dy } = gestureState;
        const newMenuVisible = dy < 0;
        setMenuVisible(newMenuVisible);
      },
    })
  ).current;

  return (
    <ImageBackground
      source={require("../assets/images/telap.png")}
      style={styles.container}
      resizeMode="cover">
        <Backbutton/>
      <View style={styles.overlay} {...panResponder.panHandlers}>
        <View style={styles.content}>
          <View style={styles.textInputContainer}>
            <Image
              source={require("../assets/images/icons/uil_padlock.png")}
              style={styles.icon}
            />
            <TextInputMask
              style={styles.textInput}
              placeholder="Telefone(Cel)"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              type={"cel-phone"}
              options={{
                maskType: "BRL",
              }}
              maxLength={15}
              value={nmtelefone}
              onChangeText={(text) => InputNum(text, setTelefone)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Image
              source={require("../assets/images/icons/globo.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Site para contato"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={255}
              value={sitectt}
              onChangeText={setSitectt}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Image
              source={require("../assets/images/icons/instagramicon.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Instagram"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={100}
              value={instagram}
              onChangeText={setInstagram}
            />
          </View>
          <View style={styles.textInputContainer}>
            <Image
              source={require("../assets/images/icons/info(g).png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Outras informações"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={255}
              value={infoctt}
              onChangeText={setInfoctt}
            />
          </View>
        </View>
        <View style={styles.searchBarContainer}>
          <Pressable onPress={openMenu}>
            <TextInput
              style={styles.searchInput}
              placeholder="Selecione tags"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={searchText}
            />
          </Pressable>
        </View>
        <View style={styles.searchBarContainerLow}>
          <Pressable onPress={openTypeMenu}>
            <TextInput
              style={styles.searchInput}
              placeholder="Selecionar tipo de evento"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={eventtype}
            />
          </Pressable>
        </View>
        <View style={styles.searchBarContainerLowLow}>
          <Pressable onPress={openAccessTypeMenu}>
            <TextInput
              style={styles.searchInput}
              placeholder="Definir tipo de acesso"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={accessType}
            />
          </Pressable>
        </View>
        <View style={styles.searchBarContainerLowLowLow}>
          <Pressable onPress={openClassificationTypeMenu}>
            <TextInput
              style={styles.searchInput}
              placeholder="Definir classificação do evento"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={ClassificationType}
            />
          </Pressable>
        </View>
        <Modal
          style={styles.modalContainer}
          transparent={true}
          visible={isMenuVisible}
          onRequestClose={closeMenu}>
          <Pressable onPress={closeMenu} style={styles.modalBackground}>
            <Animatable.View
              style={styles.menuContainer}
              animation={isMenuVisible ? "slideInUp" : "slideInDown"}
              duration={500}>
              <View style={styles.dragIndicator} />
              <Pressable
                style={styles.menubtt}
                onPress={() => selectOption("Rock")}>
                <Text style={styles.menubtttext}>Rock</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={() => selectOption("Sertanejo")}>
                <Text style={styles.menubtttext}>Sertanejo</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={() => selectOption("Dança")}>
                <Text style={styles.menubtttext}>Dança</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={() => selectOption("Teatral")}>
                <Text style={styles.menubtttext}>Teatral</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={() => selectOption("Religioso")}>
                <Text style={styles.menubtttext}>Religioso</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={() => selectOption("Funk")}>
                <Text style={styles.menubtttext}>Funk</Text>
              </Pressable>
            </Animatable.View>
          </Pressable>
        </Modal>
        <Modal
          style={styles.modalContainer}
          transparent={true}
          visible={isTypeMenuVisible}
          onRequestClose={closeTypeMenu}>
          <Pressable onPress={closeTypeMenu} style={styles.modalBackground}>
            <Animatable.View
              style={styles.menuContainer}
              animation={isTypeMenuVisible ? "slideInUp" : "slideInDown"}
              duration={500}>
              <View style={styles.dragIndicator} />
              <Pressable
                style={styles.menubtt}
                onPress={() => selectEventType("Pago")}>
                <Text style={styles.menubtttext}>Pago</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={() => selectEventType("Gratuito")}>
                <Text style={styles.menubtttext}>Gratuito</Text>
              </Pressable>
            </Animatable.View>
          </Pressable>
        </Modal>
        <Modal
          style={styles.modalContainer}
          transparent={true}
          visible={isAccessTypeMenuVisible}
          onRequestClose={closeAccessTypeMenu}>
          <Pressable
            onPress={closeAccessTypeMenu}
            style={styles.modalBackground}>
            <Animatable.View
              style={styles.menuContainer}
              animation={isAccessTypeMenuVisible ? "slideInUp" : "slideInDown"}
              duration={500}>
              <View style={styles.dragIndicator} />
              <Pressable
                style={styles.menubtt}
                onPress={() => selectAccessType("Presencial")}>
                <Text style={styles.menubtttext}>Presencial</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={() => selectAccessType("Online")}>
                <Text style={styles.menubtttext}>Online</Text>
              </Pressable>
            </Animatable.View>
          </Pressable>
        </Modal>

        <Modal
          style={styles.modalContainer}
          transparent={true}
          visible={isClassificationTypeMenuVisible}
          onRequestClose={closeClassificationTypeMenu}>
          <Pressable
            onPress={closeClassificationTypeMenu}
            style={styles.modalBackground}>
            <Animatable.View
              style={styles.menuContainer}
              animation={
                isClassificationTypeMenuVisible ? "slideInUp" : "slideInDown"
              }
              duration={500}>
              <View style={styles.dragIndicator} />
              <Pressable
                style={styles.menubtt}
                onPress={() => selectClassificationType("Público")}>
                <Text style={styles.menubtttext}>Público</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={() => selectClassificationType("Privado")}>
                <Text style={styles.menubtttext}>Privado</Text>
              </Pressable>
            </Animatable.View>
          </Pressable>
        </Modal>

        <View style={styles.textInputContainerSmall}>
          <TextInputMask
            style={styles.textInput2}
            placeholder="Data inicio"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY",
            }}
            value={datainicio}
            onChangeText={setdataInicio}
          />
        </View>

        <View style={styles.textInputContainerSmall}>
          <TextInputMask
            style={styles.textInput2}
            placeholder="Hora início"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            type={"datetime"}
            options={{
              format: "HH:mm",
            }}
            value={horainicio}
            onChangeText={setHoraInicio}
          />
        </View>

        <View style={styles.textInputContainerSmall2}>
          <TextInputMask
            style={styles.textInput2}
            placeholder="Data final"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY",
            }}
            value={datafinal}
            onChangeText={setdataFinal}
          />
        </View>

        <View style={styles.textInputContainerSmall2}>
          <TextInputMask
            style={styles.textInput2}
            placeholder="Hora final"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            type={"datetime"}
            options={{
              format: "HH:mm",
            }}
            value={horafinal}
            onChangeText={sethoraFinal}
          />
        </View>

        <Pressable style={styles.button} onPress={bttCriarEvento}>
          <Text style={styles.buttonText}>Criar Evento</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.01)",
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
    backgroundColor: "rgba(255, 1, 108, 0.4)",
    paddingVertical: 14,
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    bottom: 50,
  },

  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.7,
  },

  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS === "web" ? "130%" : "80%",
    height: Platform.OS === "web" ? 55 : 55,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginBottom: 13,
    top: -125,
  },

  textInput: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    left: 0,
  },

  iconuser: {
    width: 23,
    height: 23,
    marginRight: 14,
  },

  textadd: {
    color: "#FFFFFF",
    fontSize: 16,
    backgroundColor: "#380053",
    padding: 10,
    borderRadius: 24,
    textAlign: "center",
    width: "125%",
    top: -300,
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
    marginLeft: 10,
  },

  imageContainer: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 100,
    overflow: "hidden",
    top: 102,
  },

  image: {
    width: 200,
    height: 200,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },

  modalText: {
    fontSize: 22,
    marginBottom: 12,
    textAlign: "center",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "flex-end",
  },

  menuContainer: {
    backgroundColor: "#470F62",
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  dragIndicator: {
    height: 8,
    width: 50,
    backgroundColor: "#000000",
    alignSelf: "center",
    marginBottom: 16,
    borderRadius: 24,
    opacity: 0.5,
  },

  menubtt: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
  },

  menubtttext: {
    color: "#FFFFFF",
    fontSize: 18,
    opacity: 0.7,
  },

  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#582C74",
    padding: 12,
    bottom: 0,
    borderRadius: 10,
  },

  searchBarContainerLow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#582C74",
    padding: 12,
    bottom: -15,
    borderRadius: 10,
  },

  searchBarContainerLowLow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#582C74",
    padding: 12,
    bottom: -30,
    borderRadius: 10,
  },
  searchBarContainerLowLowLow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#582C74",
    padding: 12,
    bottom: -45,
    borderRadius: 10,
  },

  searchInput: {
    color: "#FFFFFF",
    fontSize: 16,
    width: "150%",
    flex: 1,
    borderRadius: 8,
    textAlign: "center",
    outlineWidth: 0,
  },

  textInputContainerSmall: {
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS === "web" ? "25%" : "80%",
    height: Platform.OS === "web" ? 50 : 55,
    borderBottomWidth: 1,
    right: 84,
    borderBottomColor: "#FFFFFF",
    marginBottom: 13,
    justifyContent: "center",
    bottom: -50,
  },

  textInputContainerSmall2: {
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS === "web" ? "25%" : "80%",
    height: Platform.OS === "web" ? 50 : 55,
    borderBottomWidth: 1,
    left: 84,
    borderBottomColor: "#FFFFFF",
    marginBottom: 13,
    justifyContent: "center",
    bottom: 76,
  },

  textInput2: {
    maxWidth: "100%",
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    left: Platform.OS === "web" ? 50 : 10,
    outlineWidth: 0,
  },
});
