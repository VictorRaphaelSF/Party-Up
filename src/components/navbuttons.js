import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Pressable,
  Dimensions,
  Platform,
  Animated,
  Easing,
} from "react-native";
import axios from "axios";

export default function Navbuttons() {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const spinValue = new Animated.Value(0);
  const navigation = useNavigation();
  const [likeImage, setLikeImage] = useState(
    require("../assets/images/icons/like.png")
  );
  const [numCurtida, setNumCurtida] = useState("");
    
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
    
  const startAnimation = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsButtonPressed(false);
      setLikeImage((prev) =>
        prev === require("../assets/images/icons/like.png")
          ? require("../assets/images/icons/liked.png")
          : require("../assets/images/icons/like.png")
      );
      spinValue.setValue(0);
    });
  };

  const route = useRoute();
	const { id } = route.params;
	const { idEvento } = route.params;
  console.log(id, idEvento);

  const like = {
    Id_user_code : id, 
    Id_App_Events_code : idEvento
  }

  const handleButtonPress = () => {
      setIsButtonPressed(true);
      startAnimation();
      axios
      .post('http://localhost:3003/likeEvent', like)
      .then((response) => {
        console.log(response);
        axios
        .post('http://localhost:3003/likeCount', like)
        .then((response) => {
        console.log(response);
        setNumCurtida(response.data.numberLikes)
        }).then(()=>{
          console.log("funfo "+ numCurtida);
        })
        .catch((error) => {
          console.error('Erro ao enviar os dados para o backend:', error);
        
        });
      })
      .catch((error) => {
        console.error('Erro ao enviar os dados para o backend:', error);
      
      });
  };
    
  const handleSecondButtonPress = () => {
    navigation.navigate("comentario");
  };

  const handleThirdButtonPress = () => {
    console.log("Terceiro botão pressionado");
  };

  const handleFourthButtonPress = () => {
    console.log("Quarto botão pressionado");
  };

  useEffect(() => {0,
    axios
      .post('http://localhost:3003/likeCount', like)
      .then((response) => {
      console.log(response);
      setNumCurtida(response.data.numberLikes)
      })
      .catch((error) => {
        console.error('Erro ao enviar os dados para o backend:', error);
      
      });
    console.log("funfo "+ numCurtida);
  }, []);
return (
    <View>
            {buttonVisible && (
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.customButton}
                onPress={handleButtonPress}>
                <Animated.Image
                  source={likeImage}
                  style={[styles.icon, { transform: [{ rotate: spin }] }]}
                />
                <Text style={styles.buttonTitle}>Curtir</Text>
                <Text style={styles.buttonTitle}>{numCurtida}</Text>
              </Pressable>
              
              <Pressable
                style={styles.customButton}
                onPress={handleSecondButtonPress}>
                <Image
                  source={require("../assets/images/icons/comment.png")}
                  style={styles.icon}
                />
                <Text style={styles.buttonTitle}>Comentar</Text>
              </Pressable>
              
              <Pressable
                style={styles.customButton}
                onPress={handleThirdButtonPress}>
                <Image
                  source={require("../assets/images/icons/locate.png")}
                  style={styles.icon}
                />
                <Text style={styles.buttonTitle}>Localização</Text>
              </Pressable>
              
              <Pressable
                style={styles.customButton}
                onPress={handleFourthButtonPress}>
                <Image
                  source={require("../assets/images/icons/share.png")}
                  style={styles.icon}
                />
                <Text style={styles.buttonTitle}>Compartilhar</Text>
              </Pressable>
            </View>
          )}
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
      buttonContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 100,
        left: 0,
        marginHorizontal: 12,
      },

      customButton: {
        marginHorizontal: 10,
      },

      buttonTitle: {
        flexDirection: 'row',
        right: 5,
        top: 12,
        color: "white",
        fontSize: 12,
        marginRight: -10,
        alignSelf: 'center',
      },

      icon: {
        width: 65,
        height: 65,
      },
});