import React, { useState, useEffect } from "react";
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
import Backbutton from "../components/backbutton";
import axios from "axios";
import MenuBar from "../components/menubar";

export default function Tags() {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const menu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const bttSair = () => {
    navigation.navigate("index");
    setMenuVisible(false);
  };

  const bttTermos = () => {
    navigation.navigate("acesstermos");
    setMenuVisible(false);
  };

  const bttReport = () => {
    navigation.navigate("report");
    setMenuVisible(false);
  };

  const bttMyevent = () => {
    navigation.navigate("myevent");
    setMenuVisible(false);
  };

  const bttEventProgress = () => {
    navigation.navigate("event_progress");
    setMenuVisible(false);
  };

  const bttDashboard = () => {
    navigation.navigate("dashboard");
  };

  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:3003/pesquisarTags")
      .then((e) => {
        console.log(e);
        setTags(e.data.results);
        console.log(tags);
        const categories = e.data.results.map((e) => e.nm_category);
        setCategory([...new Set(categories)]);
        console.log(category);
      })
      .catch((err) => {
        console.log(err);
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
        <Text style={styles.title}>Buscar tags</Text>
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
      <View style={styles.tagHeader}>
        {category
          .sort((a, b) => a.localeCompare(b))
          .map((cc, cci) => (
            <>
              <Text style={styles.tagTitle} key={cci}>
                {cc}
              </Text>
              <View style={styles.tagNameContaineer} key={cci}>
                <View style={styles.tagNameContainer} key={cci}>
                  {tags
                    .filter((e) => e.nm_category === cc)
                    .sort((a, b) => a.nm_tag.localeCompare(b.nm_tag))
                    .map((e, i) => (
                      <Text style={styles.tagName} key={i}>
                        #{e.nm_tag}
                      </Text>
                    ))}
                </View>
              </View>
            </>
          ))}
      </View>
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
    position: "absolute",
    top: windowHeight * 0.06,
    zIndex: 1,
  },

  header1: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: windowHeight * 0.06,
    right: 30,
    zIndex: 1,
  },
  tagHeader: {
    marginTop: 80,
    maxHeight: windowHeight * 0.8,
    overflow: "scroll",
  },
  tagNameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 5,
  },
  tagName: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#7d4897",
    color: "#FFF",
  },
  tagTitle: {
    marginTop: 40,
    marginBottom: 15,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#75289b",
    fontSize: 18,
    margin: "auto",
    color: "#FFF",
  },

  title: {
    fontSize: 19,
    color: "#FFFFFF",
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
