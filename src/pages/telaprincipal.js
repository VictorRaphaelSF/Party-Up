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
import Destaquebar from "../components/destaquebar";

export default function Telaprincipal() {
  const [eventsData, setEventsData] = useState([]);
  const [imgProfile, setImgProfile] = useState("");
  const navigation = useNavigation();

  const route = useRoute();
  const { id } = route.params;
  const { userImage } = route.params;
  useEffect(() => {
    setImgProfile(userImage);
    // axios
    //   .post("http://localhost:3003/viewDestaquesHighlights")
    //   .then((e) => {
    //     console.log(e);

    //   })
    //   .catch ((error) => {
    //     console.error('Erro ao enviar ou retono de dados para o backend:', error);
    // });
    axios
      .get("http://localhost:3003/viewAllEvent")
      .then((response) => {
        console.log(response);
        setEventsData(response.data.results);
      })
      .catch((error) => {
        console.error(
          "Erro ao enviar ou retornar de dados para o backend:",
          error
        );
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

      <Destaquebar eventsData={eventsData} />

      <View style={styles.eventContainer}>
        {eventsData.length === 0 ? (
          <Text style={styles.noEventsText}>Sem eventos disponíveis</Text>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            {eventsData.map((event, index) => (
              <Image
                key={index}
                style={styles.backgroundImage}
                source={event}
                on
              />
            ))}
          </ScrollView>
        )}
        {eventsData.map((e, index) => (
          <Pressable
            onPress={() => {
              axios.post("http://localhost:3003/EventAcess", {
                Id_user_code: id,
                Id_App_Events_code: e.Id_App_Events,
              });
              navigation.navigate("evento", { idEvento: e.Id_App_Events });
            }}>
            <Image
              source={`data:image/png;base64,${e.Event_image}`}
              style={styles.backgroundImage}
            />
            <Text style={styles.descEvent}>{e.desc_event}</Text>
          </Pressable>
        ))}
      </View>
      <Buttonprofile id={id} imgProfile={imgProfile} />
      <Navbar id={id} imgProfile={imgProfile} />
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

  descEvent: {
    fontSize: 15,
    position: "relative",
    maxWidth: 250,
    bottom: 70,
    color: "#FFF",
  },

  scrollView: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
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

  noEventsText: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    top: 120,
    marginTop: 20,
  },
});
