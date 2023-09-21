import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Platform, Dimensions, TextInput, ScrollView, ImageBackground } from 'react-native';

import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function Cadevento() {
  const [setnmevento, setNmEvento] = useState('');
  const [descrição, setDescrição] = useState('');
  const [erro, setErro] = useState('');
  const [image, setImage] = useState(null);
  const [cep, setEndereco] = useState('')
  const [numero, setCep] = useState('')
  const navigation = useNavigation();

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const backbutton = () => {
    navigation.goBack();
  };

  
  const renderCaracteresRestantes = () => {
    const caracteresRestantes = 255 - descrição.length;
    const corCaracteres = caracteresRestantes === 0 ? '#FF0000' : 'rgba(255, 255, 255, 0.5)';
    return (
      <Text style={{ color: corCaracteres }}>
        {caracteresRestantes}
      </Text>
    );
  };
  
  const eventData = {
    nmEvent : setnmevento,
    descricao : descrição,
    cep: cep,
    numero: numero,
    uri : "imagem.png"
  }

  const bttCriarEvento = () => {
    if (!setnmevento || !descrição || !image || !cep || !numero) {
      setErro('Preencha todos os campos obrigatórios.');
      setTimeout(() => {
        setErro('');
      }, 4000);
    } else {
        setErro('');
        axios.post('http://localhost:3003/cadEvent', eventData)
        .then(response => {
        // Lidar com a resposta do servidor, se necessário
    
        console.log(response);
        navigation.navigate('telaprincipal', { userImage: image });
    })
    .catch(error => {
    // Lidar com erros, se houver algum
      console.error('Erro ao enviar os dados para o backend:', error);
    });
    }
  };

  return (
    <ImageBackground
      source={require('./img/telap2.png')}
      style={styles.container}
      resizeMode="cover"
    >

      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.textInputContainer}>
            <Image source={require('./img/icons/Group.png')} style={styles.iconuser} />
            <TextInput
              style={styles.textInput}
              placeholder="Nome de usuario"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={100}
              value={setnmevento}
              onChangeText={setNmEvento}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Image source={require('./img/icons/page.png')} style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Descrição"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={255}
              value={descrição}
              onChangeText={setDescrição}
            />
            <Text style={styles.caracteresRestantes}>
              {renderCaracteresRestantes()}
            </Text>
          </View>

          <View style={styles.textInputContainer}>
            <Image source={require('./img/icons/location.png')} style={styles.iconlocation} />
            <TextInput
              style={styles.textInput}
              placeholder="CEP"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={100}
              value={cep}
              onChangeText={setEndereco}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Image source={require('./img/icons/home.png')} style={styles.iconhome} />
            <TextInput
              style={styles.textInput}
              placeholder="Numero"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={100}
              value={numero}
              onChangeText={setCep}
            />
          </View>
        </View>

        <Pressable style={styles.backButton} onPress={backbutton}>
          <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
        </Pressable>

        <Pressable onPress={handleImagePicker} style={{ top: -455 }}>
          <View style={styles.imageContainer}>
            <Image
              source={image ? { uri: image } : require('./img/icons/layer1.png')}
              style={styles.image}
            />
          </View>
        </Pressable>

        <Text style={styles.textadd}>
            Adicionar Foto
        </Text>

        <Pressable style={styles.button} onPress={bttCriarEvento}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>

        

        {erro !== '' && (
          <Animatable.View
            style={[
              styles.errorBanner,
              {
                display: erro ? 'flex' : 'none',
                borderRadius: 10,
                marginTop: erro ? 20 : 0,
              },
            ]}
            animation="shake"
            iterationCount={1}
            duration={800}
          >
            <Text style={styles.errorMessage}>{erro}</Text>
          </Animatable.View>
        )}
    </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 120,
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
    left: '50%',
    marginLeft: -20,
  },

  circleButtonImage: {
    width: 70,
    height: 75,
  },

  button: {
    backgroundColor: 'rgba(255, 1, 108, 0.4)',
    paddingVertical: 14,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: 80,
  },

  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.7,
  },

  backButton: {
    bottom: 335,
    right: 144,
  },

  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: Platform.OS === 'web' ? '100%' : '85%',
    height: Platform.OS === 'web' ? 50 : 55,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 13,
    justifyContent: 'center',
    bottom: -150,
    position: 'static',

  },

  textInput: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },

  icon: {
    width: 19,
    height: 24,
    marginRight: 16,
    left: 3,
  },

  iconuser: {
    width: 23,
    height: 23,
    marginRight: 14,
  },

  iconlocation: {
    width: 20,
    height: 28,
    marginRight: 14,
    opacity: 0.8,
  },

  iconhome: {
    width: 22,
    height: 22,
    marginRight: 14,
    opacity: 0.8,
  },

  textadd: {
    color: '#FFFFFF',
    fontSize: 22,
    bottom: 325,
    opacity: 0.7,
  },

  errorBanner: {
    backgroundColor: '#FF0000',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
  },

  errorMessage: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  caracteresRestantes: {
    fontSize: 12,
    marginLeft: 10,
  },

  imageContainer: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100,
    overflow: 'hidden',
    top: 102,
  },

  image: {
    width: 200,
    height: 200,
  },
});
