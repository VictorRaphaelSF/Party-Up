import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';

export default function Logado({ navigation }) {
  const handleVamosLaPress = () => {
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomImageContainer}>
        <Image
          source={require('./img/img_borda_inicio.png')}
          style={styles.bottomImage} // Imagem de fundo
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVamosLaPress}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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

  button: { // Design do botão
    backgroundColor: 'rgba(255, 1, 108, 0.4)', 
    paddingVertical: 14,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: windowHeight * 0.04, // Posição responsiva
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
});
