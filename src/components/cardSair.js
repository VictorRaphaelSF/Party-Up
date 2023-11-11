import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  Image,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import axios from "axios";

export default function CardSair(props) {
  const navigation = useNavigation();

  const handleButtonSair = () => {
    console.log("SAirr!!");
    navigation.navigate("index", {
      id: props.id,
    });
  };

  return (
    <Modal transparent={true} visible={true}>
      <TouchableWithoutFeedback>
        <View style={styles.containerSair}>
          <View style={styles.contentSair}>
            <Text style={styles.sairLabel}>Deseja realmente sair?</Text>
            <Animatable.View
              style={styles.menuContainer}
              animation={"slideInUp"}
              duration={250}>
              <View style={styles.containerBtns}>
                <Pressable style={styles.sairBtn} onPress={handleButtonSair}>
                  <Text style={styles.sairText}>Sair</Text>
                </Pressable>
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => props.setSair(false)}>
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
  containerSair: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.469)",
  },
  contentSair: {
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
  sairLabel: {
    fontSize: 25,
    color: "#FFF",
  },
  sairText: {
    fontSize: 20,
    margin: "auto",
    color: "#FFF",
  },
  cancelText: {
    fontSize: 20,
    color: "#000",
  },
  sairBtn: {
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
