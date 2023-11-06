import { StyleSheet, View, Pressable, Image, Dimensions, } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Backbutton() {
    const navigation = useNavigation();

    const backbutton = () => {
        navigation.goBack();
      };

return (
      <Pressable style={styles.backIcon} onPress={backbutton}>
        <Image
          source={require("../assets/images/icons/backicon.png")}
          style={{width: "100%", height: "100%"}}
        />
       </Pressable>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({

    backButton: {
        zIndex: 1,
      },
    
      backIcon: {
        width: 30,
        height: 24,
        backgroundColor: "transparent"
      },
});