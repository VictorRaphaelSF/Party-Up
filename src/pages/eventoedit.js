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
import Backbutton from "../components/backbutton";
import Navbar from "../components/navbar";
import { useRoute } from "@react-navigation/native";

export default function Eventoedit({ navigation }) {
  const [backgroundImage, setBackgroundImage] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [siteInfo, setSiteInfo] = useState("");

  const [telefone, setTelefone] = useState("");
  const [tpEvent, setTpEvent] = useState("");
  const [tpModality, setTpModality] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [instagram, setIntagram] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [rua, setRua] = useState("");
  const [numeroRes, setNumeroRes] = useState("");
  
  console.log(telefone);
  console.log(tpEvent);
  console.log(tpModality);
  console.log(cep);
  console.log(complemento);
  console.log(instagram);
  console.log(moreInfo);
  console.log(bairro);
  console.log(cidade);
  console.log(estado);
  console.log(rua);
  console.log(numeroRes);
  
  const [tags, setTags] = useState("");


  const route = useRoute();
  const { id } = route.params;
  const { idEvento } = route.params;
  const { imgProfile } = route.params;

  console.log(idEvento);
  useEffect(() => {
    const idEvent ={
      eventId_code: idEvento
    }
    axios
      .post('http://localhost:3003/viewEvent',idEvent)
      .then((response) => {
        console.log(response);
        console.log(response.data[0]);
        //nome
        setTitulo(response.data[0].Nm_event);

        // //descrição
        setDescricao(response.data[0].desc_event);


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


        setTelefone(response.data[0].Telefone_event)
        setTpEvent(response.data[0].Tp_Event)
        setTpModality(response.data[0].Tp_Modality)
        setCep(response.data[0].cd_cep)
        setComplemento(response.data[0].complemento)
        setIntagram(response.data[0].instagram_user)
        setMoreInfo(response.data[0].more_info)
        setBairro(response.data[0].nm_bairro)
        setCidade(response.data[0].nm_cidade)
        setEstado(response.data[0].nm_estado)
        setRua(response.data[0].nm_rua)
        setNumeroRes(response.data[0].num_residencia)

        //tag
        // setTags(response.data[0].Tag_event);

      })
      .catch((error) => {
        console.error("Erro ao enviar os dados para o backend:", error);
      });
  }, []);

  

  const handleButtonDelete = () => {
    
  }
  const handleButtonEdit = () => {
    navigation.navigate('eventoedit2',{id: id, imgProfile: imgProfile, idEvento: idEvento})
  }

  const handleButtonHome = () => {
    navigation.navigate('telaprincipal',{id: id, imgProfile: imgProfile})
  };

  const handleButtonSearch = () => {
    navigation.navigate('search',{id: id, imgProfile: imgProfile});
  };

  const handleButtonCenter = () => {
    navigation.navigate('cadevento', {id : id, imgProfile: imgProfile});
  };

  const handleButtonNotification = () => {
    navigation.navigate('notificação',{id: id, imgProfile: imgProfile});
  };

  const handleButtonPeople = () => {
    console.log('Botão perfil pressionado');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage || require("../assets/images/telanexist.png")}
        style={styles.backgroundImage}
        resizeMode="cover">
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
               {dataInicio} Entre {dataFim}
            </Text>
            <Text style={styles.dataTexto2}>
              {horaInicio} - {horaFim}
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

          <View style={styles.line} />

          <View style={styles.comentariosContainer}>
            <Text style={styles.comentariosTitulo}>Comentários</Text>
            <Image
              source={require("../assets/images/icons/loading.png")}
              style={styles.imagemComentarios}
            />
            <Text style={styles.semComentarios}>
              Sem comentários disponíveis
            </Text>
          </View>

          <View style={styles.line3} />

          <View style={styles.line2} />
          <Backbutton/>
          <View style={styles.square}>
            <Text style={styles.titulo}>{titulo}</Text>
          </View>

          <View style={styles.editButtonContainer}>
            <Pressable style={styles.editButton} onPress={handleButtonDelete}>
              <Text style={styles.editButtonText}>Excluir</Text>
            </Pressable>
            <Pressable style={styles.editButton} onPress={handleButtonEdit}>
              <Text style={styles.editButtonText}>Editar evento</Text>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
      <Navbar id={id} imgProfile= {imgProfile}/>
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
    bottom: -550,
    height: 2,
    backgroundColor: "white",
    opacity: 0.6,
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
    position: "absolute",
    top: windowHeight / 2 + 300,
    left: 15,
    zIndex: 1,
  },

  comentariosTitulo: {
    top: 70,
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
    top: 65,
    width: 100,
    height: 100,
    left: 70,
    alignSelf: "center",
    marginTop: 30,
  },

  semComentarios: {
    top: 55,
    color: "white",
    fontSize: 18,
    fontWeight: "inter",
    textAlign: "center",
    left: 60,
    marginTop: 25,
    opacity: 0.7,
  },

  editButtonContainer: {
    flexDirection: 'row',
    top: 115,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal:  50,
  },

  editButton: {
    backgroundColor: "#7E3CA7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },

  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "inter",
  },
});
