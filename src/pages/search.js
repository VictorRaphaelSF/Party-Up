import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Image, Dimensions, TextInput, KeyboardAvoidingView, Platform, Text, Modal, ScrollView } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Search() {
  const [reload, setReload] = useState(0);
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const storedSearchHistory = await AsyncStorage.getItem('searchHistory');
        if (storedSearchHistory !== null) {
          setSearchHistory(JSON.parse(storedSearchHistory));
        }
      } catch (e) {
        console.error('Erro ao carregar histórico de pesquisa:', e);
      }
    };

    loadSearchHistory();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setSearchHistory([...searchHistory, searchTerm]);

      AsyncStorage.setItem('searchHistory', JSON.stringify([...searchHistory, searchTerm]));

      setReload(reload + 1);
    }
  };

  const handleClearHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
      setSearchHistory([]);
    } catch (e) {
      console.error('Erro ao limpar histórico de pesquisa:', e);
    }
  };
  

  const handleButtonSearch = () => {
    handleSearch();
  };

  const handleButtonHome = () => {
    navigation.navigate('telaprincipal');
  };

  const handleButtonCenter = () => {
    navigation.navigate('cadevento');
  };

  const handleButtonNotification = () => {
    navigation.navigate('notificação');
  };

  const handleButtonPeople = () => {
    console.log('Botão perfil pressionado');
  };

  const handleButtonSuge = () => {
    console.log('Botão Sugestão Pressionado');
  };

  const handleButtonView = () => {
    console.log('Botão View Pressionado.');
  };

  const menu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
    >
      <View style={styles.container}>
        <Image
          source={require('./img/telap.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.searchBarContainer}>
          <Image source={require('./img/icons/search(g).png')} style={styles.icon}/> 
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
          />
          <Pressable style={styles.button} onPress={menu}>
            <View style={styles.bttbarra}></View>
            <View style={styles.bttbarra}></View>
            <View style={styles.bttbarra}></View>
          </Pressable>
        </View>


        <Pressable style={styles.bttView} onPress={handleClearHistory}>
          <Text style={styles.textView}>Apagar tudo</Text>
        </Pressable>

        <ScrollView
        style={styles.termsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.termsContent}
        >
        {searchHistory.map((term, index) => (
        <View style={styles.searchHistoryItemContainer} key={index}>
        <Image source={require('./img/icons/search(g).png')} style={styles.searchHistoryIcon} />
        <Pressable onPress={() => setSearchTerm(term)}>
          <Text style={styles.searchHistoryItem}>{term}</Text>
        </Pressable>
      </View>
        ))}
      </ScrollView>


        <Modal
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
              <Pressable style={styles.menubtt} onPress={() => console.log('Item 1 clicado')}>
                <Text style={styles.menubtttext}>Item 1</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => console.log('Item 2 clicado')}>
                <Text style={styles.menubtttext}>Item 2</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => console.log('Item 3 clicado')}>
                <Text style={styles.menubtttext}>Item 3</Text>
              </Pressable>
            </Animatable.View>
          </Pressable>
        </Modal>

        <View style={styles.navbar}>
          <Pressable style={styles.navButton} onPress={handleButtonHome}>
            <Image source={require('./img/icons/home(g).png')} style={styles.navButtonImage} />
          </Pressable>

          <Pressable style={[styles.navButton, { left: -15 }]} onPress={handleButtonSearch}>
            <Image source={require('./img/icons/search(g).png')} style={styles.navButtonImage} />
          </Pressable>

          <Pressable style={[styles.circleButton, { bottom: 30 }]} onPress={handleButtonCenter}>
            <Image source={require('./img/icons/add(g).png')} style={styles.circleButtonImage} />
          </Pressable>

          <Pressable style={[styles.navButton, { left: 15 }]} onPress={handleButtonNotification}>
            <Image source={require('./img/icons/notification(g).png')} style={styles.navButtonImage} />
          </Pressable>

          <Pressable style={styles.navButton} onPress={handleButtonPeople}>
            <Image source={require('./img/icons/people(g).png')} style={styles.navButtonImage} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#260038',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#380053',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  navButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },

  navButtonImage: {
    width: 20,
    height: 20,
  },

  circleButton: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -27,
  },

  circleButtonImage: {
    width: 70,
    height: 75,
  },

  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#582C74',
    padding: 12,
    position: 'absolute',
    top: 24,
    left: 8,
    right: 54,
    borderRadius: 20,
  },

  searchInput: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },

  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },

  icon: {
    width: 23,
    height: 23,
    marginRight: 12,
    left: 2,
  },

  button: {
    backgroundColor: 'transparent',
    width: 30,
    height: 18,
    bottom: 7,
    left: 50,
  },

  bttbarra: {
    width: 31,
    height: 4,
    backgroundColor: '#7E3CA7',
    borderRadius: 2,
    marginVertical: 3.5,
  },

  bttView: {
    top: 90,
    right: 40,
    position: 'absolute',
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
    paddingVertical: 10,
  },

  menubtttext: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  textView: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.5,
  },

  searchHistoryContainer: {
    position: 'absolute',
    top: 120,
    left: 24, 
  },

  searchHistoryItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  searchHistoryIcon: {
    width: 23,
    height: 23,
    marginRight: 15,
  },

  searchHistoryItem: {
    color: '#FFFFFF',
    fontSize: 16,
    marginVertical: 5,
  },

  termsContainer: {
    position: 'absolute',
    marginTop: windowHeight * 0.12,
    left: 15,
    maxHeight: '80%',
    top: 12,
  },
});
