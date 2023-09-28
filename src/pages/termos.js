import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Platform, Dimensions, ScrollView, ImageBackground } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { CurrentRenderContext, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';


export default function Termos() {
  const navigation = useNavigation();
  const route = useRoute();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollViewRef = useRef(null);
  const [termsAccepted, setTermsAccepted] = useState(false);


  const backbutton = () => {
    navigation.goBack();
  };

  const handleScroll = (event) => {
    const position = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const windowHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollPercentage = (position / (contentHeight - windowHeight)) * 100;
    setScrollPosition(scrollPercentage);
  };

  console.log(route.params.userData);
  
  const userData = route.params && route.params.userData ? route.params.userData : {};
  console.log(userData)


  
  // const userData = route.params.userData;


  const acceptTerms = () => {
    axios
      .post('http://localhost:3003/cadUser', userData)
      .then((response) => {
        console.log(response);
        setTermsAccepted(true); // Marcando os termos como aceitos
        navigation.navigate('telaprincipal', { userImage: route.params.userImage });
      })
      .catch((error) => {
        console.error('Erro ao enviar os dados para o backend:', error);
      });
  };
  

  return (
    <ImageBackground
      source={require('./img/telap.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={backbutton}>
            <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
          </Pressable>
          
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Termos de uso</Text>
          </View>

        <View style={styles.linha}></View>

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          style={styles.termsContainer}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <Text style={styles.termsText}>
          Aceitação dos Termos: Ao acessar e utilizar a Party Up, você concorda em cumprir e ficar vinculado por estes Termos de Uso, bem como quaisquer termos adicionais ou políticas referenciadas aqui. Se você não concorda com estes termos, por favor, não utilize nossos serviços.

          Uso da Plataforma: Você deve utilizar a Party Up apenas para fins legais e de acordo com estes Termos de Uso. Você concorda em não realizar nenhuma ação que possa comprometer a segurança ou a integridade do sistema, interferir com o uso adequado da plataforma por outros usuários ou violar qualquer lei aplicável.

          Responsabilidade: A Party Up não assume nenhuma responsabilidade por danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do uso ou incapacidade de uso de nossos serviços. Fornecemos a plataforma "como está" e não garantimos a precisão, confiabilidade ou completude de qualquer conteúdo ou informações presentes na plataforma.

          Compartilhamento de Dados: Ao utilizar a Party Up, você reconhece e concorda que podemos coletar certos dados e informações sobre seu uso dos serviços. Essas informações podem incluir dados pessoais, que serão tratados de acordo com nossa Política de Privacidade. Respeitamos sua privacidade e faremos esforços razoáveis para proteger suas informações, conforme descrito em nossa Política de Privacidade.

          Direitos Autorais: Todo o conteúdo disponibilizado na Party Up, incluindo textos, imagens, logotipos, vídeos e outros materiais, está protegido por direitos autorais e pertence à Party Up ou a terceiros licenciadores. Ao aceitar você concorda em respeitar todos os direitos autorais e outras leis de propriedade intelectual aplicáveis.

          Alterações nos Termos de Uso: Podemos atualizar estes Termos de Uso periodicamente. Recomendamos que você reveja esta página regularmente para estar ciente de quaisquer alterações. O uso continuado do Party Up após a publicação de alterações constitui a sua aceitação dessas alterações.

          Rescisão: Reservamo-nos o direito de rescindir ou suspender o seu acesso à Party Up a qualquer momento, por qualquer motivo, sem aviso prévio.

          Lei Aplicável: Estes Termos de Uso são regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa decorrente ou relacionada a estes Termos de Uso será submetida à jurisdição exclusiva dos tribunais competentes do Republica Federativa do Brasil.
          </Text>
          <View style={styles.acceptButton}>
          <Pressable onPress={acceptTerms}>
            <Text style={styles.acceptButtonText}>Aceitar Termos</Text>
          </Pressable>
          </View>
        </ScrollView>
        <Animatable.View
          animation={scrollPosition < 100 ? 'fadeInUp' : 'fadeOut'}
          duration={700}
          style={styles.progressBarContainer}
        >
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>{Math.round(scrollPosition)}%</Text>
            <View style={styles.progressBarBackground}></View>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${
                    scrollPosition > 60 ? 60 : scrollPosition
                  }%`,
                },
              ]}
            ></View>
          </View>
        </Animatable.View>
      </View>
    </ImageBackground>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: windowHeight * 0.06,
    left: 30,
    zIndex: 1,
  },

  backButton: {
    marginRight: 0,
  },

  backIcon: {
    width: 30,
    height: 24,
  },

  title: {
    fontSize: 19,
    color: '#FFFFFF',
    width: Platform.OS === 'web' ? 200 : 0,
  },

  titleContainer: {
    alignItems: 'center',
    left: 35,
    top: 45,
  },

  linha: {
    width: Platform.OS === 'web' ? '100%' : '108%',
    height: 1,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: windowHeight * 0.12,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  termsContainer: {
    flex: 1,
    paddingHorizontal: 22,
    marginTop: windowHeight * 0.12,
  },

  termsText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 24,
  },

  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  progressCircle: {
    width: 170,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#380053',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -127,
  },

  progressText: {
    color: '#FFFFFF',
    fontSize: 16,
    position: 'relative',
    left: -50,
  },

  progressBarBackground: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    bottom: 27,
    left: 60,
    right: 10,
    borderRadius: 12,
  },

  progressBar: {
    height: 4,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 27,
    left: 60,
    right: 0,
    borderRadius: 12,
  },

  acceptButton: {
    backgroundColor: 'rgba(255, 1, 108, 0.4)',
    paddingVertical: 14,
    paddingHorizontal: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    bottom: windowHeight * 0.01,
  },

  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    opacity: 0.9,
  },
});
