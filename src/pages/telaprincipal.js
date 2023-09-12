import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, Text } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

export default function Telaprincipal(  ) {
  const [reload, setReload] = useState(0);
  const { params } = useRoute();
  const navigation = useNavigation();

  const handleButtonHome = () => {
    setReload(reload + 1);
  };

  const handleButtonSearch = () => {
    navigation.navigate('search');
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

  const handleUserImagePress = () => {
   console.log('Foto de perfil presionada')
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.topBar}>
        <Image source={require('./img/icons/sol.png')} style={styles.topIconSol} />
        <Image source={require('./img/icons/partyuplg.png')} style={styles.topIconPartyup}/>
      </View>

      <Text style={styles.highlightsText}>Destaques</Text>

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

      <TouchableOpacity onPress={handleUserImagePress}>
        <Image
          source={params?.userImage ? { uri: params.userImage } : require('./img/icons/people(f).png')}
          style={styles.userImage}
        />
      </TouchableOpacity>

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

  topBar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    justifyContent: 'space-between',
  },

  topIconSol: {
    width: 45,
    height: 45,
    left: 5,
    top: 24,
    opacity: 0.8,
  },

  topIconPartyup: {
    width: 145,
    height: 25,
    right: 155,
    top: 35,
    opacity: 0.7,
  },

  highlightsText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    bottom: 270,
    right: 115,
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
    width: 75,
    height: 75,
  },

  userImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 325,
    right: 0,
    left: 115,
    borderRadius: 25,
  },
});
