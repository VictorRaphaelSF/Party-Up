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
import { useRoute } from "@react-navigation/native";
import Navbar from "../components/navbar";
import Backbutton from "../components/backbutton";
import Navbuttons from "../components/navbuttons";
import Comentbar from "../components/comentbar";
import Avaliacaobar from "../components/avaliacaobar";

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

  const [numCurtida, setNumCurtida] = useState(0);
  const [numPresence, setNumPresence] = useState(0);
  const [mediaAvaliacao, setMediaAvaliacao] = useState(0);
  const [avaliacao, setNumAvaliacao] = useState(0);
  const [avaliacaoEnviada, setAvaliacaoEnviada] = useState(false);

  

  const route = useRoute();
  const { id } = route.params;
  const { idEvento } = route.params;
  const { imgProfile } = route.params;
  console.log(id);

  const btnEnviarAva = () => {
    axios.post("http://localhost:3003/avaliacaoEvent", {
      Id_user_code: id,
      id_app_events_code: idEvento,
      avaliation_User_code: avaliacao
    })
    if (avaliacaoEnviada) {
      setAvaliacaoEnviada(false);
    }
  };

  useEffect(() => {
    const idEvent ={
      eventId_code: idEvento
    }


    const dados = {
      Id_user_code: id,
      Id_App_Events_code : idEvento

    }

    const like = {
      Id_user_code: id,
      Id_App_Events_code: idEvento
    }

    axios
					.post('http://localhost:3003/likeCount', like)
					.then((response) => {
						console.log(response);
						setNumCurtida(response.data.numberLikes)
					}).then(() => {

					})
					.catch((error) => {
						console.error('Erro ao enviar os dados para o backend:', error);

    });
    axios
    .post('http://localhost:3003/presenceCount', like)
    .then((response) => {
      console.log(response);
      setNumPresence(response.data.numberPresence)
    }).then(() => {
 ;
    })
    .catch((error) => {
      console.error('Erro ao enviar os dados para o backend:', error);

});
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

        //image
        setBackgroundImage(
          `data:image/png;base64,${response.data[0].Event_image}`
        );

        //navigation.navigate('telaprincipal',{id: id});
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados para o backend:", error);
      });
  }, []);
  console.log(id,"aaaaaaaaaaa");

  const bttNewCom = () => {
    navigation.navigate("comentario", {
      idEvento: idEvento, id : id
    });
  }
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/telanexist.png")}
        style={styles.backgroundImage}
        resizeMode="cover">
        <Backbutton />
        <ScrollView showsVerticalScrollIndicator={false}>
 
        <Navbuttons siteInfo={siteInfo} id={id} idEvent={idEvento} numCurtida={numCurtida} setNumCurtida={setNumCurtida} numPresence={numPresence} setNumPresence={setNumPresence} />

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

          <View style={styles.usuariosContainer}>
            <Text style={styles.usuariosTitulo1}>
              {`${numPresence} Usuários marcaram presença`}
            </Text>
            <Text style={styles.usuariosTitulo2}>
              {`${numCurtida} Usuários Curtiram`}
            </Text>
          </View>

          <Comentbar />

          <View style={styles.comentariosContainer}>
          <Pressable style={styles.bttNewComentario} onPress={bttNewCom}>
              <Image
                source={require("../assets/images/icons/bttNewComment.png")}
                style={styles.bttNewComment}
                />
            </Pressable>
            <Image
              source={require("../assets/images/icons/loading.png")}
              style={styles.imagemComentarios}
            />
            <Text style={styles.semComentarios}>
              Sem comentários disponíveis
            </Text>
          </View>

          <Avaliacaobar/>

          <View style={styles.avaNumber}>
            <Text style={styles.numberAvaliar}>
                {`${mediaAvaliacao}`}
            </Text>
          </View>

          <View style={styles.starAva}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Pressable
                key={num}
                onPress={() => {
                  setNumAvaliacao(num);
                  setAvaliacaoEnviada(true); // Passo 2
                }}>
                <Image
                  source={
                    num <= avaliacao
                      ? require("../assets/images/icons/starfull.png")
                      : require("../assets/images/icons/star.png")
                  }
                  style={styles.imgStar}
                />
              </Pressable>
            ))}
          </View>

          {avaliacaoEnviada && (
            <View style={styles.btnEnviarContainer}>
              <Pressable style={styles.btnEnviar} onPress={btnEnviarAva}>
                <Text style={styles.btnTextLow}>Enviar</Text>
              </Pressable>
            </View>
          )}

          <View style={styles.line} />

          <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.square}>
            <Text style={styles.titulo}>{titulo}</Text>
          </ImageBackground>
        </ScrollView>
      </ImageBackground>
      <Navbar  id={id} imgProfile={imgProfile} />
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
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    marginLeft: 16,
    marginVertical: 8,
    top: 375,
    zIndex: 1,
  },

  descricaoTitulo: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "left",
    marginLeft: 0,
    marginRight: 0,
  },

  descricaoTexto: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  dataContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 54,
    top: 320,
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
    marginTop: 3,
    opacity: 0.5,
  },

  siteInfoContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 54,
    top: 220,
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
    marginTop: 3,
    opacity: 0.5,
  },

  tagsContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 54,
    top: 135,
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
    marginTop: 3,
    opacity: 0.5,
  },

  line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -400,
    height: 2,
    opacity: 0.6,
  },

  comentariosContainer: {
    marginVertical: 8,
    top:  130,
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

  bttNewComentario: {
    alignSelf: "end",
    marginRight: 18,
  },

  imagemComentarios: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginVertical: 24,
  },

  bttNewComment: {
    width: 40,
    height: 40,
  },

  semComentarios: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "center",
    alignSelf: "center",
    opacity: 0.7,
  },

  usuariosContainer: {
    marginVertical: 8,
    position: "absolute",
    top: 390,
    left: 15,
    zIndex: 1,
  },

  usuariosTitulo1: {
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "left",
  },

  usuariosTitulo2: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },

  avaNumber: {
    alignSelf: "center",
    top: 180,
  },

  numberAvaliar: {
    color: "white",
    fontSize: 50,
    fontWeight: "inter",
  },

  starAva: {
    alignSelf: "center",
    flexDirection: "row",
    top: 200,
  },

  imgStar: {
    width: 35,
    height: 35,
    marginRight: 5,
    marginLeft: 5,
  },

  btnEnviarContainer: {
    alignSelf: "center",
    top: 225,
  },

  btnEnviar: {
    backgroundColor: "#95003F",
    paddingVertical: 8,
    paddingHorizontal: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    boxShadow: '2px 6px 5px rgba(0,0,0,0.3)',
    top: 12,
  },

  btnTextLow: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
});
