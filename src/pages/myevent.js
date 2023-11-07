import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Platform,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/native";
import Backbutton from "../components/backbutton";
import CardEvent from "../components/cardEvent";
import axios from "axios";

export default function Myevent() {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [idEvent, setIdEvent] = useState("");
  const [eventData, setEventData] = useState([]);

  const menu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const route = useRoute();
	const { id } = route.params;

  const idUser = {
		userId_code: id
	};

  useEffect(() => {	
		axios
			.post('http://localhost:3003/viewEventUser', idUser)
			.then((response) => {
				setIdEvent(response.data.idEvent)
				console.log(response.data.results[0].Nm_event);
				setEventData(response.data.results);
	
			})
			.catch((error) => {
				console.error('Erro ao enviar ou retono de dados para o backend:', error);
			});
			console.log(id +"user");

	}, []);

  console.log(eventData);
  console.log(idEvent + "event");
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 32, width: "100%" }}>
        <Backbutton />

        <Pressable style={styles.button} onPress={menu}>
          <View style={styles.bttbarra} />
          <View style={styles.bttbarra} />
          <View style={styles.bttbarra} />
        </Pressable>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Meus Eventos</Text>
      </View>

      <View style={styles.linha}></View>
      <View style={styles.bottomImageContainer}>
        <Image
          source={require("../assets/images/img_borda_inicio.png")}
          style={styles.bottomImage}
        />
      </View>
      <ScrollView style={{width: "100%", gap: 16}}>
				<View style={{width: "100%", gap: 8, top: 100}}>
					{
						eventData.map((event,index) => {
							return (
								<CardEvent descricaoEvento={event.desc_event} idUser={id} Event_image={event.Event_image} Nm_event={event.Nm_event} Id_App_Events={idEvent} key={index}/>
							)
						})
					}
				</View>
			</ScrollView>

      <Modal
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={closeMenu}>
        <Pressable onPress={closeMenu} style={styles.modalBackground}>
          <Animatable.View
            style={styles.menuContainer}
            animation={isMenuVisible ? "slideInUp" : "slideInDown"}
            duration={500}>
            <Pressable
              style={styles.menubtt}
              onPress={() => console.log("Item 1 clicado")}>
              <Text style={styles.menubtttext}>Item 1</Text>
            </Pressable>
            <Pressable
              style={styles.menubtt}
              onPress={() => console.log("Item 2 clicado")}>
              <Text style={styles.menubtttext}>Item 2</Text>
            </Pressable>
            <Pressable
              style={styles.menubtt}
              onPress={() => console.log("Item 3 clicado")}>
              <Text style={styles.menubtttext}>Item 3</Text>
            </Pressable>
          </Animatable.View>
        </Pressable>
      </Modal>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: "#260038",
		alignItems: "center",
		padding: 16,
	},

  header: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: windowHeight * 0.06,
    zIndex: 1,
  },

  header1: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: windowHeight * 0.06,
    right: 30,
    zIndex: 1,
  },

  title: {
    fontSize: 19,
    color: "#FFFFFF",
  },

  linha: {
    width: Platform.OS === "web" ? "100%" : "108%",
    height: 1,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: windowHeight * 0.12,
  },

  button: {
		backgroundColor: "transparent",
		width: 30,
	},

  bttbarra: {
		width: "100%",
		height: 4,
		backgroundColor: "#FFFFFF",
		borderRadius: 2,
		marginVertical: 3.5,
	},

  bottomImageContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "52%",
    backgroundColor: "transparent",
  },

  bottomImage: {
    width: Platform.OS === "web" ? "100%" : "108%",
    height: "100%",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  menuContainer: {
    backgroundColor: "#470F62",
    padding: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  menubtt: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  menubtttext: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
