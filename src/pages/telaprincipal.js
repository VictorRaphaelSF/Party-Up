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
  
  const idUser = {
    Id_user_code: id
  }
  useEffect(() => {
    setImgProfile(userImage)
    // axios
    //   .post("http://localhost:3003/dadosUser", idUser)
    //   .then((e) => {
    //     console.log(e);
    //     console.log('====================================');
    //     console.log(id);
    //     console.log('====================================');
    //     // setImgProfile(e.data.results[0].User_image);
    //     console.log(id);
       
    //   })
    //   .catch ((error) => {
    //     console.error('Erro ao enviar ou retono de dados para o backend:', error);
    // });


    
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
