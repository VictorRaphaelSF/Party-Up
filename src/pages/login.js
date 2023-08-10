import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput, Platform } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [emptyFieldError, setEmptyFieldError] = useState('');

  const Entrar = () => {
    if (email === 'admin@partyup.com' && senha === 'admin') { // Email e senha de acesso
      navigation.navigate('logado');
    } else {
      if (!email || !senha) {
        setEmptyFieldError('Preencha todos os campos.');
        setErro(''); // Limpa a mensagem de erro principal
      } else {
        setEmptyFieldError('');
        setErro('Email ou senha incorretos. Por favor, tente novamente.');
        setSenha(''); // Isto limpa a caixa de texto após o usuario digitar errrado
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomImageContainer}>
        <Image
          source={require('./img/img_borda_inicio.png')}
          style={styles.bottomImage}
        />
      </View> 

      <View style={styles.content}>
        <View style={styles.textInputContainer}>
          <Image source={require('./img/icons/mailicon.png')} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            maxLength={40} // limita a quantidade de caracteres do usuario.
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
            maxLength={24} // limita a quantidade de caracteres do usuario.
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {emptyFieldError !== '' && <Text style={styles.errorMessage}>{emptyFieldError}</Text>}
        {erro !== '' && !emptyFieldError && <Text style={styles.errorMessage}>{erro}</Text>}

        <TouchableOpacity style={styles.button} onPress={Entrar}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#260038',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: { // Botão "Entrar"
    backgroundColor: 'rgba(255, 1, 108, 0.4)',
    maxWidth: '80%',
    paddingVertical: 14,
    paddingHorizontal: Platform.OS === 'web' ? 100 : 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    bottom: -32,
  },

  buttonText: { // Texto que esta dentro do botão
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.7,
  },

  bottomImageContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '52%',
    backgroundColor: 'transparent',
  },

  bottomImage: {
    width: Platform.OS === 'web' ? '100%' : '108%',
    height: '100%',
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

  icon: { // icone que esta dentro do TextInput(caixa de texto)
    width: 23,
    height: 23,
    marginRight: 10,
  },

  lockIcon: { //icone que esta dentro do TextInput(caixa de texto)
    width: 19,
    height: 19,
    marginRight: 10,
  },

  errorMessage: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 7,
  },
});
