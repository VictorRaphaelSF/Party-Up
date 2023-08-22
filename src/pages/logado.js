import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';

export default function Logado({ navigation }) {

  const handleVamosLaPress = () => {
    if (!nmusuario || !descrição) {
      setErro('Preencha todos os campos obrigatórios.');
      setTimeout(() => {
        setErro('');
      }, 4000);
    } else {
      setErro('');
      navigation.navigate('cadastropart2');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.bottomImageContainer}>
        <Image
          source={require('./img/img_borda_inicio.png')}
          style={styles.bottomImage}
        />
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
