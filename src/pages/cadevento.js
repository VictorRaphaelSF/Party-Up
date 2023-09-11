import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform, Dimensions, TextInput, ScrollView, ImageBackground } from 'react-native';

import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function Logado() {
  const [setnmevento, setNmEvento] = useState('');
  const [descrição, setDescrição] = useState('');
  const [erro, setErro] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const [setendereco, setEndereco] = useState('')

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

  const bttCriarEvento = () => {
    if (!setnmevento || !descrição) {
      setErro('Preencha todos os campos obrigatórios.');
      setTimeout(() => {
        setErro('');
      }, 4000);
    } else {
      setErro('');
      navigation.navigate('termos', { userImage: image });
    }
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

  const handleButtonHome = () => {
    navigation.navigate('telaprincipal');
  };

  const handleButtonSearch = () => {
    console.log('Botão pesquisa pressionado');
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

  const handleUserImagePress = () => {
   console.log('Foto de perfil presionada')
  };

  return (
    <ImageBackground
      source={require('./img/telap2.png')}
      style={styles.container}
      resizeMode="cover"
    >

        <TouchableOpacity style={styles.backButton} onPress={backbutton}>
          <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
        </TouchableOpacity>
        
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
              placeholder="Endereço"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={100}
              value={setendereco}
              onChangeText={setEndereco}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleImagePicker} style={{ top: -415 }}>
          <View style={styles.imageContainer}>
            <Image
              source={image ? { uri: image } : require('./img/icons/layer1.png')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>

        <Text style={styles.textadd}>
            Adicionar Foto
        </Text>

        <TouchableOpacity style={styles.button} onPress={bttCriarEvento}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>

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
        <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={handleButtonHome}>
          <Image source={require('./img/icons/home(g).png')} style={styles.navButtonImage} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navButton, { left: -15 }]} onPress={handleButtonSearch}>
          <Image source={require('./img/icons/search(g).png')} style={styles.navButtonImage} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.circleButton, { bottom: 30 }]} onPress={handleButtonCenter}>
          <Image source={require('./img/icons/add(g).png')} style={styles.circleButtonImage} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navButton, { left: 15 }]} onPress={handleButtonNotification}>
          <Image source={require('./img/icons/notification(g).png')} style={styles.navButtonImage} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleButtonPeople}>
          <Image source={require('./img/icons/people(g).png')} style={styles.navButtonImage} />
        </TouchableOpacity>

      </View>
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
    bottom: 0,
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
    top: 100,
  },

  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.7,
  },

  backButton: {
    marginRight: 16,
    top: 30,
    left: 20,
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

  textadd: {
    color: '#FFFFFF',
    fontSize: 22,
    bottom: 285,
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
