import React, { useEffect, useState, useRef  } from 'react';
import { StyleSheet, View, TextInput,Text, Image, ImageBackground, Pressable, Dimensions, Platform, Animated, Easing } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';


export default function Eventoedit2( {navigation} ) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [siteInfo, setSiteInfo] = useState('');
  const [tags, setTags] = useState('');
  const [tituloWidth, setTituloWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [tituloNovo, setTituloNovo] = useState('');
  const [descricaoNovo, setDescricaoNovo] = useState('');
  const [dataInicioNovo, setDataInicioNovo] = useState('');
  const [dataFimNovo, setDataFimNovo] = useState('');
  const [horaInicioNovo, setHoraInicioNovo] = useState('');
  const [horaFimNovo, setHoraFimNovo] = useState('');
  const [siteInfoNovo, setSiteInfoNovo] = useState('');
  const [tagsNovo, setTagsNovo] = useState('');
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
  
  useEffect(() => {
    const id ={
      eventId_code: 1
    }
    axios
      .post('http://localhost:3003/viewEvent',id)
      .then((response) => {
        console.log(response.data[0])
        //nome
        setTitulo(response.data[0].Nm_event);

        //descrição
        setDescricao(response.data[0].desc_event);

        //data início
        const dataB = new Date(response.data[0].Dt_begin);
        const anoB = dataB.getFullYear();
        const mesB = String(dataB.getMonth() + 1).padStart(2, "0");
        const diaB= String(dataB.getDate()).padStart(2, "0");
        const horaB = String(dataB.getHours()).padStart(2, "0");
        const minutoB = String(dataB.getMinutes()).padStart(2, "0");

        const dtFormatB = (diaB + '-' + mesB + '-' + anoB);
        const hrFormatB = (horaB + ':' + minutoB);
        
        setDataInicio(dtFormatB);
        setHoraInicio(hrFormatB);

        //data fim
        const dataE = new Date(response.data[0].Dt_end);
        const anoE = String(dataE.getFullYear()).padStart(2, "0");
        const mesE = String(dataE.getMonth() + 1).padStart(2, "0");
        const diaE= String(dataE.getDate()).padStart(2, "0");
        const horaE = String(dataE.getHours()).padStart(2, "0");
        const minutoE = String(dataE.getMinutes()).padStart(2, "0");

        const dtFormatE = (diaE + '-' + mesE+ '-' + anoE);
        const hrFormatE = (horaE + ':' + minutoE);
        
        setDataFim(dtFormatE);
        setHoraFim(hrFormatE);

        //site
        setSiteInfo(response.data[0].Site_contact);

        //tag
        setTags(response.data[0].Tag_event);





        //navigation.navigate('telaprincipal',{id: id});
      })
      .catch((error) => {
        console.error('Erro ao enviar os dados para o backend:', error);
      });
  }, []);
 

  const backbutton = () => {
    navigation.goBack();
  };

  const handleButtonHome = () => {
    navigation.navigate('telaprincipal')
  };

  const handleButtonSearch = () => {
    navigation.navigate('search');
  };

  const handleButtonCenter = () => {
    navigation.navigate('cadevento');
  };

  const handleButtonNotification = () => {
    navigation.navigate('notificação');
  };

  const handleButtonPeople = () => {
    console.log('Botão perfil pressionado');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage || require('./img/telanexist.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.overlay}>
        <View style={styles.descricaoContainer}>
        <View style={styles.tituloContainer}>
            <Text style={styles.descricaoTitulo}>Descrição</Text>
            <Image
            source={require('./img/icons/pencil(g).png')}
            style={styles.imagemTitulo}
            />
        </View>
        <Text style={styles.descricaoTexto}>{descricao}</Text>
        </View>
        </View>

        <View style={styles.dataContainer}>
        <View style={styles.tituloContainer}>
            <Text style={styles.dataTitulo}>Data e horarios</Text>
            <Image
            source={require('./img/icons/pencil(g).png')}
            style={styles.imagemTitulo}
            />
        </View>
        <Text style={styles.dataTexto}>
            Entre {dataInicio} - {dataFim}
        </Text>
        <Text style={styles.dataTexto2}>
            {horaInicio} - {horaFim} - Entrada Padrão
        </Text>
        </View>

        <View style={styles.siteInfoContainer}>
        <View style={styles.tituloContainer}>
            <Text style={styles.siteInfoTitulo}>Site para mais informações</Text>
            <Image
            source={require('./img/icons/pencil(g).png')}
            style={styles.imagemTitulo}
            />
        </View>
        <Text style={styles.siteInfoTexto}>{siteInfo}</Text>
        </View>

        <View style={styles.tagsContainer}>
        <View style={styles.tituloContainer}>
            <Text style={styles.tagsTitulo}>Tags Relacionadas</Text>
            <Image
            source={require('./img/icons/pencil(g).png')}
            style={styles.imagemTitulo}
            />
        </View>
        <Text style={styles.tagsTexto}>{tags}</Text>
        </View>

      <View style={styles.line} />

      <View style={styles.comentariosContainer}>
        <Text style={styles.comentariosTitulo}>Comentários</Text>
      <Image
        source={require('./img/icons/loading.png')}
        style={styles.imagemComentarios}
      />
      <Text style={styles.semComentarios}>Sem comentários disponíveis</Text>
    </View>

    <View style={styles.line3} />

    <View style={styles.line2} />
  
      <Pressable style={styles.backButton} onPress={backbutton}>
        <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
      </Pressable>
      <View style={styles.square}>
      <Image
        source={require('./img/icons/pencil(g).png')}
        style={[styles.imagemTitulo1, { left: imagemTituloLeft }]}
        />
        <Text
        style={styles.titulo}
        ref={(ref) => {
            if (ref) {
            ref.measure((x, y, width, height, pageX, pageY) => {
                setTituloWidth(width);
            });
            }
        }}
        >{titulo}</Text>
        </View>
      
      </ScrollView>
    </ImageBackground>
    <View style={styles.navbar} zIndex={2}>
          <Pressable style={styles.navButton} onPress={handleButtonHome}>
            <Image source={require('./img/icons/home(g).png')} style={styles.navButtonImage} />
          </Pressable>

          <Pressable style={[styles.navButton, { left: -15 }]} onPress={handleButtonSearch}>
            <Image source={require('./img/icons/search(g).png')} style={styles.navButtonImage} />
          </Pressable>

          <Pressable style={[styles.circleButton, { bottom: 30 }]} onPress={handleButtonCenter}>
            <Image source={require('./img/icons/add(g).png')} style={styles.circleButtonImage} />
          </Pressable>

          <Pressable style={[styles.navButton, { left: 15 }]} onPress={handleButtonNotification}>
            <Image source={require('./img/icons/notification(g).png')} style={styles.navButtonImage} />
          </Pressable>

          <Pressable style={styles.navButton} onPress={handleButtonPeople}>
            <Image source={require('./img/icons/people(g).png')} style={styles.navButtonImage} />
          </Pressable>
        </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  backgroundImage: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  square: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 275,
    backgroundColor: 'black',
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    position: 'absolute',
    left: 15,
    bottom: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'inter',
    textAlign: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 35,
    left: 27,
    zIndex: 1,
  },

  backIcon: {
    width: 30,
    height: 24,
  },

  buttonContainer: {
    position: 'absolute',
    top: 290,
    left: 22,
    flexDirection: 'row',
    zIndex: 1,
  },

  buttonContainer2: {
    position: 'absolute',
    top: 290,
    right: 22,
    flexDirection: 'row',
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
    position: 'absolute',
    right: 18,
    top: 75,
    color: 'white',
    fontSize: 12,
    marginRight: -10,
  },

  buttonTitle1: {
    position: 'absolute',
    right: 124,
    top: 75,
    color: 'white',
    fontSize: 12,
    marginRight: -10,
  },

  buttonTitle2: {
    position: 'absolute',
    right: 28,
    top: 75,
    color: 'white',
    fontSize: 12,
    marginRight: -10,
  },

  buttonTitle3: {
    position: 'absolute',
    right: 108,
    top: 75,
    color: 'white',
    fontSize: 12,
    marginRight: -10,
  },

  buttonTitle4: {
    position: 'absolute',
    right: 18,
    top: 75,
    color: 'white',
    fontSize: 12,
    marginRight: -10,
  },


  descricaoContainer: {
    marginVertical: 8,
    position: 'absolute',
    top: windowHeight / 2 +  -10,
    left: 15,
    zIndex: 1,
  },

  descricaoTitulo: {
    position: 'relative',
    color: 'white',
    fontSize: 18,
    fontWeight: 'inter',
    textAlign: 'left',
  },

  descricaoTexto: {
    position: 'relative',
    color: 'white',
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'inter',
    textAlign: 'left',
  },

  dataTexto: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  dataTexto2: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  siteInfoContainer: {
    marginVertical: 8,
    position: 'absolute',
    top: windowHeight / 2 + 175,
    left: 15,
    zIndex: 1,
  },

  siteInfoTitulo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'inter',
    textAlign: 'left',
  },

  siteInfoTexto: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  tagsContainer: {
    marginVertical: 8,
    position: 'absolute',
    top: windowHeight / 2 + 225,
    left: 15,
    zIndex: 1,
  },
  
  tagsTitulo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'inter',
    textAlign: 'left',
  },
  
  tagsTexto: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },

  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#380053',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  navButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },

  navButtonImage: {
    width: 20,
    height: 20,
  },

  circleButton: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -27,
  },

  circleButtonImage: {
    width: 70,
    height: 75,
  },

  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -530,
    height: 2,
    backgroundColor: 'white',
    opacity: 0.6,
  },

  line2: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -890,
    height: 2,
    backgroundColor: 'white',
    opacity: 0.6,
  },

  line3: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -790,
    height: 2,
    backgroundColor: 'white',
    opacity: 0.6,
  },

  comentariosContainer: {
    marginVertical: 8,
    position: 'absolute',
    top: windowHeight / 2 + 300,
    left: 15,
    zIndex: 1,
  },
  
  comentariosTitulo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'inter',
    textAlign: 'left',
  },
  
  comentarioItem: {
    marginTop: 10,
    opacity: 0.5,
  },
  
  comentarioTexto: {
    color: 'white',
    fontSize: 16,
  },

  imagemComentarios: {
    width: 100,
    height: 100,
    left: 70,
    alignSelf: 'center',
    marginTop: 30,
  },

  semComentarios: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'inter',
    textAlign: 'center',
    left: 60,
    marginTop: 25,
    opacity: 0.7,
  },

  imagemTitulo1: {
    position: 'absolute',
    left: 0,
    bottom: 12,
    width: 30,
    height: 30,
  },
  
  tituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  imagemTitulo: {
    marginLeft: 10, // Ajuste conforme necessário
    width: 20, // Ajuste conforme necessário
    height: 20, // Ajuste conforme necessário
  },
  
});
