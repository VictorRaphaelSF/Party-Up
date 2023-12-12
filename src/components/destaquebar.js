import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Destaquebar({ }) {
  const navigation = useNavigation();

    const eventosTemporarios = [
        require("../assets/images/Eventos(Temporarios)/Evento(1).png"),
        require("../assets/images/Eventos(Temporarios)/Evento(2).png"),
        require("../assets/images/Eventos(Temporarios)/Evento(3).png"),
        require("../assets/images/Eventos(Temporarios)/Evento(1).png"),
        require("../assets/images/Eventos(Temporarios)/Evento(2).png"),
        require("../assets/images/Eventos(Temporarios)/Evento(3).png"),
      ];

      const btnDestaque1 = () => {
        navigation.navigate("eventoteste1");
      };

      const btnDestaque2 = () => {
        navigation.navigate("eventoteste2");
      };

      const btnDestaque3 = () => {
        navigation.navigate("eventoteste3");
      };


return (
    <View style={styles.destaqueBar}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      <Pressable onPress={btnDestaque1} style={styles.btnDestaqueBar}>
        <View style={styles.carouselItem}>
          <Image source={require("../assets/images/Eventos(Temporarios)/Evento(1).png")} style={styles.carouselImage} />
        </View>
      </Pressable>
      <Pressable onPress={btnDestaque2} style={styles.btnDestaqueBar}>
        <View style={styles.carouselItem}>
          <Image source={require("../assets/images/Eventos(Temporarios)/Evento(2).png")} style={styles.carouselImage} />
        </View>
      </Pressable>
      <Pressable onPress={btnDestaque3} style={styles.btnDestaqueBar}>
        <View style={styles.carouselItem}>
          <Image source={require("../assets/images/Eventos(Temporarios)/Evento(3).png")} style={styles.carouselImage} />
        </View>
      </Pressable>
      <Pressable onPress={btnDestaque1} style={styles.btnDestaqueBar}>
        <View style={styles.carouselItem}>
          <Image source={require("../assets/images/Eventos(Temporarios)/Evento(1).png")} style={styles.carouselImage} />
        </View>
      </Pressable>
      <Pressable onPress={btnDestaque2} style={styles.btnDestaqueBar}>
        <View style={styles.carouselItem}>
          <Image source={require("../assets/images/Eventos(Temporarios)/Evento(2).png")} style={styles.carouselImage} />
        </View>
      </Pressable>
      <Pressable onPress={btnDestaque3} style={styles.btnDestaqueBar}>
        <View style={styles.carouselItem}>
          <Image source={require("../assets/images/Eventos(Temporarios)/Evento(3).png")} style={styles.carouselImage} />
        </View>
      </Pressable>
    </ScrollView>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    destaqueBar: {
        top: 30,
      },

      btnDestaqueBar: {
        display: 'flex',
        flexDirection: "row",
      },  

      scrollViewContent: {
        left: 12,
        paddingVertical: 16,
        maxWidth: 375,
      },

      carouselItem: {
        marginRight: 12,
      },

      carouselImage: {
        width: 100,
        height: 200,
        borderRadius: 10,
      },
});