import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
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
import Navbar from "../components/navbar";
import Backbutton from "../components/backbutton";
import Navbuttons from "../components/navbuttons";
import { useRoute } from "@react-navigation/native";
import Comentbar from "../components/comentbar";

export default function Evento({ navigation }) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [siteInfo, setSiteInfo] = useState("");
  const [tags, setTags] = useState("");

  const route = useRoute();
  const { id } = route.params;
  const { idEvento } = route.params;
  const { imgProfile } = route.params;
  console.log(id);

  useEffect(() => {
    const idEvent ={
      eventId_code: idEvento
    }


    const dados = {
      Id_user_code: id,
      Id_App_Events_code : idEvento

    }
    axios
      .post("http://localhost:3003/viewEvent", idEvent)
      .then((response) => {
        console.log(response.data[0]);
        console.log(response.data[0].Site_contact);
        //nome
        setTitulo(response.data[0].Nm_event);

        //image
        // setImgProfile(response.data[0].Event_image);

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
  console.log(siteInfo);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage || require("../assets/images/telanexist.png")}
        style={styles.backgroundImage}
        resizeMode="cover">
        <Backbutton />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.overlay}>
            <View style={styles.descricaoContainer}>
              <Text style={styles.descricaoTitulo}>Descrição</Text>
              <Text style={styles.descricaoTexto}>{descricao}</Text>
            </View>
          </View>

          <View style={styles.dataContainer}>
            <Text style={styles.dataTitulo}>Data e horarios</Text>
            <Text style={styles.dataTexto}>
              Entre {dataInicio} - {dataFim}
            </Text>
            <Text style={styles.dataTexto2}>
              {horaInicio} - {horaFim} - Entrada Padrão
            </Text>
          </View>

          <View style={styles.siteInfoContainer}>
            <Text style={styles.siteInfoTitulo}>
              Site para mais informações
            </Text>
            <Text style={styles.siteInfoTexto}>{siteInfo}</Text>
          </View>

          <View style={styles.tagsContainer}>
            <Text style={styles.tagsTitulo}>Tags Relacionadas</Text>
            <Text style={styles.tagsTexto}>{tags}</Text>
          </View>

          <Navbuttons siteInfo={siteInfo} idUser={id} idEvent={idEvento}/>

          <Comentbar />

          <View style={styles.comentariosContainer}>
            <Image
              source={require("../assets/images/icons/loading.png")}
              style={styles.imagemComentarios}
            />
            <Text style={styles.semComentarios}>
              Sem comentários disponíveis
            </Text>
          </View>

          <View style={styles.line2} />

          <View style={styles.square}>
            <Image
              source={`data:image/png;base64,${imgProfile}`}
              style={styles.square}
            />
            <Text style={styles.titulo}>{titulo}</Text>
          </View>
        </ScrollView>
      </ImageBackground>
      <Navbar /*id={id} imgProfile={imgProfile}*/ />
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
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    position: "absolute",
    left: 15,
    bottom: 12,
    color: "white",
    fontSize: 24,
    fontWeight: "inter",
    textAlign: "center",
  },

  descricaoContainer: {
    marginVertical: 8,
    position: "absolute",
    top: windowHeight / 2 + -10,
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
    top: windowHeight / 2 + 15 + 10,
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
    top: windowHeight / 2 + 175,
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
    top: windowHeight / 2 + 225,
    left: 15,
    zIndex: 1,
  },

  navButton: {
    flexDirection: "row",
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

  line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -530,
    height: 2,
    backgroundColor: "white",
    opacity: 0.6,
  },

  line2: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -560,
    height: 2,
    opacity: 0.6,
  },

  line3: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -790,
    height: 2,
    backgroundColor: "white",
    opacity: 0.6,
  },

  comentariosContainer: {
    marginVertical: 8,
    top: windowHeight / 2 + 85,
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
    alignSelf: "center",
    marginVertical: 24,
  },

  semComentarios: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "center",
    alignSelf: "center",
    opacity: 0.7,
  },
});
