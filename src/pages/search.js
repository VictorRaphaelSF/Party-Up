import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/navbar";
import Modal from "react-native-modal";                
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import CardEventUser from "../components/cardEventUser";

export default function Search() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalityModalVisible, setModalityModalVisible] = useState(false);
  const [isTypeModalVisible, setTypeModalVisible] = useState(false);
  const [classificarPor, setClassificarPor] = useState("Editar");
  const [modalidadeOpcao, setModalidadeOpcao] = useState("Editar");
  const [tipoEventoOpcao, setTipoEventoOpcao] = useState("Editar");

  const [reload, setReload] = useState(0);
  const navigation = useNavigation();
  const [userSearch_code, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [eventResult, setEventResult] = useState(false);


  const route = useRoute();
  const { id } = route.params;
  const { imgProfile } = route.params;
  console.log(id);

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const storedSearchHistory = await AsyncStorage.getItem("searchHistory");
        if (storedSearchHistory !== null) {
          setSearchHistory(JSON.parse(storedSearchHistory));
        }
      } catch (e) {
        console.error("Erro ao carregar histórico de pesquisa:", e);
      }
    };

    loadSearchHistory();
 
    
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setSearchHistory([...searchHistory, searchTerm]);


      AsyncStorage.setItem(
        "searchHistory",
        JSON.stringify([...searchHistory, searchTerm])
      );

      setReload(reload + 1);
    }
  };
  
  const handleClearHistory = async () => {
    try {
      await AsyncStorage.removeItem("searchHistory");
      setSearchHistory();
    } catch (e) {
      console.error("Erro ao limpar histórico de pesquisa:", e);
    }
  };

  const menu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };
 
  const handleModalType = () => {
    setModalVisible(true);
  };

  const handleModalityModalType = () => {
    setModalityModalVisible(true);
  };

  const handleClassificar = (opcao) => {
    setModalVisible(false);
    setClassificarPor(opcao);
  };

  const handleModality = (opcao) => {
    setModalityModalVisible(false);
    setModalidadeOpcao(opcao);
  };


  // console.log(eventData);
  
  
  const pesquisaUser = {
    userSearch_code: userSearch_code
  }

  useEffect(() => {
    console.log(userSearch_code);
    const delay = 500; // Atraso de 500ms
    let timeoutId;
  
  
    const pesquisaUser = {
      userSearch_code: userSearch_code,
    };
    console.log("opa");
    axios
      .post('http://localhost:3003/searchEvents', pesquisaUser)
      .then((response) => {
        console.log(response);
        if(response.data.msg){
          setEventResult(false)
          setError(response.data.msg)
          
        }else{
          setEventResult(true)
          setEventData(response.data.results);

        }
      })
      .catch((error) => {
        console.error('Erro ao enviar os dados para o backend:', error);
        
      });
   }, [userSearch_code]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/telap.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.searchBarContainer}>
          <Image
            source={require("../assets/images/icons/search(g).png")}
            style={styles.icon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            value={userSearch_code}
            onChangeText={(text) => {
              setSearchTerm(text);}}
              
            onSubmitEditing={handleSearch}
          />
          <Pressable style={styles.button} onPress={menu}>
            <View style={styles.bttbarra}></View>
            <View style={styles.bttbarra}></View>
            <View style={styles.bttbarra}></View>
          </Pressable>
        </View>

        <Pressable style={styles.bttView} onPress={handleClearHistory}>
          <Text style={styles.textView}>Apagar tudo</Text>
        </Pressable>

        <ScrollView
          style={styles.termsContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.termsContent}>
          {searchHistory.map((term, index) => (
            <View style={styles.searchHistoryItemContainer} key={index}>
              <Image
                source={require("../assets/images/icons/search(g).png")}
                style={styles.searchHistoryIcon}
              />
              <Pressable onPress={() => setSearchTerm(term)}>
                <Text style={styles.searchHistoryItem}>{term}</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>

        <ScrollView
        style={{ width: "100%", gap: 16, top: 10, maxHeight: "77%" }}>
        {eventResult ?
          (<View style={{width: "100%", gap: 8, backgroundColor: "black"}}>
					{
            
						eventData.map((event,index) => {
							return (
								<CardEventUser descricaoEvento={event.desc_event} idUser={id} Event_image={event.Event_image} Nm_event={event.Nm_event} Id_App_Events={event. Id_App_Events} key={index}/>
							)
						})
					}
          
				  </View>):
          (error && <Text style={styles.searchHistoryItem}>{error}</Text>)}
				</ScrollView>

        <Modal
          transparent={true}
          visible={isMenuVisible}
          onRequestClose={closeMenu}>
          <Pressable onPress={closeMenu} style={styles.modalBackground}>
            <Animatable.View
              style={styles.menuContainer}
              animation={isMenuVisible ? "slideInUp" : "slideInDown"}
              duration={250}>
              <View style={styles.dragIndicator} />
              <View style={styles.whiteLine} />
              <View style={styles.textTitle}>
                <Text style={styles.menubtttext}>Classificar por</Text>
              </View>
              <View style={styles.menuOption}>
                <Pressable
                  style={styles.menubtt}
                  onPress={() => handleModalType(true)}>
                  <Text style={styles.menubtttextLight}>{classificarPor}</Text>
                </Pressable>
              </View>
              <View style={styles.whiteLine} />
              <View style={styles.textTitle}>
                <Text style={styles.menubtttext}>Data do evento</Text>
              </View>
              <View style={styles.menuOption}>
                <Pressable
                  style={styles.menubtt}
                  onPress={() => console.log("Editar clicado 2")}>
                  <Text style={styles.menubtttextLight}>Editar</Text>
                </Pressable>
              </View>
              <View style={styles.whiteLine} />
              <View style={styles.textTitle}>
                <Text style={styles.menubtttext}>Modalidade</Text>
              </View>
              <View style={styles.menuOption}>
                <Pressable
                  style={styles.menubtt}
                  onPress={() => handleModalityModalType(true)}>
                  <Text style={styles.menubtttextLight}>{modalidadeOpcao}</Text>
                </Pressable>
              </View>
              <View style={styles.whiteLine} />
              <View style={styles.textTitle}>
                <Text style={styles.menubtttext}>Tipo do evento</Text>
              </View>
              <View style={styles.menuOption}>
                <Pressable
                  style={styles.menubtt}
                  onPress={() => console.log("Editar clicado 4")}>
                  <Text style={styles.menubtttextLight}>{tipoEventoOpcao}</Text>
                </Pressable>
              </View>
              <View style={styles.whiteLine} />
              <View style={styles.textTitle}>
                <Text style={styles.menubtttext}>Tags</Text>
              </View>
              <View style={styles.menuOption}>
                <Pressable
                  style={styles.menubtt}
                  onPress={() => console.log("Editar clicado 5")}>
                  <Text style={styles.menubtttextLight}>Editar</Text>
                </Pressable>
              </View>
              <View style={styles.whiteLine} />
            </Animatable.View>
          </Pressable>
        </Modal>

        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContent}>
            <View style={styles.modalButtons}>
              <Pressable style={styles.buttonLow} onPress={() => handleClassificar("Relevante")}>
                <Text style={styles.buttonText}>Relevantes</Text>
              </Pressable>
              <Pressable style={styles.buttonLow} onPress={() => handleClassificar("Recente")}>
                <Text style={styles.buttonText}>Recentes</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal isVisible={isModalityModalVisible}>
          <View style={styles.modalContent}>
            <View style={styles.modalButtons}>
              <Pressable style={styles.buttonLow} onPress={() => handleModality("Presencial")}>
                <Text style={styles.buttonText}>Presencial</Text>
              </Pressable>
              <Pressable style={styles.buttonLow} onPress={() => handleModality("Online")}>
                <Text style={styles.buttonText}>Online</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Navbar /*id={id} imgProfile={imgProfile}*//>
      </View>
    </KeyboardAvoidingView>
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

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },

  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#582C74",
    padding: 12,
    position: "absolute",
    top: 24,
    left: 8,
    right: 54,
    borderRadius: 20,
  },

  searchInput: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    paddingLeft: 10,
    borderRadius: 5,
    outlineWidth: 0,
  },

  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },

  icon: {
    width: 23,
    height: 23,
    marginRight: 12,
    left: 2,
  },

  button: {
    backgroundColor: "transparent",
    width: 30,
    height: 18,
    bottom: 7,
    left: 50,
  },

  bttbarra: {
    width: 31,
    height: 4,
    backgroundColor: "#7E3CA7",
    borderRadius: 2,
    marginVertical: 3.5,
  },

  bttView: {
    top: 90,
    right: 40,
    position: "absolute",
  },

  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },

  menuContainer: {
    backgroundColor: "#470F62",
    padding: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: "112%",
    right: 20,
    top: 16,
  },

  menubtt: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 10,
    right: 22,
    bottom: 13,
  },

  textTitle: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: -20,
    top: 30,
  },

  dragIndicator: {
    height: 8,
    width: 50,
    backgroundColor: "#000000",
    alignSelf: "center",
    marginBottom: 50,
    top: 22,
    borderRadius: 24,
    opacity: 0.5,
  },

  textView: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.5,
  },

  searchHistoryContainer: {
    position: "absolute",
    top: 120,
    left: 24,
  },

  searchHistoryItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },

  searchHistoryIcon: {
    width: 23,
    height: 23,
    marginRight: 15,
  },

  searchHistoryItem: {
    color: "#FFFFFF",
    fontSize: 16,
    marginVertical: 5,
  },

  termsContainer: {
    position: "absolute",
    marginTop: windowHeight * 0.12,
    left: 15,
    maxHeight: "80%",
    top: 12,
  },

  menubtttext: {
    color: "#FFFFFF",
    fontSize: 16,
    opacity: 0.9,
    top: 2,
  },

  menubtttextLight: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 16,
    top: 2,
  },

  whiteLine: {
    height: 1,
    backgroundColor: "#FFFFFF",
    marginVertical: 5,
    opacity: 0.8,
  },

  modalContent: {
    backgroundColor: "#530478",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },

  modalText: {
    color: "white",
    fontSize: 16,
    fontWeight: "inter",
    marginBottom: 32,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  buttonLow: {
    backgroundColor: "#7E3CA7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "inter",
  },
});