import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Platform,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/navbar";
import Backbutton from "../components/backbutton";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import CardDeletar from "../components/cardDeletar";

export default function Settings() {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const menu = () => {
    setMenuVisible(true);
  };

  const route = useRoute();

  const [senha, setSenha] = useState("")
  const [deletar, setDeletar] = useState(false)

  return (
    <View style={styles.container}>
      {deletar && <CardDeletar setDeletar={setDeletar} senha={senha} setSenha={setSenha} />}
      <Image
        source={require("../assets/images/telap.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Backbutton />
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
      </View>
      <View style={styles.linha}></View>

      <View style={styles.optionsContainer}>
        <Icon style={styles.option} name="envelope-o" color={"#fff"} size={20}>
          <Text style={styles.optionText}>Alterar email</Text>
        </Icon>
        <Pressable onPress={() => setDeletar(true)}>
          <Icon style={styles.option} name="trash-o" color={"#ca3f3f"} size={20}>
            <Text style={styles.optionExcluir}>Deletar conta</Text>
          </Icon>
        </Pressable>
      </View>
      <Navbar />
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#260038",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: windowHeight * 0.06,
    zIndex: 1,
  },

  title: {
    fontSize: 19,
    color: "#FFFFFF",
  },

  header1: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: windowHeight * 0.06,
    right: 30,
    zIndex: 1,
  },

  linha: {
    width: Platform.OS === "web" ? "100%" : "108%",
    height: 1,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: windowHeight * 0.12,
  },

  optionsContainer: {
    width: "100%",
    paddingVertical: 20,
    marginTop: -450,
  },

  option: {
    display: "flex",
    marginVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    paddingLeft: 30,
    paddingVertical: 20,
    margin: -20,
    alignItems: "center",
  },

  optionText: {
    fontFamily: "Arial",
    fontSize: 15,
    marginHorizontal: 10,
  },
  optionExcluir: {
    color: "#ca3f3f",
    fontFamily: "Arial",
    fontSize: 15,
    marginHorizontal: 10,
  },

  button: {
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: 30,
    height: 18,
    right: 20,
    top: 50,
  },

  bttbarra: {
    width: 31,
    height: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    marginVertical: 3.5,
  },

  bottomImageContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "52%",
    backgroundColor: "transparent",
  },

  bottomImage: {
    width: Platform.OS === "web" ? "100%" : "108%",
    height: "100%",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  menuContainer: {
    backgroundColor: "#470F62",
    padding: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  menubtt: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  menubtttext: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
