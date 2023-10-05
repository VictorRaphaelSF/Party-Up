import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Platform, Dimensions, TextInput, ScrollView, ImageBackground } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';

export default function Cadevento2() {
  const [nmtelefone, setTelefone] = useState('');
  const [sitectt, setSitectt] = useState('');
  const [instagram, setInstagram] = useState('');
  const [infoctt, setInfoctt] = useState('');

  //Linha abaixo somente para validações.
  const [erro, setErro] = useState('');
  const navigation = useNavigation();

  const backbutton = () => {
    navigation.goBack();
  };

  const InputNum = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
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

      <Pressable style={styles.backButton} onPress={backbutton}>
        <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
      </Pressable>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.textadd}>
            Adicionar informações de contato
          </Text>

          <View style={styles.textInputContainer}>
          <Image source={require('./img/icons/uil_padlock.png')} style={styles.icon} />
          <TextInputMask
            style={styles.textInput}
            placeholder="Telefone(Cel)"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
            }}
            maxLength={15}
            value={nmtelefone}
            onChangeText={(text) => InputNum(text, setTelefone)}
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
            <Image source={require('./img/icons/instagramicon.png')} style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Instagram"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={100}
              value={instagram}
              onChangeText={setInstagram}
            />
          </View>

          <View style={styles.textInputContainer}>
            <Image source={require('./img/icons/info(g).png')} style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Outras informações"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={100}
              value={infoctt}
              onChangeText={setInfoctt}
            />
          </View>
        </View>

        <Pressable style={styles.button} onPress={bttCriarEvento}>
          <Text style={styles.buttonText}>Criar Evento</Text>
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

        <Pressable style={styles.backButton} onPress={backbutton}>
          <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
        </Pressable>
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
    position: 'absolute',
    backgroundColor: 'rgba(255, 1, 108, 0.4)',
    paddingVertical: 14,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    bottom: 50,
  },

  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.7,
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 40 : 50,
    left: 27,
    zIndex: 1,
  },

  backIcon: {
    width: 30,
    height: 24,
  },

  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Platform.OS === 'web' ? '130%' : '80%',
    height: Platform.OS === 'web' ? 55 : 55,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 13,
    top: -300,
  },

  textInput: {
    width: '100%',
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

  textadd: {
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: '#380053',
    padding: 10,
    borderRadius: 24,
    textAlign: 'center',
    width: '125%',
    top: -315,
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
