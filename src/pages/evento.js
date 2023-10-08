import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, Pressable, Dimensions, Platform} from 'react-native';
import axios from 'axios';

export default function Evento() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [buttonVisible, setButtonVisible] = useState(true);

  useEffect(() => {
    axios.get('Essa parte precisa colocar a url da imagem que esta no back')
      .then(response => {
        setBackgroundImage({ uri: response.data.url });
      })
      .catch(error => {
        console.error('Erro ao obter a imagem do back end:', error);
      });

    axios.get('Essa parte precisa colocar a url do titulo que esta no back')
      .then(response => {
        setTitulo(response.data.titulo);
      })
      .catch(error => {
        console.error('Erro ao obter o título do back end:', error);
      });
  }, []);

  const backbutton = () => {
    navigation.goBack();
  };

  const handleButtonPress = () => {
    console.log('Primeiro botão pressionado')
  };

  const handleSecondButtonPress = () => {
    console.log('Segundo botão pressionado')
  };

  const handleThirdButtonPress = () => {
    console.log('Terceiro botão pressionado')
  };

  const handleFourthButtonPress = () => {
    console.log('Quarto botão pressionado')
  };

  return (
    <ImageBackground
      source={backgroundImage || require('./img/telap.png')}
      style={styles.container}
      resizeMode="cover"
    >
      {buttonVisible && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.customButton} onPress={handleButtonPress}>
            <Image source={require('./img/icons/like.png')} style={styles.icon} />
          </Pressable>
          <Pressable style={styles.customButton} onPress={handleSecondButtonPress}>
            <Image source={require('./img/icons/comment.png')} style={styles.icon} />
          </Pressable>
        </View>
      )}
      {buttonVisible && (
        <View style={styles.buttonContainer2}>
          <Pressable style={styles.customButton} onPress={handleThirdButtonPress}>
            <Image source={require('./img/icons/locate.png')} style={styles.icon} />
          </Pressable>
          <Pressable style={styles.customButton} onPress={handleFourthButtonPress}>
            <Image source={require('./img/icons/share.png')} style={styles.icon} />
          </Pressable>
        </View>
      )}
      <Pressable style={styles.backButton} onPress={backbutton}>
        <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
      </Pressable>
      <View style={styles.square}>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>
      <View style={styles.overlay}></View>
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
    left: 25,
    flexDirection: 'row',
    zIndex: 1,
  },

  buttonContainer2: {
    position: 'absolute',
    top: 290,
    right: 25,
    flexDirection: 'row',
    zIndex: 1,
  },

  customButton: {
    marginHorizontal: 10, // Ajusta o espaçamento entre os botões
  },

  icon: {
    width: 65,
    height: 65,
  },
});
