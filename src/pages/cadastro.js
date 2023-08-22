import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const Avançar = () => {
    if (!email || !senha || !confirmarSenha || !cpfCnpj || !yearOfBirth || !telefone) {
      setErro('Preencha todos os campos obrigatórios02.');
    } else {
      setErro('');
      navigation.navigate('cadastropart2');
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
  
  return (
    <View style={styles.container}>
      <View style={styles.bottomImageContainer}>
        
        <Image
          source={require('./img/img_borda_inicio.png')}
          style={styles.bottomImage} // Imagem de fundo
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
            maxLength={50} // Caixa de texto "E-mail".
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
            secureTextEntry={!senhaVisivel}
            maxLength={24} // Caixa de texto "Senha".
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

        <View style={styles.textInputContainer}>
          <Image source={require('./img/icons/cadeadoicon.png')} style={styles.lockIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Confirmar Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            secureTextEntry={!confirmarSenhaVisivel}
            maxLength={24} // Caixa de texto "Confirmar Senha".
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
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

        <View style={styles.textInputContainer}>
          <Image source={require('./img/icons/Group.png')} style={styles.lockIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="CPF ou CNPJ"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            maxLength={18} // Caixa de texto "CPF ou CNPJ".
            value={cpfCnpj}
            onChangeText={setCpfCnpj}
          />
        </View>

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
            maxLength={15} // Não esquecer de baixar os ícones das caixas de texto
            value={telefone}
            onChangeText={setTelefone}
          />
        </View>

        {erro !== '' && <Text style={styles.errorMessage}>{erro}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={Avançar}> 
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
    padding: 16,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: { // Design do botão
    backgroundColor: 'rgba(255, 1, 108, 0.4)', 
    paddingVertical: 14,
    paddingHorizontal: Platform.OS === 'web' ? 100 : 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 32,
  },

  buttonText: {
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
    maxWidth: Platform.OS === 'web' ? '100%' : '85%',
    height: Platform.OS === 'web' ? 50 : 55,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginBottom: 13,
    justifyContent: 'center',
    bottom: 35,
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

  errorMessage: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: -16,
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
});
