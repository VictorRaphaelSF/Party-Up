import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Platform,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function Myeventsbar() {
    const navigation = useNavigation();
    const [eventImage, setEventImage] = useState(null);
    const [eventId, setEventId] = useState(null);

    const handleEventImageClick = () => {
        navigation.navigate("eventoedit", { idEvento: Id_App_Events, id : idUser, imgProfile: Event_image });
   };

return (
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scrollViewContent}
    >  
    <View style={styles.eventsContainer}>
    <Pressable
      style={styles.eventImagePlaceholder}
      onPress={() => handleEventImageClick(eventId)}>
      <View style={styles.eventImagePlaceholderInner}>
        {eventImage && (
          <View style={{ width: "100%", height: 200 }}>
            <Image
                source={`data:image/png;base64,${Event_image}`}
                style={styles.userImage}
            />
          </View>
        )}
      </View>
    </Pressable>

    <Pressable
      style={styles.eventImagePlaceholder}
      onPress={() => handleEventImageClick(eventId)}>
      <View style={styles.eventImagePlaceholderInner}>
        {eventImage && (
          <View style={{ width: "100%", height: 200 }}>
            <Image
              source={
                params?.userImage
                  ? { uri: eventImage }
                  : require("../assets/images/Eventos(Temporarios)/Evento(2).png")
              }
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
            />
          </View>
        )}
      </View>
    </Pressable>

    <Pressable
      style={styles.eventImagePlaceholder}
      onPress={() => handleEventImageClick(eventId)}>
      <View style={styles.eventImagePlaceholderInner}>
        {eventImage && (
          <View style={{ width: "100%", height: 200 }}>
            <Image
              source={
                params?.userImage
                  ? { uri: eventImage }
                  : require("../assets/images/Eventos(Temporarios)/Evento(2).png")
              }
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
            />
          </View>
        )}
      </View>
    </Pressable>
    </View>
    </ScrollView>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({

  eventsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  
  scrollViewContent: {
    left: 12,
    paddingVertical: 16,
    maxWidth: 375,
  },

  eventImagePlaceholder: {
    width: 150,
    height: 100,
    top: 475,
    left: 0,
    borderRadius: 8,
    marginRight: 12,
  },
});