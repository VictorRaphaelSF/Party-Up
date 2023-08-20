import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform, Dimensions, TextInput, ImageBackground } from 'react-native'; // Importe o ImageBackground
import * as Animatable from 'react-native-animatable';

export default function Logado({ navigation }) {
  const [nmusuario, setNmusuario] = useState('');
  const [descrição, setDescrição] = useState('');
  const [erro, setErro] = useState('');

  const handleVamosLaPress = () => {
    if (!nmusuario || !descrição) {
      setErro('Preencha todos os campos obrigatórios.');
      setTimeout(() => {
        setErro('');
      }, 4000);
    } else {
      setErro('');
      navigation.navigate('cadastropart2');
    }
  };

  return (
    <ImageBackground
      source={require('./img/telap.png')}
      style={styles.container}
      resizeMode="cover" // Defina resizeMode como "cover"
    >
      <View style={styles.overlay}>
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

        <View style={styles.content}>
          <View style={styles.textInputContainer}>
            <Image source={require('./img/icons/Group.png')} style={styles.iconuser} />
            <TextInput
              style={styles.textInput}
              placeholder="Nome de usuario"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={100}
              value={nmusuario}
              onChangeText={setNmusuario}
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
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVamosLaPress}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
  },

  button: {
    backgroundColor: 'rgba(255, 1, 108, 0.4)',
    paddingVertical: 14,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: windowHeight * 0.04,
  },

  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.7,
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
  },

  textInput: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },

  icon: {
    width: 19,
    height: 24,
    marginRight: 14,
  },

  iconuser: {
    width: 23,
    height: 23,
    marginRight: 10,
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
});
