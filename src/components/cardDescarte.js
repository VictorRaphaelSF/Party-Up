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

export default function CardDescarte(props) {
  const navigation = useNavigation();

  const handleButtonDescarte = () => {
    navigation.goBack();
  };

  return (
    <Modal transparent={true} visible={true}>
      <TouchableWithoutFeedback>
        <View style={styles.containerDescarte}>
          <View style={styles.contentDescarte}>
            <Text style={styles.descarteLabel}>
              Deseja realmente descartar suas alterações?
            </Text>
            <Animatable.View style={styles.menuContainer} duration={250}>
              <View style={styles.containerBtns}>
                <Pressable
                  style={styles.descarteBtn}
                  onPress={handleButtonDescarte}>
                  <Text style={styles.descarteText}>Descarte</Text>
                </Pressable>
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => props.setDescarte(false)}>
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
  containerDescarte: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.469)",
  },
  contentDescarte: {
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
  descarteLabel: {
    fontSize: 25,
    color: "#FFF",
    textAlign: "center",
  },
  descarteText: {
    fontSize: 20,
    margin: "auto",
    color: "#FFF",
  },
  cancelText: {
    fontSize: 20,
    color: "#000",
  },
  descarteBtn: {
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
