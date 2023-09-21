import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Image, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Search() {
  const [reload, setReload] = useState(0);
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

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
        <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        underlineColorAndroid="transparent"
        value={searchTerm}
        onChangeText={setSearchTerm}
        />
      </View>

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
    width: '110%',
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
    marginLeft: -20,
  },

  circleButtonImage: {
    width: 70,
    height: 75,
  },

  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#582C74',
    padding: 10,
    position: 'absolute',
    top: 24,
    left: 5,
    right: 5,
    zIndex: 1,
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
});
