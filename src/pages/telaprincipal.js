
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import Navbar from "../components/navbar";
import Buttonprofile from "../components/buttonprofile";
import DestaqueBar from "../components/destaquebar";

export default function Telaprincipal() {
  const [imgProfile, setImgProfile] = useState("");
  const { params } = useRoute();
  const navigation = useNavigation();
  // const id = 1;

//   const route = useRoute();
//   const { id } = route.params;
//   console.log(id);

  // axios
  //   .post("http://localhost:3003/viewEvent")
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.error("Erro ao enviar ou retono de dados para o backend:", error);
  //   });

  const eventImages = [
    require("../assets/images/Eventos(Temporarios)/EventoM(1).png"),
    require("../assets/images/Eventos(Temporarios)/EventoM(2).png"),
    require("../assets/images/Eventos(Temporarios)/EventoM(1).png"),
    require("../assets/images/Eventos(Temporarios)/EventoM(2).png"),
    require("../assets/images/Eventos(Temporarios)/EventoM(1).png"),
    require("../assets/images/Eventos(Temporarios)/EventoM(2).png"),
    require("../assets/images/Eventos(Temporarios)/EventoM(1).png"),
    require("../assets/images/Eventos(Temporarios)/EventoM(2).png"),
  ];

  const addNewImage = ({ image }) => {
    <Image style={styles.carouselImage} source={image} />
  };

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

      <DestaqueBar/>

        <View style={styles.eventContainer}>
        <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
        >
            {eventImages.map((image, index) => (
            <Image key={index} source={image} style={styles.backgroundImage} />
            ))}
        </ScrollView>
        </View>
      <Buttonprofile />
      <Navbar id={id} imgProfile= {profileImage}/>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#260038",
    justifyContent: "center",
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

  eventContainer: {
    top: 50,
    flex: 1,
    width: "100%",
    maxHeight: 420,
  },

  scrollView: {
    flex: 1,
    width: "100%",
  },

  scrollViewContent: {
    
    alignItems: "center",
  },

  backgroundImage: {
    width: "80%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
});
