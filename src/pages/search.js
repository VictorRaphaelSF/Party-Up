import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

export default function Search(  ) {
  const [reload, setReload] = useState(0);
  const { params } = useRoute();
  const navigation = useNavigation();

  const handleButtonHome = () => {
    setReload(reload + 1);
  };

  const handleButtonSearch = () => {
    console.log('Botão pesquisa pressionado');
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
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={handleButtonHome}>
          <Image source={require('./img/icons/home(g).png')} style={styles.navButtonImage} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navButton, { left: -15 }]} onPress={handleButtonSearch}>
          <Image source={require('./img/icons/search(g).png')} style={styles.navButtonImage} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.circleButton, { bottom: 30 }]} onPress={handleButtonCenter}>
          <Image source={require('./img/icons/add(g).png')} style={styles.circleButtonImage} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navButton, { left: 15 }]} onPress={handleButtonNotification}>
          <Image source={require('./img/icons/notification(g).png')} style={styles.navButtonImage} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleButtonPeople}>
          <Image source={require('./img/icons/people(g).png')} style={styles.navButtonImage} />
        </TouchableOpacity>
      </View>
    </View>
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
});
