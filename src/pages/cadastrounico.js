import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput, Platform, KeyboardAvoidingView, Dimensions } from 'react-native';
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
  const [confirmarSenhaErro, setConfirmarSenhaErro] = useState(true);

  const InputNum = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
  };

  const Avançar = () => {
    const navigation = useNavigation();

    if (!email || !senha || !confirmarSenha || !cpfCnpj || !yearOfBirth || !telefone || confirmarSenhaErro) {
      setErro('Preencha todos os campos obrigatórios.');
      setTimeout(() => {
        setErro('');
      }, 4000);
    } else {
      setErro('');

      let screenToNavigate = 'cad2';

      switch (algumaCondicao) {
        case 'condicao1':
          screenToNavigate = 'tela1';
          break;
        case 'condicao2':
          screenToNavigate = 'tela2';
          break;
        default:
          break;
      }

      if (screenToNavigate) {
        navigation.navigate(screenToNavigate);
      }
    }
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

  return (
    <View style={styless.container}>
      <Image
        source={require('./img/telap.png')}
        style={styless.backgroundImage}
        resizeMode="cover"
      />

        <TouchableOpacity style={styless.backButton} onPress={backbutton}>
          <Image source={require('./img/icons/backicon.png')} style={styless.backIcon} />
        </TouchableOpacity>

      {erro !== '' && (
        <Animatable.View
          style={[
            styless.errorBanner,
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
          <Text style={styless.errorMessage}>{erro}</Text>
        </Animatable.View>
      )}

      <View style={styless.content}>
        <View style={styless.textInputContainer}>
          <Image source={require('./img/icons/mailicon.png')} style={styless.icon} />
          <TextInput
            style={styless.textInput}
            placeholder="E-mail"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            maxLength={255}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styless.textInputContainer}>
          <Image source={require('./img/icons/cadeadoicon.png')} style={styless.lockIcon} />
          <TextInput
            style={styless.textInput}
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
            <Image source={senhaIcon} style={styless.rightIcon} />
          </TouchableOpacity>
        </View>

        <View style={styless.textInputContainer}>
          <Image source={require('./img/icons/cadeadoicon.png')} style={styless.lockIcon} />
          <TextInput
            style={[
              styless.textInput,
              confirmarSenhaErro ? styless.inputError : null,
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
            <Image source={confirmarSenhaIcon} style={styless.rightIcon} />
          </TouchableOpacity>
        </View>

        {confirmarSenhaErro && (
          <Text style={styless.errorText}>As senhas não coincidem.</Text>
        )}

        <View style={styless.textInputContainer}>
          <Image source={require('./img/icons/Group.png')} style={styless.lockIcon} />
          <TextInput
            style={styless.textInput}
            placeholder="CPF ou CNPJ"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            maxLength={14}
            value={cpfCnpj}
            onChangeText={(text) => InputNum(text, setCpfCnpj)}
          />
        </View>

        <View style={styless.textInputContainer}>
          <Image source={require('./img/icons/Vector.png')} style={styless.lockIcon} />
          <TouchableOpacity
            style={styless.textInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[styless.placeholderText, yearOfBirth ? {} : styless.activePlaceholder]}>
              {yearOfBirth || 'DD/MM/AAAA'}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        )}

        <View style={styless.textInputContainer}>
          <Image source={require('./img/icons/uil_padlock.png')} style={styless.lockIcon} />
          <TextInput
            style={styless.textInput}
            placeholder="Telefone(Cel)"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            maxLength={15}
            value={telefone}
            onChangeText={(text) => InputNum(text, setTelefone)}
          />
        </View>
      </View>

      <TouchableOpacity style={styless.button} onPress={Avançar}>
        <Text style={styless.buttonText}>Avançar</Text>
      </TouchableOpacity>
    </View>
    );
}

const styless = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#260038',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      
    },
  
    backgroundImage: {
      flex: 1,
      width: '109%',
      height: '108%',
      position: 'absolute',
    },
  
    content: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    backButton: {
      position: 'absolute',
      top: 50,
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
      top: 140,
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
      bottom: 35,
      position: 'static',
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
      marginLeft: 12,
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

export function cad2() {
  const [nmusuario, setNmusuario] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const [image, setImage] = useState(null);
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

  const handleVamosLaPress = () => {
    if (!nmusuario || !descricao) {
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
    const caracteresRestantes = 255 - descricao.length;
    const corCaracteres = caracteresRestantes === 0 ? '#FF0000' : 'rgba(255, 255, 255, 0.5)';
    return (
      <Text style={{ color: corCaracteres }}>
        {caracteresRestantes}
      </Text>
    );
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
              value={descricao}
              onChangeText={setDescricao}
            />
            <Text style={styles.caracteresRestantes}>
              {renderCaracteresRestantes()}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleImagePicker} style={{ top: -375 }}>
          <View style={styles.imageContainer}>
            <Image
              source={image ? { uri: image } : require('./img/icons/layer1.png')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleVamosLaPress}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
    top: 175,
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