import React, { useState, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput, Platform, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [emptyFieldError, setEmptyFieldError] = useState('');
  const errorRef = useRef(null);

  const Entrar = async () => {
    if (!email || !senha) {
      setEmptyFieldError('Preencha todos os campos.');
      setTimeout(() => {
        setEmptyFieldError('');
      }, 4000);
      setErro('');
  
      if (errorRef.current) {
        errorRef.current.shake(800);
      }
    } else {
      try {
        const data = {
          email: email,
          senha: senha,
        };
        const response = await axios.post('http://localhost:3003/loginUser', data);
  
        if (response.status === 200 && response.data.validateLogin) {
          console.log(response.data.message);
          navigation.navigate('telaprincipal');
        } else {
          setEmptyFieldError('');
          setErro('Email ou senha incorretos, tente novamente.');
          setSenha('');
          if (errorRef.current) {
            errorRef.current.shake(800);
          }
          setTimeout(() => {
            setErro('');
          }, 4000);
        }
      } catch (error) {
        console.error('Erro ao enviar os dados para o backend:', error);
        setEmptyFieldError('');
        setErro('Erro ao enviar os dados para o backend:');
        setSenha('');
        if (errorRef.current) {
          errorRef.current.shake(800);
        }
        setTimeout(() => {
          setErro('');
        }, 4000);
      }
    }
  };

  const bttnvconta = () => {
    navigation.navigate('cadastro');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./img/telap.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <Animatable.View
        ref={errorRef}
        style={[
          styles.errorBanner,
          { 
            display: erro || emptyFieldError ? 'flex' : 'none',
            borderRadius: 10,
            marginTop: erro || emptyFieldError ? 20 : 0,
          }
        ]}
        animation="shake"
        iterationCount={1}
        duration={800}
      >
        <Text style={styles.errorMessage}>{erro || emptyFieldError}</Text>
      </Animatable.View>

      <View style={styles.content}>
        <View style={styles.textInputContainer}>
          <Image source={require('./img/icons/mailicon.png')} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            maxLength={40}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Image source={require('./img/icons/cadeadoicon.png')} style={styles.lockIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            maxLength={24}
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={Entrar}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={bttnvconta}>
            <Text style={styles.smallButtonText}>Criar nova conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  buttonContainer: {
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'rgba(255, 1, 108, 0.4)',
    maxWidth: '80%',
    paddingVertical: 14,
    paddingHorizontal: Platform.OS === 'web' ? 100 : 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    bottom: -32,
  },

  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.7,
  },

  smallButton: {
    backgroundColor: 'transparent', 
    marginTop: 55,
  },

  smallButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.7,
  },

  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 20,
  },

  textInput: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },

  icon: {
    width: 23,
    height: 23,
    marginRight: 10,
  },

  lockIcon: {
    width: 19,
    height: 19,
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
