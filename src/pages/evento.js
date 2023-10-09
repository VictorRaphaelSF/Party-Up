import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, Pressable, Dimensions, Platform, Animated, Easing } from 'react-native';
import axios from 'axios';

export default function Evento( {navigation} ) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
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
    axios.get('Coloque_aqui_a_URL_da_imagem_do_back')
      .then(response => {
        setBackgroundImage({ uri: response.data.url });
      })
      .catch(error => {
        console.error('Erro ao obter a imagem do back end:', error);
      });

    axios.get('Coloque_aqui_a_URL_do_titulo_do_back')
      .then(response => {
        setTitulo(response.data.titulo);
      })
      .catch(error => {
        console.error('Erro ao obter o título do back end:', error);
      });

    axios.get('Coloque_aqui_a_URL_da_descricao_do_back')
      .then(response => {
        setDescricao(response.data.descricao);
      })
      .catch(error => {
        console.error('Erro ao obter a descrição do back end:', error);
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

  return (
    <ImageBackground
      source={backgroundImage || require('./img/telap.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.descricaoContainer}>
        <Text style={styles.descricaoTitulo}>Descrição</Text>
        <Text style={styles.descricaoTexto}>{descricao}</Text>
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
    position: 'absolute',
    top: windowHeight / 2 - 15,
    left: 15,
    zIndex: 1,
  },

  descricaoTitulo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'inter',
    textAlign: 'left',
  },

  descricaoTexto: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    opacity: 0.5,
  },
});
