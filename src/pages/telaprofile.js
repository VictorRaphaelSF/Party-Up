import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Platform, Dimensions, Modal, TouchableWithoutFeedback, } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';



export default function Telaprofile() {
  const navigation = useNavigation();
  const [eventData, setEventData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [name, setName] = useState('');
  const [idade, setIdade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventId, setEventId] = useState(null); 

  const backbutton = () => {
    navigation.goBack();
  };

  const menu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleButtonEdit = () => {
    console.log('Botão edit pressionado', { id: id })
  }

  const handleButtonHome = () => {
    navigation.navigate('telaprincipal', { id: id });
  };

  const handleButtonSearch = () => {
    navigation.navigate('search', { id: id });
  };

  const handleButtonCenter = () => {
    navigation.navigate('cadevento', { id: id });
  };

  const handleButtonNotification = () => {
    navigation.navigate('notificação', { id: id });
  };

  const handleButtonPeople = () => {
    navigation.navigate('telaprofile', { id: id })
  };


  // const route = useRoute();
  // const { id } = route.params;
  // console.log(id);
  // const idUser = {
  // };

  const handleEventImageClick = () => {
    if (eventId) {
      navigation.navigate('evento', { eventId });
    }
  };

  useEffect(() => {
    // axios
    //   .post('url do back', idUser)
    //   .then((response) => {
    //     setProfileImage(response.data.image_url);
    //   })
    //   .catch((error) => {
    //     console.error('Erro ao enviar ou retono de dados para o backend:', error);
    //   });

    axios
      .post('http://localhost:3003/viewEventUser', /*idUser*/)
      .then((response) => {
        console.log(response)
        console.log(response.data.results[0].Nm_event);
        setEventData(response.data.results);
      })
      .catch((error) => {
        console.error('Erro ao enviar ou retono de dados para o backend:', error);
      });
  }, []);


  return (
    <View style={styles.container}>
      <Image
          source={require('./img/telap2.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      <View style={styles.innerCircle}>
        {profileImage && (
          <Image
            source={{ uri: profileImage }}
            style={{ flex: 1, width: '100%', borderRadius: 105 }}
          />
        )}
    </View>

    <View style={styles.titlesContainer}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Seguidores</Text>
      <Text style={styles.number}>0</Text>
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Seguindo</Text>
      <Text style={styles.number}>0</Text>
    </View>
  </View>

      <View style={styles.header}>
        {/* botão de voltar */}
        <Pressable style={styles.backButton} onPress={backbutton}>
          <Image source={require('./img/icons/backicon.png')} style={styles.backIcon} />
        </Pressable>
      </View>

      {/* menu */}
      <Pressable style={styles.button} onPress={menu}>
          <View style={styles.bttbarra}></View>
          <View style={styles.bttbarra}></View>
          <View style={styles.bttbarra}></View>
        </Pressable>
        
        <View style={styles.editButtonContainer}>
        <Pressable style={styles.editButton} onPress={handleButtonEdit}>
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </Pressable>
      </View>
      
       <View style={styles.allContainer}>
       <View styles={styles.nameContainer}>    
        <Text style={styles.titulo}>Victor{name}</Text>
      </View>

       <View styles={styles.nameContainer1}>    
        <Text style={styles.titulo1}>12{idade} Anos</Text>
      </View>
      </View>

       <View styles={styles.descContainer}>    
        <Text style={styles.descricao}>{descricao}</Text>
      </View>

      <View style={styles.line}/>

      <Text style={styles.comentariosTitulo}>Meus eventos</Text>
      
      
      
      <Pressable style={styles.eventImagePlaceholder} onPress={handleEventImageClick}>
      <View style={styles.eventImagePlaceholderInner}>
      {eventImage && (
          <View style={{ width: '100%', height: 200 }}>
            <Image 
            source={params?.userImage ? { uri: eventImage } : require('./img/icons/people(f).png')} 
            style={{ width: '100%', height: '100%', borderRadius: 8 }}
            />
          </View>
      )}
      </View>
      </Pressable>
    

      <Modal
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalBackground}>
            <Animatable.View
              style={styles.menuContainer}
              animation={isMenuVisible ? 'slideInUp' : 'slideInDown'}
              duration={250}
            >
              <Pressable style={styles.menubtt} onPress={() => console.log('Item 1 clicado')}>
                <Text style={styles.menubtttext}>Item 1</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => console.log('Item 2 clicado')}>
                <Text style={styles.menubtttext}>Item 2</Text>
              </Pressable>
              <Pressable style={styles.menubtt} onPress={() => console.log('Item 3 clicado')}>
                <Text style={styles.menubtttext}>Item 3</Text>
              </Pressable>
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      

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

  circle: {
    width: '100%',
    height: 450,
    borderRadius: 220 / 2,
    backgroundColor: 'rgba(123, 85, 85, 0.40)',
    position: 'absolute',
    top: (windowHeight * 0.06) - (397 / 2),
    justifyContent: 'center',
  },

  innerCircle: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 105,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    left: 45,
    top: 100,
  },

  textContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  textContainer1: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
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
    marginRight: 10,
  },

  backIcon: {
    width: 30,
    height: 24,
  },

  button: {
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 30,
    height: 18,
    right: 135,
    top: 55,
  },

  bttbarra: {
    width: 31,
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginVertical: 3.5,
    left: 100,
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

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  menuContainer: {
    backgroundColor: '#470F62',
    padding: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  menubtt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
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

  menubtttext: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  editButtonContainer: {
    position: 'absolute',
    top: 225,
    alignItems: 'center',
    marginTop: 10,
  },

  editButton: {
    backgroundColor: '#7E3CA7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'inter',
  },

  nameContainer: {
    position: 'absolute',
    },

  titulo: {
    right: 135,
    bottom: 55,
    color: 'white',
    fontSize: 20,
    fontWeight: 'inter',
  },

  nameContainer1: {
    position: 'absolute',
    },

  titulo1: {
    right: 55,
    bottom: 75,
    color: '#919191',
    fontSize: 16,
    fontWeight: 'inter',
  },

  descContainer: {
    position: 'absolute',
    },

  descricao: {
    right: 40,
    top: 0,
    color: '#919191',
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'inter',
  },

  allContainer: {
    top: 55,
  },

  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 350,
    height: 2,
    backgroundColor: 'white',
    opacity: 0.6,
  },

  comentariosTitulo: {
    top: 100,
    color: 'white',
    fontSize: 18,
    fontWeight: 'inter',
    textAlign: 'left',
  },

  eventImagePlaceholder: {
    position: 'absolute',
    width: 150,
    height: 100,
    bottom: 175,
    left: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  titlesContainer: {
    position: 'absolute',
    top: 110,
    right: 42,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  
  title: {
    color: 'white',
    fontSize: 14,
    opacity: 0.5,
  },
  
  number: {
    color: '#919191',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  }  
});
