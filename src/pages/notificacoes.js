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
import axios from "axios";
import MenuBar from "../components/menubar";

export default function Notificações() {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const menu = () => {
    setMenuVisible(true);
  };

  const route = useRoute();
  const { id } = route.params;
  const { imgProfile } = route.params;

  console.log(id);
  //console.log(imgProfile);

  const idUser = {
    id : id
  }


  useEffect(() => {
    axios
      .post('http://localhost:3003/viewNotificacao', idUser)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(
          "Erro ao enviar ou retono de dados para o backend:",
          error
        );
      });
  }, []);
  
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/telap.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Backbutton />
      <View style={styles.header}>
        <Text style={styles.title}>Notificações</Text>
      </View>

      <View style={styles.linha}></View>

      <Pressable style={styles.button} onPress={menu}>
        <View style={styles.bttbarra}></View>
        <View style={styles.bttbarra}></View>
        <View style={styles.bttbarra}></View>
      </Pressable>

      <MenuBar
        isMenuVisible={isMenuVisible}
        setMenuVisible={setMenuVisible}
        menu={menu}
      />

      <Navbar id={id} imgProfile={imgProfile} />
      {/* colocar aqui o map de notificações

      <Modal
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={closeMenu}>
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalBackground}>
            <Animatable.View
              style={styles.menuContainer}
              animation={isMenuVisible ? "slideInUp" : "slideInDown"}
              duration={250}>
              <Pressable
                style={styles.menubtt}
                onPress={bttDashboard}>
                <Text style={styles.menubtttext}>Dashboard</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={bttEventProgress}>
                <Text style={styles.menubtttext}>Eventos em andamentos</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={bttMyevent}>
                <Text style={styles.menubtttext}>Meus Eventos</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={bttReport}>
                <Text style={styles.menubtttext}>Report</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={() => console.log("Item 5 clicado")}>
                <Text style={styles.menubtttext}>Termos</Text>
              </Pressable>
              <Pressable
                style={styles.menubtt}
                onPress={bttSair}>
                <Text style={styles.menubtttext}>Sair</Text>
              </Pressable>
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Navbar id={id} imgProfile= {imgProfile}/> */}
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
