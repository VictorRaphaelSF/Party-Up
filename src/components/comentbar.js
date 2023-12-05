import { StyleSheet, View, Pressable, Image, Dimensions, } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Comentbar() {
    const navigation = useNavigation();

return (
 <Image
    source={require("../assets/images/icons/comentario.png")}
    style={styles.imagemComentarioBar}
/>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    imagemComentarioBar: {
        width: '100%',
        height: 50,
        resizeMode: "contain",
        top: 560,
      },
});