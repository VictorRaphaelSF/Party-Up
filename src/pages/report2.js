import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions, Pressable, Image, TextInput, Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Report2({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setSearchText(option);
    toggleModal();  
    setMenuVisible(false);
  };

  const Avancarbtt = () => {
    if (selectedOption) {
      navigation.navigate('report3');
    }
  };

  const backbutton = () => {
    navigation.goBack();
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  

  return (
    <ImageBackground
      source={require('./img/telanexist.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={backbutton}>
            <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Animatable.Image
            animation="fadeInUp"
            source={require('./img/icons/report.png')}
            style={styles.reportlogo}
          />

          <Animatable.View animation="fadeInUp">
            <Text style={styles.title}>Conte o que você viu?</Text>
          </Animatable.View>
          
          <View style={styles.searchBarContainer}>
            <Pressable onPress={openMenu}>
              <TextInput
                style={styles.searchInput}
                placeholder="Selecione uma opção"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={searchText}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.vamosLaButtonContainer}>
        <Animatable.View delay={700} animation="fadeInUp" style={styles.vamosLaButton}>
          <Pressable style={styles.button} onPress={Avancarbtt}>
            <Text style={styles.buttonText}>Avançar</Text>
          </Pressable>
        </Animatable.View>
      </View>
      
      <Modal
        style={styles.modalContainer}
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={closeMenu}
      >
        <Pressable onPress={closeMenu} style={styles.modalBackground}>
          <Animatable.View
            style={styles.menuContainer}
            animation={isMenuVisible ? 'slideInUp' : 'slideInDown'}
            duration={500}
          >
            <Pressable style={styles.menubtt} onPress={() => selectOption('Instabilidade')}>
              <Text style={styles.menubtttext}>Instabilidade</Text>
            </Pressable>
            <Pressable style={styles.menubtt} onPress={() => selectOption('Desempenho')}>
              <Text style={styles.menubtttext}>Desempenho</Text>
            </Pressable>
            <Pressable style={styles.menubtt} onPress={() => selectOption('Segurança')}>
              <Text style={styles.menubtttext}>Segurança</Text>
            </Pressable>
            <Pressable style={styles.menubtt} onPress={() => selectOption('Bug ou erro')}>
              <Text style={styles.menubtttext}>Bug ou erro</Text>
            </Pressable>
          </Animatable.View>
        </Pressable>
      </Modal>

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
    justifyContent: 'flex-start',
    top: 24,
    alignItems: 'center',
    padding: 16,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: windowHeight * 0.06,
    left: 30,
    zIndex: 1,
  },

  reportlogo: {
    width: 60,
    height: 57,
    opacity: 0.8,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    top: 24,
  },

  backButton: {
    left: 8,
    bottom: 14,
  },

  backIcon: {
    width: 30,
    height: 24,
  },

  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '150%',
    backgroundColor: '#582C74',
    padding: 12,
    position: 'absolute',
    top: 150,
    borderRadius: 10,
  },

  searchInput: {
    color: '#FFFFFF',
    fontSize: 16,
    width: '140%',
    flex: 1,
    paddingLeft: 10,
    borderRadius: 5,
    textAlign: 'center',
  },

  button: {
    backgroundColor: 'rgba(255, 1, 108, 0.4)',
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 10,
    position: 'absolute',
    bottom: windowHeight * 0.04,
  },

  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
  },

  vamosLaButtonContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
    alignItems: 'center',
    padding: 16,
  },

  vamosLaButton: {
    position: 'absolute',
    bottom: 18,
    alignItems: 'center',
    width: '100%',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  menuContainer: {
    backgroundColor: '#470F62',
    padding: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
});
