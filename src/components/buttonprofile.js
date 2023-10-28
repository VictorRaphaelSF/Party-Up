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

import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Buttonprofile(props) {
  const navigation = useNavigation();
  const [imgProfile, setImgProfile] = useState("");

  const handleUserImagePress = () => {
    navigation.navigate("telaprofile");
  };

  useEffect(() => {
    axios
      .post("http://localhost:3003/profileUser", {
        userName_code: props.id,
      })
      .then((e) => {
        console.log(e);
        console.log("====================================");
        console.log(props.id);
        console.log(e.data.results);
        console.log("====================================");
        setImgProfile(e.data.results[0].User_image);
      });
  }, []);

  return (
    <View style={styles.topUser}>
      <Pressable onPress={handleUserImagePress}>
        <Image
          source={`data:image/png;base64,${imgProfile}`}
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
