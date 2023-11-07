import { StyleSheet, View, Pressable, Image } from "react-native";
import {useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Navbar(props) {
  const navigation = useNavigation();

  const handleButtonHome = () => {
    navigation.navigate("telaprincipal", { id : props.id, imgProfile: props.imgProfile });
  };

  const handleButtonSearch = () => {
    navigation.navigate("search", { id : props.id, imgProfile: props.imgProfile });
  };

  const handleButtonCenter = () => {
    // axios.post('http://localhost:3003/updateEvent', props.updateEvent )
		// 	.then((response)=> {
		// 		console.log(response);
    //     navigation.navigate("telaprincipal", { id : props.id, imgProfile: props.imgProfile });
		// 	})
		// 	.catch ((error) => {
		// 		console.error('Erro ao enviar ou retono de dados para o backend:', error);
		// })
    navigation.navigate("cadevento", { id : props.id, imgProfile: props.imgProfile });
  };

  const handleButtonNotification = () => {
    navigation.navigate("notificacao", { id : props.id, imgProfile: props.imgProfile });
  };

  const handleButtonPeople = () => {
    navigation.navigate("telaprofile", { id: props.id, imgProfile: props.imgProfile});
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
