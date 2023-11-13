import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Dimensions,
  Text,
  ScrollView,
  FlatList,
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import Navbar from "../components/navbar";
import Buttonprofile from "../components/buttonprofile";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export default function Telaprincipal() {
  const [imgProfile, setImgProfile] = useState("");
  const { params } = useRoute();
  const navigation = useNavigation();

  const handleButtonHome = () => {
    setReload(reload + 1);
  };

  const handleButtonSearch = () => {
    navigation.navigate("search", { id: id });
  };


  const handleButtonCenter = () => {
    navigation.navigate("cadevento", { id: id });
  };



  const handleButtonPeople = () => {
    navigation.navigate("telaprofile");
  };

  const handleUserImagePress = () => {
    console.log("Foto de perfil pressionada");
  };

  // axios
  //   .post("http://localhost:3003/viewEvent")
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.error("Erro ao enviar ou retono de dados para o backend:", error);
  //   });

  const eventosTemporarios = [
    require("../assets/images/Eventos(Temporarios)/Evento(1).png"),
    require("../assets/images/Eventos(Temporarios)/Evento(2).png"),
    require("../assets/images/Eventos(Temporarios)/Evento(3).png"),
  ];
 
  const route = useRoute();
  const { id } = route.params;
  const { userImage } = route.params;
  
  useEffect(() => {
    setImgProfile(userImage)
    axios
      .post("http://localhost:3003/viewDestaquesHighlights")
      .then((e) => {
        console.log(e);

      })
      .catch ((error) => {
        console.error('Erro ao enviar ou retono de dados para o backend:', error);
    });


    
  }, []);


  const renderItem = ({ item }) => (
    <Image style={styles.carouselImage} source={item} />
  );


  
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require("../assets/images/icons/sol.png")}
          style={styles.topIconSol}
        />
        <Image
          source={require("../assets/images/icons/partyuplg.png")}
          style={styles.topIconPartyup}
        />
      </View>

      <Text style={styles.highlightsText}>Destaques</Text>

      <FlatList
        data={eventosTemporarios}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.carousel}
      />

      <Image
        source={require("../assets/images/Eventos(Temporarios)/EventoM(1).png")}
        style={styles.backgroundImage}
      />
      <Image
        source={require("../assets/images/Eventos(Temporarios)/EventoM(2).png")}
        style={styles.backgroundImage1}
      />
      <Buttonprofile id={id} imgProfile= {imgProfile}/>
      <Navbar id={id} imgProfile= {imgProfile}/>
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

  topBar: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  topIconSol: {
    width: 45,
    height: 45,
    left: 5,
    top: 24,
    opacity: 0.8,
  },

  topIconPartyup: {
    width: 145,
    height: 25,
    left: 12,
    top: 35,
    opacity: 0.7,
  },

  highlightsText: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 22,
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    top: 80,
    right: 115,
  },

  carousel: {
    alignItems: "center",
    paddingVertical: 24,
    bottom: 170,
  },

  carouselImage: {
    width: 100,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 12,
  },

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

  backgroundImage: {
    position: "absolute",
    width: "80%",
    bottom: 250,
    height: 200,
    marginTop: 20,
    borderRadius: 8,
  },

  backgroundImage1: {
    position: "absolute",
    width: "80%",
    bottom: 25,
    height: 200,
    marginTop: 20,
    borderRadius: 8,
  },
});
