import { StyleSheet, View, Pressable, Image, Dimensions, } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Avaliacaobar() {
    const navigation = useNavigation();

return (
 <Image
    source={require("../assets/images/icons/avali.png")}
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
        top: 155,
      },
});
