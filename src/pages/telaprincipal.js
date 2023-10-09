import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Image, Dimensions, Text, ScrollView } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Telaprincipal() {
  const [reload, setReload] = useState(0);
  const { params } = useRoute();
  const navigation = useNavigation();

  const handleButtonHome = () => {
    setReload(reload + 1);
  };

  const handleButtonSearch = () => {
    navigation.navigate('search');
  };


  const route = useRoute();
  const { id } = route.params;
  console.log(id);
  const handleButtonCenter = () => {
    navigation.navigate('cadevento', {id : id});
  };

  const handleButtonNotification = () => {
    navigation.navigate('notificação');
  };

  const handleButtonPeople = () => {
    console.log('Botão perfil pressionado');
  };

  const handleUserImagePress = () => {
   console.log('Foto de perfil pressionada')
  };


  

  axios
      .post('http://localhost:3003/viewEvent')
      .then((response) => {
        console.log(response);

      })
      .catch((error) => {
        console.error('Erro ao enviar ou retono de dados para o backend:', error);
      });

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require('./img/icons/sol.png')} style={styles.topIconSol} />
        <Image source={require('./img/icons/partyuplg.png')} style={styles.topIconPartyup}/>
      </View>
      
      <View style={styles.topUser}>
      <Pressable onPress={handleUserImagePress}>
        <Image
          source={params?.userImage ? { uri: params.userImage } : require('./img/icons/people(f).png')}
          style={styles.userImage}
        />
      </Pressable>
      </View>

      <Text style={styles.highlightsText}>Destaques</Text>

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
  },

  topUser: {
    flexDirection: 'row',
    position: 'absolute',
    top: 33,
    right: 22,
    alignItems: 'center',
  },

  userImage: {
    width: 45,
    height: 45, 
    borderRadius: 25,
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
    left: 12,
    top: 35,
    opacity: 0.7,
  },

  highlightsText: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 22,
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    top: 80,  
    right: 115,
  },

  carousel: {
    alignItems: 'center',
    paddingVertical: 12,
    bottom: 170,
    marginVertical: 0,
  },

  carouselImage: {
    width: 100,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 6,
    marginVertical: 0,
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
});
