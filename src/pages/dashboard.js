import React, { useEffect, useRef } from "react";
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
  const VamosLa = () => {
    navigation.navigate("report2");
  };
  const screenWidth = Dimensions.get("window").width;

  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(211, 141, 231, 1)",
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#FFFFFF",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
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
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
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
            <Text>Bezier Line Chart</Text>
            <PieChart
              data={data}
              width={screenWidth}
              height={300}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[10, 50]}
              absolute
            />
          </View>
        </View>
      </View>

      <View style={styles.overlaybtt}>
        <Animatable.View
          delay={700}
          animation="fadeInUp"
          style={styles.vamosLaButton}>
          <Pressable style={styles.button} onPress={VamosLa}>
            <Text style={styles.buttonText}>Avançar</Text>
          </Pressable>
        </Animatable.View>
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
    justifyContent: "flex-start",
    top: 24,
    alignItems: "center",
    padding: 16,
  },

  content: {
    justifyContent: "flex-start",
    alignItems: "center",
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

  button: {
    backgroundColor: "rgba(255, 1, 108, 0.4)",
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 10,
    position: "absolute",
    bottom: windowHeight * 0.04,
  },

  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.9,
  },

  vamosLaButton: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    width: "100%",
  },

  overlaybtt: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.01)",
    alignItems: "center",
    padding: 16,
  },
});
