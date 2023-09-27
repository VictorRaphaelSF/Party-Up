import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Image, Dimensions, TextInput, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback,Modal } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Search() {
  const [reload, setReload] = useState(0);
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleButtonHome = () => {
    navigation.navigate('telaprincipal');
  };

  const handleButtonSearch = () => {
    setReload(reload + 1);
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
    console.log('Botão Sugestão Pressionado')
  };

  const handleButtonView = () => {
    console.log('Botão View Pressionado.')
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
        />
        <Pressable style={styles.button} onPress={menu}>
          <View style={styles.bttbarra}></View>
          <View style={styles.bttbarra}></View>
          <View style={styles.bttbarra}></View>
        </Pressable>
      </View>

      <Pressable style={styles.bttSuge} onPress={handleButtonSuge}>
        <Text style={styles.textSuge}>Sugestões</Text>
      </Pressable>

      <Pressable style={styles.bttView} onPress={handleButtonView}>
        <Text style={styles.textView}>Ver tudo</Text>
      </Pressable>

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

        <Pressable style={styles.navButton} onPress={handleButtonNotification}>
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
    marginLeft: -32,
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

  bttSuge: {
    position: 'absolute',
    bottom: 290,
    left: -400,
  },

  textSuge: {
    position: 'absolute',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },

  bttView: {
    bottom: 310,
    left: 130,
  },

  textView: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});
