import { StyleSheet, View, Pressable, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Navbar() {
  const navigation = useNavigation();

  const handleButtonHome = () => {
    navigation.navigate("telaprincipal");
  };

  const handleButtonSearch = () => {
    navigation.navigate("search");
  };

  const handleButtonCenter = () => {
    navigation.navigate("cadevento", { id : id });
  };

  const handleButtonNotification = () => {
    navigation.navigate("notificacao");
  };

  const handleButtonPeople = () => {
    navigation.navigate("telaprofile");
  };

  return (
    <View style={styles.navbar}>
      <Pressable style={styles.navButton} onPress={handleButtonHome}>
        <Image
          source={require("../assets/images/icons/home(g).png")}
          style={styles.navButtonImage}
        />
      </Pressable>

      <Pressable
        style={[styles.navButton, { left: -15 }]}
        onPress={handleButtonSearch}>
        <Image
          source={require("../assets/images/icons/search(g).png")}
          style={styles.navButtonImage}
        />
      </Pressable>

      <Pressable
        style={[styles.circleButton, { bottom: 30 }]}
        onPress={handleButtonCenter}>
        <Image
          source={require("../assets/images/icons/add(g).png")}
          style={styles.circleButtonImage}
        />
      </Pressable>

      <Pressable
        style={[styles.navButton, { left: 15 }]}
        onPress={handleButtonNotification}>
        <Image
          source={require("../assets/images/icons/notification(g).png")}
          style={styles.navButtonImage}
        />
      </Pressable>

      <Pressable style={styles.navButton} onPress={handleButtonPeople}>
        <Image
          source={require("../assets/images/icons/people(g).png")}
          style={styles.navButtonImage}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#380053",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  
  navButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },

  navButtonImage: {
    width: 20,
    height: 20,
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
