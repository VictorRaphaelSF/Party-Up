import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Platform,
  Dimensions,
  Modal,
  TextInput,
  ScrollView,
  ImageBackground,
  PanResponder,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

import axios from 'axios';

export default function Cadevento2() {
  const [nmtelefone, setTelefone] = useState('');
  const [sitectt, setSitectt] = useState('');
  const [instagram, setInstagram] = useState('');
  const [infoctt, setInfoctt] = useState('');
  const [searchText, setSearchText] = useState('');
  const [eventtype, setEventtype] = useState('');
  const [accessType, setAccessType] = useState('');

  const [erro, setErro] = useState('');
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isTypeMenuVisible, setTypeMenuVisible] = useState(false);
  const [isAccessTypeMenuVisible, setAccessTypeMenuVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [selectedAccessType, setSelectedAccessType] = useState(null);

  const backbutton = () => {
    navigation.goBack();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setSearchText(option);
    setSelectedEventType(option);
    toggleModal();  
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const openTypeMenu = () => {
    setTypeMenuVisible(true);
  };

  const closeTypeMenu = () => {
    setTypeMenuVisible(false);
  };

  const selectEventType = (type) => {
    setSelectedEventType(type);
    setEventtype(type);
    closeTypeMenu();
  };

  const openAccessTypeMenu = () => {
    setAccessTypeMenuVisible(true);
  };

  const closeAccessTypeMenu = () => {
    setAccessTypeMenuVisible(false);
  };

  const selectAccessType = (accessType) => {
    setSelectedAccessType(accessType);
    setAccessType(accessType);
    closeAccessTypeMenu();
  };

  const InputNum = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
  };
  
  const bttCriarEvento = () => {
    if (!nmtelefone || !sitectt || !accessType) {
      setErro('Preencha todos os campos obrigatórios.');
      setTimeout(() => {
        setErro('');
      }, 4000);
    } else {
      setErro('');
      navigation.navigate('termos', { userImage: image });
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { dy } = gestureState;
        const newMenuVisible = dy < 0;
        setMenuVisible(newMenuVisible);
      },
    })
  ).current; 

  return (
    <ImageBackground
      source={require('./img/telap.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Pressable style={styles.backButton} onPress={backbutton}>
        <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
      </Pressable>
      <View style={styles.overlay} {...panResponder.panHandlers}>
        <View style={styles.content}>
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
              maxLength={255}
              value={infoctt}
              onChangeText={setInfoctt}
            />
          </View>
        </View>
        <View style={styles.searchBarContainer}>
          <Pressable onPress={openMenu}>
            <TextInput
              style={styles.searchInput}
              placeholder="Selecione tags"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={searchText}
            />
          </Pressable>
        </View>
        <View style={styles.searchBarContainerLow}>
          <Pressable onPress={openTypeMenu}>
            <TextInput
              style={styles.searchInput}
              placeholder="Selecionar tipo de evento"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={eventtype}
            />
          </Pressable>
        </View>
        <View style={styles.searchBarContainerLowLow}>
          <Pressable onPress={openAccessTypeMenu}>
            <TextInput
              style={styles.searchInput}
              placeholder="Definir tipo de acesso"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={accessType}
            />
          </Pressable>
        </View>
        <Modal
          style={styles.modalContainer}
          transparent={true}
          visible={isMenuVisible}
          onRequestClose={closeMenu}
        >
          <Pressable onPress={closeMenu} style={styles.modalBackground} >
            <Animatable.View
              style={styles.menuContainer}
              animation={isMenuVisible ? 'slideInUp' : 'slideInDown'}
              duration={500}
            >
              <View style={styles.dragIndicator} />
              <Pressable style={styles.menubtt} onPress={() => selectOption('Rock')}>
                <Text style={styles.menubtttext}>Rock</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => selectOption('Sertanejo')}>
                <Text style={styles.menubtttext}>Sertanejo</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => selectOption('Dança')}>
                <Text style={styles.menubtttext}>Dança</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => selectOption('Teatral')}>
                <Text style={styles.menubtttext}>Teatral</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => selectOption('Religioso')}>
                <Text style={styles.menubtttext}>Religioso</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => selectOption('Funk')}>
                <Text style={styles.menubtttext}>Funk</Text>
              </Pressable>
            </Animatable.View>
          </Pressable>
        </Modal>
        <Modal
          style={styles.modalContainer}
          transparent={true}
          visible={isTypeMenuVisible}
          onRequestClose={closeTypeMenu}
        >
          <Pressable onPress={closeTypeMenu} style={styles.modalBackground} >
            <Animatable.View
              style={styles.menuContainer}
              animation={isTypeMenuVisible ? 'slideInUp' : 'slideInDown'}
              duration={500}
            >
              <View style={styles.dragIndicator} />
              <Pressable style={styles.menubtt} onPress={() => selectEventType('Aniversário')}>
                <Text style={styles.menubtttext}>Aniversário</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => selectEventType('Casamento')}>
                <Text style={styles.menubtttext}>Casamento</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => selectEventType('Conferência')}>
                <Text style={styles.menubtttext}>Conferência</Text>
              </Pressable>
            </Animatable.View>
          </Pressable>
        </Modal>
        <Modal
          style={styles.modalContainer}
          transparent={true}
          visible={isAccessTypeMenuVisible}
          onRequestClose={closeAccessTypeMenu}
        >
          <Pressable onPress={closeAccessTypeMenu} style={styles.modalBackground} >
            <Animatable.View
              style={styles.menuContainer}
              animation={isAccessTypeMenuVisible ? 'slideInUp' : 'slideInDown'}
              duration={500}
            >
              <View style={styles.dragIndicator} />
              <Pressable style={styles.menubtt} onPress={() => selectAccessType('Presencial')}>
                <Text style={styles.menubtttext}>Presencial</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => selectAccessType('Online')}>
                <Text style={styles.menubtttext}>Online</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => selectAccessType('Beneficiente')}>
                <Text style={styles.menubtttext}>Beneficiente</Text>
              </Pressable>
            </Animatable.View>
          </Pressable>
        </Modal>
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
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
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
    top: -265,
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
    top: -300,
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  modalText: {
    fontSize: 22,
    marginBottom: 12,
    textAlign: 'center',
  },  

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'flex-end',
  },

  menuContainer: {
    backgroundColor: '#470F62',
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  dragIndicator: {
    height: 8,
    width: 50,
    backgroundColor: '#000000',
    alignSelf: 'center',
    marginBottom: 16,
    borderRadius: 24,
    opacity: 0.5,
  },

  menubtt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
  },

  menubtttext: {
    color: '#FFFFFF',
    fontSize: 18,
    opacity: 0.7,
  },

  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#582C74',
    padding: 12,
    bottom: 135,
    borderRadius: 10,
  },

  searchBarContainerLow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#582C74',
    padding: 12,
    bottom: 115,
    borderRadius: 10,
  },

  searchBarContainerLowLow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#582C74',
    padding: 12,
    bottom: 95,
    borderRadius: 10,
  },
  
  searchInput: {
    color: '#FFFFFF',
    fontSize: 16,
    width: '150%',
    flex: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
});
