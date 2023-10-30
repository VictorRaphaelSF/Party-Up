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
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function Modalmenu() {
    const navigation = useNavigation();
    const [isMenuVisible, setMenuVisible] = useState(false);

    const menu = () => {
        setMenuVisible(true);
      };
    
      const closeMenu = () => {
        setMenuVisible(false);
      };
    
      const bttSair = () => {
        navigation.navigate('index');
        setMenuVisible(false);
      };
    
      const bttReport = () => {
        navigation.navigate('report');
        setMenuVisible(false);
      };
    
      const bttMyevent = () => {
        navigation.navigate('myevent');
        setMenuVisible(false);
      };
    
      const bttEventProgress = () => {
        navigation.navigate('event_progress');
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
              <Pressable
                style={styles.menubtt}
                onPress={() => console.log("Item 1 clicado")}>
                <Text style={styles.menubtttext}>Configurações</Text>
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

      button: {
        position: "absolute",
        justifyContent: "center",
        backgroundColor: "transparent",
        width: 30,
        height: 18,
        right: 135,
        top: 55,
      },
    
      bttbarra: {
        width: 31,
        height: 4,
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        marginVertical: 3.5,
        left: 100,
      },
});