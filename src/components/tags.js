import React, { useState, useRef, useEffect } from "react";
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

export default function Tags({ isMenuVisible, setMenuVisible, selectOption }) {
  const closeMenu = () => {
    setMenuVisible(false);
  };
  const [tags, setTags] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:3003/pesquisarTags")
      .then((e) => {
        setTags(e.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Modal
      style={styles.modalContainer}
      transparent={true}
      visible={isMenuVisible}
      s
      onRequestClose={closeMenu}>
      <Pressable onPress={closeMenu} style={styles.modalBackground}>
        <Animatable.View
          style={styles.menuContainer}
          animation={isMenuVisible ? "slideInUp" : "slideInDown"}
          duration={500}>
          <View style={styles.dragIndicator} />
          {tags
            .sort((a, b) => a.nm_tag.localeCompare(b.nm_tag))
            .map((e, i) => (
              <Pressable
                style={styles.menubtt}
                key={i}
                onPress={() => selectOption(e.nm_tag)}>
                <Text style={styles.menubtttext}>{e.nm_tag}</Text>
              </Pressable>
            ))}
        </Animatable.View>
      </Pressable>
    </Modal>
  );
}

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
    backgroundColor: "#95003F",
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
    top: -125,
  },

  textInput: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    outlineWidth: 0,
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
    maxHeight: 400,
    overflow: "scroll",
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
