import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Platform, Dimensions, ImageBackground, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Cadastropart3({ navigation }) {
  const circleRef = useRef(null);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.slideInDown(2000);
    }
  }, []);

  return (
    <ImageBackground
      source={require('./img/telap.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animatable.View
          ref={circleRef}
          style={styles.circle}
          animation="slideInDown"
          duration={1000}
        >
          <Image
            source={require('./img/icons/check(g).png')}
            style={styles.circleImage}
          />
          <Text style={styles.circleText}>Cadastro concluído</Text>
        </Animatable.View>
        <View style={styles.content}>
        </View>
      </View>
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
    backgroundColor: 'transparent', 
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  circle: {
    width: '125%',
    aspectRatio: 1,
    backgroundColor: 'rgba(123, 85, 85, 0.40)',
    borderRadius: 220,
    alignSelf: 'center',
    position: 'absolute',
    top: '15%',
    marginTop: -220,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleImage: {
    width: 200,
    height: 200,
    borderRadius: 60,
    bottom: -22,
  },

  circleText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#FFFFFF',
    bottom: -50,
  },

  content: {
    flex: 1,
  },
});
