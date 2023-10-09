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
        console.error('Erro ao obter a hora de finalização do back end:', error);
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

  const windowHeight = Dimensions.get('window').height;

  return (
    <ImageBackground
      source={backgroundImage || require('./img/telap.png')}
      style={styles.container}
      resizeMode="cover"
    >
      
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
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
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
});
