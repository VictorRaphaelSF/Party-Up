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
  const [curtidas, setCurtidas] = useState(4);
  const [presence, setPresence] = useState(12);
  const [comentario, setComentarios] = useState(3);
  const [shared, setShared] = useState(7);

  const VamosLa = () => {
    navigation.navigate("report2");
  };
  const screenWidth = Dimensions.get("window").width;

  const data = [
    {
      name: "Curtidas",
      qtd: curtidas,  
      color: "rgba(255, 255, 255, 1)",
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
    {
      name: "Presenças",
      qtd: presence,
      color: "rgba(66, 66, 66, 1)",
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
    {
      name: "Comentarios",
      qtd: comentario,
      color: "rgba(159, 159, 159, 1)" ,
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
    {
      name: "Compartilhamentos",
      qtd: shared,
      color: "rgba(233, 233, 233, 1)",
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
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.content}>
            <PieChart
              data={data}
              width={Dimensions.get('window').width / 1.1}
              height={180}
              chartConfig={chartConfig}
              paddingLeft="-30"
              center={[20, 0]}
              accessor={"qtd"}
              backgroundColor={"transparent"}
              style={styles.chart}
            />
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
    padding: 1,
    marginTop: 50,
    overflow: "hidden"
  },

  content: {
    top: 32,
  },

  chart: {
    fontSize: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: windowHeight * 0.06,
    left: 0,
    zIndex: 1,
  },

  reportlogo: {
    width: 120,
    height: 115,
    opacity: 0.8,
  },

  title: {
    fontSize: 30,
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
    padding: 0,
  },
});
