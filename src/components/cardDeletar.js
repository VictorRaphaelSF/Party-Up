import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  Image,
  TextInput,
  Platform,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import { useState } from "react";

export default function CardDeletar(props) {
  const navigation = useNavigation();

  const handleDelete = () => {
    axios.post("http://localhost:3003/deleteUser", {
      idUser: 2
    }).then(() => {
      navigation.navigate("index")
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <Modal transparent={true} visible={true}>
      <TouchableWithoutFeedback>
        <View style={styles.containerExcluir}>
          <View style={styles.contentExcluir}>
            <Text style={styles.excluirLabel}>
              Digite a sua senha para deletar sua conta:
            </Text>
            <Animatable.View style={styles.menuContainer} duration={250}>
              <View style={styles.containerBtns}>
                <TextInput
                  style={styles.textInput2}
                  placeholder="Senha atual"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  underlineColorAndroid="transparent"
                  maxLength={255}
                  value={props.senha}
                  onChangeText={props.setSenha}
                />
                <Pressable
                  style={styles.excluirBtn}
                  onPress={handleDelete}>
                  <Text style={styles.excluirText}>Deletar conta</Text>
                </Pressable>
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => props.setDeletar(false)}>
                  <Text style={styles.cancelText}>Cancelar</Text>
                </Pressable>
              </View>
            </Animatable.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerExcluir: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.469)",
  },
  contentExcluir: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#380053",
    padding: 50,
    borderRadius: 10,
  },
  containerBtns: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
  },
  excluirLabel: {
    fontSize: 25,
    color: "#FFF",
    textAlign: "center",
  },
  excluirText: {
    fontSize: 20,
    margin: "auto",
    color: "#FFF",
  },
  cancelText: {
    fontSize: 20,
    color: "#000",
  },
  textInput2: {
    maxWidth: 200,
    color: "#FFFFFF",
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginBottom: 20,
    fontSize: 20,
    flex: 1,
    left: Platform.OS === "web" ? 50 : 10,
    outlineWidth: 0,
  },
  excluirBtn: {
    backgroundColor: "#95003F",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelBtn: {
    backgroundColor: "#e3e3e3",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
  },
  circleButton: {
    width: 60,
    height: 60,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: "50%",
    marginLeft: -27,
  },

  circleButtonImage: {
    width: 70,
    height: 75,
  },
});
