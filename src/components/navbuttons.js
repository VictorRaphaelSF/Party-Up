import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Animated,
  Easing,
} from "react-native";

export default function Navbuttons() {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [likeButtonText, setLikeButtonText] = useState("Curtir");
  const [presenceButtonText, setPresenceButtonText] = useState("Agendar");
  const [isLikeButtonPressed, setIsLikeButtonPressed] = useState(false);
  const [isPresenceButtonPressed, setIsPresenceButtonPressed] = useState(false);
  const spinValueLike = new Animated.Value(0);
  const spinValuePresence = new Animated.Value(0);
  const [likeImage, setLikeImage] = useState(
    require("../assets/images/icons/like.png")
  );
  const [presenceImage, setPresenceImage] = useState(
    require("../assets/images/icons/calendar_time.png")
  );

  const spinLike = spinValueLike.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spinPresence = spinValuePresence.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const startLikeAnimation = () => {
    Animated.timing(spinValueLike, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsLikeButtonPressed(false);
      setLikeImage((prev) =>
        prev === require("../assets/images/icons/like.png")
          ? require("../assets/images/icons/liked.png")
          : require("../assets/images/icons/like.png")
      );
      spinValueLike.setValue(0);
      setLikeButtonText(prev => prev === "Curtir" ? "Curtido" : "Curtir");
    });
  };
  
  const startPresenceAnimation = () => {
    Animated.timing(spinValuePresence, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsPresenceButtonPressed(false);
      setPresenceImage((prev) =>
        prev === require("../assets/images/icons/calendar_time.png")
          ? require("../assets/images/icons/calendar_finished.png")
          : require("../assets/images/icons/calendar_time.png")
      );
      spinValuePresence.setValue(0);
      setPresenceButtonText(prev => prev === "Agendar" ? "Agendado" : "Agendar");
    });
  };
  

  const handleLikeButtonPress = () => {
    setIsLikeButtonPressed(true);
    startLikeAnimation(spinValueLike, setIsLikeButtonPressed, setLikeImage);
  };

  const handlePresenceButtonPress = () => {
    setIsPresenceButtonPressed(true);
    startPresenceAnimation(spinValuePresence, setIsPresenceButtonPressed, setPresenceImage);
  };

  const handleThirdButtonPress = () => {
    console.log("Terceiro botão pressionado");
  };

  const handleFourthButtonPress = () => {
    console.log("Quarto botão pressionado");
  };

  return (
    <View>
      {buttonVisible && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.customButton} onPress={handleLikeButtonPress}>
            <Animated.Image
              source={likeImage}
              style={[
                styles.icon, 
                { 
                  transform: [{ rotate: `${spinLike._value}deg` }],
                  transition: "transform 0.3s ease-in-out",
                }
              ]}
            />
            <Text style={styles.buttonTitle}>{likeButtonText}</Text>
          </Pressable>

          <Pressable style={styles.customButton} onPress={handlePresenceButtonPress}>
            <Animated.Image
              source={presenceImage}
              style={[
                styles.icon, 
                { 
                  transform: [{ rotate: `${spinPresence._value}deg` }],
                  transition: "transform 0.3s ease-in-out",
                }
              ]}
            />
            <Text style={styles.buttonTitle}>{presenceButtonText}</Text>
          </Pressable>

          <Pressable style={styles.customButton} onPress={handleThirdButtonPress}>
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

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: 100,
    left: 0,
    marginHorizontal: 12,
  },
  customButton: {
    marginHorizontal: 10,
  },
  buttonTitle: {
    flexDirection: "row",
    right: 5,
    top: 12,
    color: "white",
    fontSize: 12,
    marginRight: -10,
    alignSelf: "center",
  },
  icon: {
    width: 65,
    height: 65,
  },
});
