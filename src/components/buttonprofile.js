import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Dimensions,
  Text,
  ScrollView,
  FlatList,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Buttonprofile(props) {
  const navigation = useNavigation();

  const handleUserImagePress = () => {
    navigation.navigate("telaprofile",{id : props.id, imgProfile : props.imgProfile});
  };


  return (
    <View style={styles.topUser}>
      <Pressable onPress={handleUserImagePress}>
        <Image
          source={`data:image/png;base64,${props.imgProfile}`}
          style={styles.userImage}
        />
      </Pressable>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  topUser: {
    flexDirection: "row",
    position: "absolute",
    top: 33,
    right: 22,
    alignItems: "center",
  },

  userImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "black",
  },
});
