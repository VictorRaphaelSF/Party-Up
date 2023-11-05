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

import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function DestaqueBar() {

    const eventosTemporarios = [
        require("../assets/images/Eventos(Temporarios)/Evento(1).png"),
        require("../assets/images/Eventos(Temporarios)/Evento(2).png"),
        require("../assets/images/Eventos(Temporarios)/Evento(3).png"),
        require("../assets/images/Eventos(Temporarios)/Evento(1).png"),
        require("../assets/images/Eventos(Temporarios)/Evento(2).png"),
        require("../assets/images/Eventos(Temporarios)/Evento(3).png"),
      ];
    
      const renderItem = ({ item }) => (
        <Image style={styles.carouselImage} source={item} />
      );

return (
    <View style={styles.destaqueBar}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {eventosTemporarios.map((item, index) => (
        <View key={index} style={styles.carouselItem}>
          <Image style={styles.carouselImage} source={item} />
        </View>
      ))}
    </ScrollView>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    destaqueBar: {
        top: 30,
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