import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [senhaIcon, setSenhaIcon] = useState(require('./img/icons/eye.png'));
  const [confirmarSenhaIcon, setConfirmarSenhaIcon] = useState(require('./img/icons/eye.png'));
  const [confirmarSenhaErro, setConfirmarSenhaErro] = useState(false);


  const InputNum = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
  };

  const formatarData = (data) => {
    const regex = /^(\d{2})(\d{2})(\d{4})$/;
    const match = data.match(regex);
  
    if (match) {
      return `${match[1]}/${match[2]}/${match[3]}`;
    }
  
    return data;
  };

  const handleDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      if (isUnderage(selected)) {
        setYearOfBirth('');
        setErro('Você deve ter pelo menos 18 anos de idade.');
      } else {
        setSelectedDate(selected);
        const formattedDate = `${selected.getDate()}/${selected.getMonth() + 1}/${selected.getFullYear()}`;
        setYearOfBirth(formattedDate);
        setErro('');
      }
    }
  };
  
  const isUnderage = (date) => {
    const today = new Date();
    const ageLimit = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return date > ageLimit;
  };
  
  const backbutton = () => {
    navigation.goBack();
  };
  
  const validarSenha = (senhaConfirmacao) => {
    if (senha !== senhaConfirmacao) {
      setConfirmarSenhaErro(true);
    } else {
      setConfirmarSenhaErro(false);
    }
  };
  
  let userData;

  try {
    userData = {
      email: email,
      senha: senha,
      cpfCnpj: cpfCnpj,
      dataNas: "2020-02-01",
      telefone: telefone,
    };
  } catch (error) {
    console.error('Ocorreu um erro ao criar o objeto userData:', error);
    // Trate o erro conforme necessário.
  }

  const Avancar = () => {
    if (!email || !senha || !confirmarSenha || !cpfCnpj  || !telefone || confirmarSenhaErro) {
      setErro('Preencha todos os campos obrigatórios.');
      setTimeout(() => {
        setErro('');
      }, 4000);
    } else {
      setErro('');
      navigation.navigate('cadastropart2', {userData});
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./img/telap.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

        <TouchableOpacity style={styles.backButton} onPress={backbutton}>
          <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
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

      <View style={styles.content}>
        <View style={styles.textInputContainer}>
          <Image source={require('./img/icons/mailicon.png')} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            maxLength={255}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.textInputContainerLock}>
          <Image source={require('./img/icons/cadeadoicon.png')} style={styles.lockIconSenha} />
          <TextInput
            style={styles.textInputSenha}
            placeholder="Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            secureTextEntry={!senhaVisivel}
            maxLength={24}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity
            onPress={() => {
              setSenhaVisivel(!senhaVisivel);
              setSenhaIcon(senhaVisivel ? require('./img/icons/eye.png') : require('./img/icons/eyeclosed.png'));
            }}
          >
            <Image source={senhaIcon} style={styles.rightIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.textInputContainerLock}>
          <Image source={require('./img/icons/cadeadoicon.png')} style={styles.lockIconSenha} />
          <TextInput
            style={[
              styles.textInputSenha,
              confirmarSenhaErro ? styles.inputError : null,
            ]}
            placeholder="Confirmar Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            secureTextEntry={!confirmarSenhaVisivel}
            maxLength={24}
            value={confirmarSenha}
            onChangeText={(text) => {
              setConfirmarSenha(text);
              validarSenha(text);
            }}
            onBlur={() => validarSenha(confirmarSenha)}
          />
          <TouchableOpacity
            onPress={() => {
              setConfirmarSenhaVisivel(!confirmarSenhaVisivel);
              setConfirmarSenhaIcon(confirmarSenhaVisivel ? require('./img/icons/eye.png') : require('./img/icons/eyeclosed.png'));
            }}
          >
            <Image source={confirmarSenhaIcon} style={styles.rightIcon} />
          </TouchableOpacity>
        </View>

        {confirmarSenhaErro && (
          <Text style={styles.errorText}>As senhas não coincidem.</Text>
        )}

        <View style={styles.textInputContainer}>
          <Image source={require('./img/icons/Group.png')} style={styles.lockIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="CPF ou CNPJ"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            maxLength={14}
            value={cpfCnpj}
            onChangeText={(text) => InputNum(text, setCpfCnpj)}
          />
        </View>

        {Platform.OS === 'web' ? (
          <View style={styles.textInputContainer}>
            <Image source={require('./img/icons/Vector.png')} style={styles.lockIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              maxLength={10}
              value={yearOfBirth}
              onChangeText={(text) => setYearOfBirth(text)}
              onBlur={() => setYearOfBirth(formatarData(yearOfBirth))}
            />
          </View>
        ) : (
          <View style={styles.textInputContainer}>
            <Image source={require('./img/icons/Vector.png')} style={styles.lockIcon} />
            <TouchableOpacity
              style={styles.textInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.placeholderText, yearOfBirth ? {} : styles.activePlaceholder]}>
                {yearOfBirth || 'DD/MM/AAAA'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        )}

        <View style={styles.textInputContainer}>
          <Image source={require('./img/icons/uil_padlock.png')} style={styles.lockIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Telefone(Cel)"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            maxLength={15}
            value={telefone}
            onChangeText={(text) => InputNum(text, setTelefone)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={Avancar}>
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#260038',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === 'web' ? 0 : 16,
  },

  backgroundImage: {
    flex: 1,
    width: Platform.OS === 'web' ? '100%' : '109%',
    height: Platform.OS === 'web' ? '100%' : '108%',
    position: 'absolute',
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 55 : 50,
    left: 27,
    zIndex: 1,
  },

  backIcon: {
    width: 30,
    height: 24,
  },

  button: {
    backgroundColor: 'rgba(255, 1, 108, 0.4)',
    paddingVertical: 14,
    paddingHorizontal: Platform.OS === 'web' ? 100 : 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: 150,
  },

  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: Platform.OS === 'web' ? '100%' : '80%',
    height: Platform.OS === 'web' ? 55 : 55,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 13,
    justifyContent: 'center',
    bottom: 35,
    position: 'static',
  },

  textInputContainerLock: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: Platform.OS === 'web' ? 210 : '80%',
    height: Platform.OS === 'web' ? 55 : 55,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 13,
    justifyContent: 'center',
    bottom: 35,
    position: 'static',
  },
  
  textInput: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },

  textInputSenha: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    left: Platform.OS === 'web' ? 0 : 0,
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

  lockIconSenha: {
    width: 19,
    height: 19,
    marginRight: Platform.OS === 'web' ? 10 : 10,
  },

  inputError: {
    borderBottomColor: 'red',
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

  rightIcon: {
    width: 28,
    height: 21,
    marginLeft: -28,
  },

  placeholderText: {
    color: '#FFFFFF',
  },

  activePlaceholder: {
    color: 'rgba(255, 255, 255, 0.5)',
  },

  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -20,
    bottom: -200,
  },
});
