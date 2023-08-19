import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';

import * as Animatable from 'react-native-animatable';

export default function Index({ navigation }) {
  const VamosLa = () => {
    navigation.navigate('login');
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
        <Animatable.Image
          animation="fadeInUp"
          source={require('./img/logo_partyup.png')}
          style={styles.logo} // Logo "Party-Up"
        />
      </View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.vamosLaButton}>
      <TouchableOpacity style={styles.button} onPress={VamosLa}>
        <Text style={styles.buttonText}>Vamos lá</Text>
      </TouchableOpacity>
      </Animatable.View>
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

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleButton: {
    position: 'absolute',
    top: 40,
    right: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 1,
  },

  titleButtonText: {
    fontSize: 22,
    color: 'rgba(255, 1, 108, 0.4)',
  },

  button: { 
    backgroundColor: 'rgba(255, 1, 108, 0.4)', 
    paddingVertical: 14,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: windowHeight * 0.04,
  },

  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.7,
  },

  logo: {
    width: 270,
    height: 270,
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

  vamosLaButton: {
    position: 'absolute',
    bottom: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
