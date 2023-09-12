import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform, Dimensions, TextInput, ScrollView, ImageBackground } from 'react-native';

import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function Cadevento2() {
  const [nmtelefone, setNmTelefone] = useState('');
  const [sitectt, setSitectt] = useState('');
  const [erro, setErro] = useState('');
  const navigation = useNavigation();
  const [setendereco, setEndereco] = useState('')

  const backbutton = () => {
    navigation.goBack();
  };
  
  const bttCriarEvento = () => {
    if (!nmtelefone || !sitectt) {
      setErro('Preencha todos os campos obrigatórios.');
      setTimeout(() => {
        setErro('');
      }, 4000);
    } else {
      setErro('');
      navigation.navigate('termos', { userImage: image });
    }
  };

  return (
    <ImageBackground
      source={require('./img/telap.png')}
      style={styles.container}
      resizeMode="cover"
    >

        

      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.textInputContainer}>
            <Image source={require('./img/icons/uil_padlock.png')} style={styles.iconuser} />
            <TextInput
              style={styles.textInput}
              placeholder="Numero de Telefone"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={100}
              value={nmtelefone}
              onChangeText={setNmTelefone}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Image source={require('./img/icons/globo.png')} style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Site para contato"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={255}
              value={sitectt}
              onChangeText={setSitectt}
            />
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

        <TouchableOpacity style={styles.button} onPress={bttCriarEvento}>
          <Text style={styles.buttonText}>Criar Evento</Text>
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

        <TouchableOpacity style={styles.backButton} onPress={backbutton}>
          <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
        </TouchableOpacity>
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

  button: {
    backgroundColor: 'rgba(255, 1, 108, 0.4)',
    paddingVertical: 14,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: 230,
  },

  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.7,
  },

  backButton: {
    marginRight: 16,
    bottom: 480,
    right: 150,
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
    bottom: 170,
    position: 'static',

  },

  textInput: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    left: 0,
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
