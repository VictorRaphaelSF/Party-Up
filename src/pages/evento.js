import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, Pressable, Dimensions, Platform, Animated, Easing } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';


export default function Evento( {navigation} ) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [siteInfo, setSiteInfo] = useState('');
  const [tags, setTags] = useState('');

  const [buttonVisible, setButtonVisible] = useState(true);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const spinValue = new Animated.Value(0);
  const [likeImage, setLikeImage] = useState(require('./img/icons/like.png'));

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const startAnimation = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      setIsButtonPressed(false);
      setLikeImage(prev => prev === require('./img/icons/like.png') ? require('./img/icons/liked.png') : require('./img/icons/like.png'));
      spinValue.setValue(0);
    });
  };

  useEffect(() => {
    axios.get('Coloque aqui a URL da imagem do back')
      .then(response => {
        setBackgroundImage({ uri: response.data.url });
      })
      .catch(error => {
        console.error('Erro ao obter a imagem do back end:', error);
      });

    axios.get('Coloque aqui a URL do titulo do back')
      .then(response => {
        setTitulo(response.data.titulo);
      })
      .catch(error => {
        console.error('Erro ao obter o título do back end:', error);
      });

    axios.get('Coloque aqui a URL da descricao do back')
      .then(response => {
        setDescricao(response.data.descricao);
      })
      .catch(error => {
        console.error('Erro ao obter a descrição do back end:', error);
      });

    axios.get('Coloque aqui a URL da data inicio do back')
      .then(response => {
        setDataInicio(response.data.dataInicio);
      })
      .catch(error => {
        console.error('Erro ao obter a data de início do back end:', error);
      });

    axios.get('Coloque aqui a URL da data fim do back')
      .then(response => {
        setDataFim(response.data.dataFim);
      })
      .catch(error => {
        console.error('Erro ao obter a data de fim do back end:', error);
      });
    axios.get('Coloque aqui a URL da hora inicio do back')
      .then(response => {
        setHoraInicio(response.data.HoraInicio);
      })
      .catch(error => {
        console.error('Erro ao obter a hora de inicio do back end:', error);
      });
    axios.get('Coloque aqui a URL da hora fim do back')
      .then(response => {
        setHoraFim(response.data.horaFim);
      })
      .catch(error => {
        console.error('Erro ao obter a hora de finalização do back:', error);
      });
    axios.get('Coloque aqui a URL do site info do backend')
    .then(response => {
      setSiteInfo(response.data.siteInfo);
    })
    .catch(error => {
      console.error('Erro ao obter as informações do site do back end:', error);
    });
    axios.get('Coloque aqui a URL das tags relacionadas do back')
    .then(response => {
      setTags(response.data.tags);
    })
    .catch(error => {
      console.error('Erro ao obter as tags do back end:', error);
    });
  }, []);

  const backbutton = () => {
    navigation.goBack();
  };

  const handleButtonPress = () => {
    setIsButtonPressed(true);
    startAnimation();
  };

  const handleSecondButtonPress = () => {
    navigation.navigate('comentario');
  };

  const handleThirdButtonPress = () => {
    console.log('Terceiro botão pressionado')
  };

  const handleFourthButtonPress = () => {
    console.log('Quarto botão pressionado')
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
        source={backgroundImage || require('./img/telap.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        

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
          - - Entrada Padrão
        </Text>
      </View>

      <View style={styles.siteInfoContainer}>
        <Text style={styles.siteInfoTitulo}>Site para mais informações</Text>
        <Text style={styles.siteInfoTexto}>teste{siteInfo}</Text>
      </View>

      <View style={styles.tagsContainer}>
        <Text style={styles.tagsTitulo}>Tags Relacionadas</Text>
        <Text style={styles.tagsTexto}>teste{tags}</Text>
      </View>

      
      {buttonVisible && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.customButton} onPress={handleButtonPress}>
            <Animated.Image
              source={likeImage}
              style={[styles.icon, { transform: [{ rotate: spin }] }]}
            />
          </Pressable>
          <Text style={styles.buttonTitle1}>Curtir</Text>
          <Pressable style={styles.customButton} onPress={handleSecondButtonPress}>
            <Image source={require('./img/icons/comment.png')} style={styles.icon} />
          </Pressable>
          <Text style={styles.buttonTitle2}>Comentar</Text>
        </View>
      )}
      {buttonVisible && (
        <View style={styles.buttonContainer2}>
          <Pressable style={styles.customButton} onPress={handleThirdButtonPress}>
            <Image source={require('./img/icons/locate.png')} style={styles.icon} />
          </Pressable>
          <Text style={styles.buttonTitle3}>Localização</Text>
          <Pressable style={styles.customButton} onPress={handleFourthButtonPress}>
            <Image source={require('./img/icons/share.png')} style={styles.icon} />
          </Pressable>
          <Text style={styles.buttonTitle4}>Compartilhar</Text>
        </View>
      )}
      <Pressable style={styles.backButton} onPress={backbutton}>
        <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
      </Pressable>
      <View style={styles.square}>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>
      
      </ScrollView>
    </ImageBackground>
    <View style={styles.navbar}>
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
    top: windowHeight / 2 + 245,
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
});
