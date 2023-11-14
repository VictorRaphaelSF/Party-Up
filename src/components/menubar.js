import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

export default function MenuBar({ isMenuVisible, setMenuVisible, menu }) {
  const navigation = useNavigation();

  //console.log(imgProfile);
  const closeMenu = () => {
    setMenuVisible(false);
  };

  const bttSair = () => {
    navigation.navigate("index");
    setMenuVisible(false);
  };

  const bttReport = () => {
    navigation.navigate("report");
    setMenuVisible(false);
  };
  const bttTermos = () => {
    navigation.navigate("acesstermos");
    setMenuVisible(false);
  };
  const bttMyevent = () => {
    navigation.navigate("myevent");
    setMenuVisible(false);
  };
  const bttSettings = () => {
    navigation.navigate("settings");
    setMenuVisible(false);
  };
  const bttEventProgress = () => {
    navigation.navigate("event_progress");
    setMenuVisible(false);
  };

  const bttDashboard = () => {
    navigation.navigate("dashboard");
    setMenuVisible(false);
  };
  return (
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
            <Pressable style={styles.menubtt} onPress={bttDashboard}>
              <Text style={styles.menubtttext}>Dashboard</Text>
            </Pressable>
            <Pressable style={styles.menubtt} onPress={bttEventProgress}>
              <Text style={styles.menubtttext}>Eventos em andamentos</Text>
            </Pressable>
            <Pressable style={styles.menubtt} onPress={bttMyevent}>
              <Text style={styles.menubtttext}>Meus Eventos</Text>
            </Pressable>
            <Pressable style={styles.menubtt} onPress={bttReport}>
              <Text style={styles.menubtttext}>Report</Text>
            </Pressable>
            <Pressable style={styles.menubtt} onPress={bttTermos}>
              <Text style={styles.menubtttext}>Termos</Text>
            </Pressable>
            <Pressable style={styles.menubtt} onPress={bttSettings}>
              <Text style={styles.menubtttext}>Configurações</Text>
            </Pressable>
            <Pressable style={styles.menubtt} onPress={bttSair}>
              <Text style={styles.menubtttext}>Sair</Text>
            </Pressable>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
