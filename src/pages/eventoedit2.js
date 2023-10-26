import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  ImageBackground,
  Pressable,
  Dimensions,
  Platform,
  Animated,
  Easing,
} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import Backbutton from "../components/backbutton";

export default function Eventoedit2({ navigation }) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [siteInfo, setSiteInfo] = useState("");
  const [tags, setTags] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [modalityEvent, setModality] = useState("");
  const [classificationEvent, setClassication] = useState("");
  const [moreInfo, setMoreInfo] = useState("");

  const [statusEvent, setStatusEvent] = useState("");
  const [tituloWidth, setTituloWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [tituloNovo, setTituloNovo] = useState("");
  const [descricaoNovo, setDescricaoNovo] = useState("");
  const [dataInicioNovo, setDataInicioNovo] = useState("");
  const [dataFimNovo, setDataFimNovo] = useState("");
  const [horaInicioNovo, setHoraInicioNovo] = useState("");
  const [horaFimNovo, setHoraFimNovo] = useState("");
  const [siteInfoNovo, setSiteInfoNovo] = useState("");
  const [tagsNovo, setTagsNovo] = useState("");
  const [typeNovo, setTypeNovo] = useState("");
  const [statusNovo, setStatusNOvo] = useState("");
  const [modalityNovo, setModalityNovo] = useState("");
  const [classificationNovo, setClassificationNovo] = useState("");

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: tituloWidth,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [tituloWidth]);

  const imagemTituloLeft = animatedValue.interpolate({
    inputRange: [0, tituloWidth],
    outputRange: [0, tituloWidth + 15], // Ajuste conforme necessário
  });

  const id = {
    eventId_code: 1,
  };
  useEffect(() => {
    axios
      .post("http://localhost:3003/viewEvent", id)
      .then((response) => {
        console.log(response.data[0]);
        //nome
        setTitulo(response.data[0].Nm_event);

        //descrição
        setDescricao(response.data[0].desc_event);

        //data início
        const dataB = new Date(response.data[0].Dt_begin);
        const anoB = dataB.getFullYear();
        const mesB = String(dataB.getMonth() + 1).padStart(2, "0");
        const diaB = String(dataB.getDate()).padStart(2, "0");
        const horaB = String(dataB.getHours()).padStart(2, "0");
        const minutoB = String(dataB.getMinutes()).padStart(2, "0");

        const dtFormatB = diaB + "-" + mesB + "-" + anoB;
        const hrFormatB = horaB + ":" + minutoB;

        setDataInicio(dtFormatB);
        setHoraInicio(hrFormatB);

        //data fim
        const dataE = new Date(response.data[0].Dt_end);
        const anoE = String(dataE.getFullYear()).padStart(2, "0");
        const mesE = String(dataE.getMonth() + 1).padStart(2, "0");
        const diaE = String(dataE.getDate()).padStart(2, "0");
        const horaE = String(dataE.getHours()).padStart(2, "0");
        const minutoE = String(dataE.getMinutes()).padStart(2, "0");

        const dtFormatE = diaE + "-" + mesE + "-" + anoE;
        const hrFormatE = horaE + ":" + minutoE;

        setDataFim(dtFormatE);
        setHoraFim(hrFormatE);

        //site
        setSiteInfo(response.data[0].Site_contact);

        //tag
        setTags(response.data[0].Tag_event);

        //navigation.navigate('telaprincipal',{id: id});
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados para o backend:", error);
      });
  }, []);

  const updateEvent = {
    up_name_event_code: titulo,
    up_desc_event_code: descricao,
    up_Dt_begin_code: dataInicio,
    up_Hr_begin_code: horaInicio,
    up_Dt_end_code: dataFim,
    up_Hr_end_code: horaFim,
    up_Site_contact_code: siteInfo,
    tag_event_code: tags,
    up_Id_App_Events: id.eventId_code,
    tp_Event_code: typeEvent,
    up_Status_event_code: statusEvent,
    up_Informative_Classification_code: classificationEvent,
    up_Tp_Modality_code: modalityEvent,
  };
  console.log(updateEvent);

  const [editDescription, setEditDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editSite, setEditSite] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [editData, setEditData] = useState(false);
  const [editType, setEditType] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editClassification, setEditClassification] = useState(false);
  const [editModality, setEditModality] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage || require("../assets/images/telanexist.png")}
        style={styles.backgroundImage}
        resizeMode="cover">
          <Backbutton/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.overlay}>
            <View style={styles.descricaoContainer}>
              <View style={styles.tituloContainer}>
                <Text style={styles.descricaoTitulo}>Descrição</Text>
                <Pressable
                  onPress={() => {
                    setEditDescription(!editDescription);
                  }}>
                  <Image
                    source={require("../assets/images/icons/pencil(g).png")}
                    style={styles.imagemTitulo}
                  />
                </Pressable>
              </View>
              {editDescription ? (
                <TextInput
                  style={styles.descricaoTexto}
                  onChangeText={(e) => setDescricao(e)}
                  value={descricao}
                />
              ) : (
                <Text style={styles.descricaoTexto}>{descricao}</Text>
              )}
            </View>
          </View>

          <View style={styles.background}></View>

          <View style={styles.dataContainer}>
            <View style={styles.tituloContainer}>
              <Text style={styles.dataTitulo}>Data e horarios</Text>
              <Pressable
                onPress={() => {
                  setEditData(!editData);
                }}>
                <Image
                  source={require("../assets/images/icons/pencil(g).png")}
                  style={styles.imagemTitulo}
                />
              </Pressable>
            </View>
            {editData ? (
              <View>
                <View style={styles.flexRow}>
                  <Text style={styles.dataTexto}>Entre</Text>
                  <TextInput
                    style={styles.dataTexto}
                    onChangeText={(e) => setDataInicio(e)}
                    value={dataInicio}
                  />
                  <Text style={styles.dataTexto}>-</Text>
                  <TextInput
                    style={styles.dataTexto}
                    onChangeText={(e) => setDataFim(e)}
                    value={dataFim}
                  />
                </View>

                <View style={styles.flexRow}>
                  <TextInput
                    style={styles.dataTexto2}
                    onChangeText={(e) => setHoraInicio(e)}
                    value={horaInicio}
                  />

                  <Text style={styles.dataTexto2}>-</Text>

                  <TextInput
                    style={styles.dataTexto2}
                    onChangeText={(e) => setHoraFim(e)}
                    value={horaFim}
                  />

                  <Text style={styles.dataTexto2}>- Entrada Padrão</Text>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.dataTexto}>
                  Entre {dataInicio} - {dataFim}
                </Text>
                <Text style={styles.dataTexto2}>
                  {horaInicio} - {horaFim} - Entrada Padrão
                </Text>
              </View>
            )}
          </View>

          <View style={styles.siteInfoContainer}>
            <View style={styles.tituloContainer}>
              <Text style={styles.siteInfoTitulo}>
                Site para mais informações
              </Text>
              <Pressable
                onPress={() => {
                  setEditSite(!editSite);
                }}>
                <Image
                  source={require("../assets/images/icons/pencil(g).png")}
                  style={styles.imagemTitulo}
                />
              </Pressable>
            </View>
            {editSite ? (
              <TextInput
                style={styles.descricaoTexto}
                onChangeText={(e) => setSiteInfo(e)}
                value={siteInfo}
              />
            ) : (
              <Text style={styles.descricaoTexto}>{siteInfo}</Text>
            )}
          </View>

          <View style={styles.tagsContainer}>
            <View style={styles.tituloContainer}>
              <Text style={styles.tagsTitulo}>Tags Relacionadas</Text>
              <Pressable
                onPress={() => {
                  setEditTags(!editTags);
                }}>
                <Image
                  source={require("../assets/images/icons/pencil(g).png")}
                  style={styles.imagemTitulo}
                />
              </Pressable>
            </View>
            {editTags ? (
              <TextInput
                style={styles.tagsTexto}
                onChangeText={(e) => setTags(e)}
                value={tags}
              />
            ) : (
              <Text style={styles.tagsTexto}>{tags}</Text>
            )}
          </View>

          <View style={styles.typeContainer}>
            <View style={styles.tituloContainer}>
              <Text style={styles.typeTitulo}>Tipo do evento</Text>
              <Pressable
                onPress={() => {
                  setEditType(!editType);
                }}>
                <Image
                  source={require("../assets/images/icons/pencil(g).png")}
                  style={styles.imagemTitulo}
                />
              </Pressable>
            </View>
            {editTags ? (
              <TextInput
                style={styles.typeTexto}
                onChangeText={(e) => setTypeEvent(e)}
                value={typeEvent}
              />
            ) : (
              <Text style={styles.typeTexto}>{typeEvent}</Text>
            )}
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.tituloContainer}>
              <Text style={styles.statusTitulo}>Status do evento</Text>
              <Pressable
                onPress={() => {
                  setEditStatus(!editStatus);
                }}>
                <Image
                  source={require("../assets/images/icons/pencil(g).png")}
                  style={styles.imagemTitulo}
                />
              </Pressable>
            </View>
            {editTags ? (
              <TextInput
                style={styles.statusTexto}
                onChangeText={(e) => setStatusEvent(e)}
                value={statusEvent}
              />
            ) : (
              <Text style={styles.statusTexto}>{statusEvent}</Text>
            )}
          </View>

          <View style={styles.modalidadeContainer}>
            <View style={styles.tituloContainer}>
              <Text style={styles.modalidadeTitulo}>Modalidade</Text>
              <Pressable
                onPress={() => {
                  setEditModality(!editModality);
                }}>
                <Image
                  source={require("../assets/images/icons/pencil(g).png")}
                  style={styles.imagemTitulo}
                />
              </Pressable>
            </View>
            {editTags ? (
              <TextInput
                style={styles.statusTexto}
                onChangeText={(e) => setModality(e)}
                value={modalityEvent}
              />
            ) : (
              <Text style={styles.modalidadeTexto}>{modalityEvent}</Text>
            )}
          </View>

          <View style={styles.classificationContainer}>
            <View style={styles.tituloContainer}>
              <Text style={styles.classificationTitulo}>Classificação</Text>
              <Pressable
                onPress={() => {
                  setEditClassification(!editClassification);
                }}>
                <Image
                  source={require("../assets/images/icons/pencil(g).png")}
                  style={styles.imagemTitulo}
                />
              </Pressable>
            </View>
            {editTags ? (
              <TextInput
                style={styles.statusTexto}
                onChangeText={(e) => setClassication(e)}
                value={classificationEvent}
              />
            ) : (
              <Text style={styles.classificationTexto}>
                {classificationEvent}
              </Text>
            )}
          </View>

          <View style={styles.line2} />

          <View style={styles.square}>
            <View style={styles.flexRow}>
              {editTitle ? (
                <TextInput
                  style={styles.titulo}
                  onChangeText={(e) => setTitulo(e)}
                  value={titulo}
                />
              ) : (
                <Text
                  style={styles.titulo}
                  ref={(ref) => {
                    if (ref) {
                      ref.measure((x, y, width, height, pageX, pageY) => {
                        setTituloWidth(width);
                      });
                    }
                  }}>
                  {titulo}
                </Text>
              )}
              <Pressable
                onPress={() => {
                  setEditTitle(!editTitle);
                }}>
                <Image
                  source={require("../assets/images/icons/pencil(g).png")}
                  style={[styles.imagemTitulo2, { left: imagemTituloLeft }]}
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  backgroundImage: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    justifyContent: "center",
    alignItems: "center",
  },

  square: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 275,
    backgroundColor: "black",
    zIndex: 0,
    justifyContent: "end",
    alignItems: "start",
  },

  titulo: {
    // position: 'absolute',
    left: 15,
    bottom: 12,
    color: "white",
    fontSize: 24,
    fontWeight: "inter",
    textAlign: "center",
  },

  buttonContainer: {
    position: "absolute",
    top: 290,
    left: 22,
    flexDirection: "row",
    zIndex: 1,
  },

  buttonContainer2: {
    position: "absolute",
    top: 290,
    right: 22,
    flexDirection: "row",
    zIndex: 1,
  },

  customButton: {
    marginHorizontal: 10,
  },

  icon: {
    width: 65,
    height: 65,
  },

  buttonTitle: {
    position: "absolute",
    right: 18,
    top: 75,
    color: "white",
    fontSize: 12,
    marginRight: -10,
  },

  buttonTitle1: {
    position: "absolute",
    right: 124,
    top: 75,
    color: "white",
    fontSize: 12,
    marginRight: -10,
  },

  buttonTitle2: {
    position: "absolute",
    right: 28,
    top: 75,
    color: "white",
    fontSize: 12,
    marginRight: -10,
  },

  buttonTitle3: {
    position: "absolute",
    right: 108,
    top: 75,
    color: "white",
    fontSize: 12,
    marginRight: -10,
  },

  buttonTitle4: {
    position: "absolute",
    right: 18,
    top: 75,
    color: "white",
    fontSize: 12,
    marginRight: -10,
  },

  descricaoContainer: {
    marginVertical: 8,
    position: "absolute",
    top: windowHeight / 2 + -125,
    left: 15,
    zIndex: 1,
  },

  descricaoTitulo: {
    position: "relative",
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "left",
  },

  descricaoTexto: {
    position: "relative",
    color: "white",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  dataContainer: {
    marginVertical: 54,
    top: windowHeight / 2 + -75,
    left: 15,
    zIndex: 1,
  },

  dataTitulo: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "left",
  },

  dataTexto: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  dataTexto2: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  siteInfoContainer: {
    marginVertical: 8,
    position: "absolute",
    top: windowHeight / 2 + 75,
    left: 15,
    zIndex: 1,
  },

  siteInfoTitulo: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "left",
  },

  siteInfoTexto: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  tagsContainer: {
    marginVertical: 8,
    position: "absolute",
    top: windowHeight / 2 + 145,
    left: 15,
    zIndex: 1,
  },

  tagsTitulo: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "left",
  },

  tagsTexto: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  typeContainer: {
    marginVertical: 8,
    position: "absolute",
    top: windowHeight / 2 + 215,
    left: 15,
    zIndex: 1,
  },

  typeTitulo: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "left",
  },

  typeTexto: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  statusContainer: {
    marginVertical: 8,
    position: "absolute",
    top: windowHeight / 2 + 280,
    left: 15,
    zIndex: 1,
  },

  statusTitulo: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "left",
  },

  statusTexto: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  modalidadeContainer: {
    marginVertical: 8,
    position: "absolute",
    top: windowHeight / 2 + 345,
    left: 15,
    zIndex: 1,
  },

  modalidadeTitulo: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "left",
  },

  modalidadeTexto: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  classificationContainer: {
    marginVertical: 8,
    position: "absolute",
    top: windowHeight / 2 + 410,
    left: 15,
    zIndex: 1,
  },

  classificationTitulo: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "left",
  },

  classificationTexto: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  line2: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -890,
    height: 2,
    backgroundColor: "white",
    opacity: 0.6,
  },

  comentariosContainer: {
    marginVertical: 8,
    position: "absolute",
    top: windowHeight / 2 + 300,
    left: 15,
    zIndex: 1,
  },

  comentariosTitulo: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "left",
  },

  comentarioItem: {
    marginTop: 10,
    opacity: 0.5,
  },

  comentarioTexto: {
    color: "white",
    fontSize: 16,
  },

  imagemComentarios: {
    width: 100,
    height: 100,
    left: 70,
    alignSelf: "center",
    marginTop: 30,
  },

  semComentarios: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "center",
    left: 60,
    marginTop: 25,
    opacity: 0.7,
  },

  imagemTitulo1: {
    bottom: 12,
    width: 30,
    height: 30,
  },

  imagemTitulo2: {
    bottom: 12,
    width: 25,
    height: 25,
  },

  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  imagemTitulo: {
    marginLeft: 10,
    width: 20,
    height: 20,
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
