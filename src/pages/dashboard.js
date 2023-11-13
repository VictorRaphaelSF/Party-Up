import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Platform,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import * as Animatable from "react-native-animatable";
import Backbutton from "../components/backbutton";

export default function Report({ navigation }) {
  const [curtidas, setCurtidas] = useState("");
  const [presence, setPresence] = useState("");
  const [comentario, setComentarios] = useState("");
  const [shared, setShared] = useState("");

  const VamosLa = () => {
    navigation.navigate("report2");
  };
  const screenWidth = Dimensions.get("window").width;

  const data = [
    {
      name: "Curtidas",
      qtd: 12,
      color: "rgba(211, 141, 231, 1)",
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
    {
      name: "Presenças",
      qtd: presence,
      color: "blue",
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
    {
      name: "Comentarios",
      qtd: comentario,
      color: "red",
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
    {
      name: "Compartilhamentos",
      qtd: shared,
      color: "#ffffff",
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <ImageBackground
      source={require("../assets/images/telanexist.png")}
      style={styles.container}
      resizeMode="cover">
      <Backbutton />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View>
            <PieChart
              data={data}
              width={screenWidth}
              height={175}
              chartConfig={chartConfig}
              accessor={"qtd"}
              backgroundColor={"transparent"}
              center={[10, 10]}
              absolute
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.01)",
    alignItems: "center",
    padding: 16,
  },

  content: {
    justifyContent: "flex-start",
    alignItems: "center",
    top: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: windowHeight * 0.06,
    left: 30,
    zIndex: 1,
  },

  reportlogo: {
    width: 120,
    height: 115,
    opacity: 0.8,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#FFFFFF",
    top: 24,
  },

  topic: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    top: 130,
  },

  bullet: {
    fontSize: 16,
    marginRight: 10,
    color: "#FFFFFF",
  },

  topicText: {
    fontSize: 16,
    color: "#FFFFFF",
  },

  overlaybtt: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.01)",
    alignItems: "center",
    padding: 16,
  },
});
