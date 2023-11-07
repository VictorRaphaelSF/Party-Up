import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  TextInput,
  Platform,
  Dimensions,
} from "react-native";

import * as Animatable from "react-native-animatable";
import axios from "axios";
import Backbutton from "../components/backbutton";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState("");
  const errorRef = useRef(null);
  const [msgError, setMsgError] = useState({ status: false, msg: "" });
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senhaIcon, setSenhaIcon] = useState(
    require("../assets/images/icons/eye.png")
  );

  const Entrar = async () => {
    if (!email || !senha) {
      setEmptyFieldError("Preencha todos os campos.");
      setTimeout(() => {
        setEmptyFieldError("");
      }, 4000);
      setErro("");

      if (errorRef.current) {
        errorRef.current.shake(800);
      }
    } else {
      //try {
      const dataLogin = {
        emailUser: email,
        senhaUser: senha,
      };
      console.log(dataLogin.emailUser, dataLogin.senhaUser);

      axios
        .post("http://localhost:3003/loginUser", dataLogin)
        .then((response) => {
          // Lidar com a resposta do servidor, se necessário
          if (response.data.validateLogin) {
            console.log(response);
            navigation.navigate("telaprincipal", {
              id: response.data.results[0].Id_user,
            });
          } else {
            console.log("Email ou senha inválido!");
          }
          console.log(response);
        })
        .catch((error) => {
          // Lidar com erros, se houver algum
          setMsgError({
            msg: error.response.data.msg,
            status: true,
          });
          console.error("Erro ao enviar os dados para o backend:", error);
        });

      //   if (response.status === 200 && response.data.validateLogin) {
      //     console.log(response.data.message);
      //     navigation.navigate('telaprincipal');
      //   } else {
      //     setEmptyFieldError('');
      //     setErro('Email ou senha incorretos, tente novamente.');
      //     setSenha('');
      //     if (errorRef.current) {
      //       errorRef.current.shake(800);
      //     }
      //     setTimeout(() => {
      //       setErro('');
      //     }, 4000);
      //   }
      // } catch (error) {
      //   console.error('Erro ao enviar os dados para o backend:', error);
      //   setEmptyFieldError('');
      //   setErro('Erro ao enviar os dados para o backend:');
      //   setSenha('');
      //   if (errorRef.current) {
      //     errorRef.current.shake(800);
      //   }
      //   setTimeout(() => {
      //     setErro('');
      //   }, 4000);
      //}
    }
  };

  const bttnvconta = () => {
    navigation.navigate("cadastro");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/telap.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
        <Backbutton/>
      <Animatable.View
        ref={errorRef}
        style={[
          styles.errorBanner,
          {
            display: erro || emptyFieldError ? "flex" : "none",
            borderRadius: 10,
            marginTop: erro || emptyFieldError ? 20 : 0,
          },
        ]}
        animation="shake"
        iterationCount={1}
        duration={800}>
        <Text style={styles.errorMessage}>{erro || emptyFieldError}</Text>
      </Animatable.View>

      <View style={styles.content}>
        {
          msgError.status && (
            <Text style={styles.textError}>{msgError.msg}</Text>
          ) // && verifica se um valor possui valor verdadeiro, se estiver certo o que estiver no lado direito é executado
        }
        <View style={styles.textInputContainer}>
          <Image
            source={require("../assets/images/icons/mailicon.png")}
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            maxLength={50}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Image
            source={require("../assets/images/icons/cadeadoicon.png")}
            style={styles.lockIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            secureTextEntry={!senhaVisivel}
            maxLength={50}
            value={senha}
            onChangeText={setSenha}
          />
          <Pressable
            onPress={() => {
              setSenhaVisivel(!senhaVisivel);
              setSenhaIcon(
                senhaVisivel
                  ? require("../assets/images/icons/eye.png")
                  : require("../assets/images/icons/eyeclosed.png")
              );
            }}>
            <Image source={senhaIcon} style={styles.rightIcon} />
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={Entrar}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
          <Pressable style={styles.smallButton} onPress={bttnvconta}>
            <Text style={styles.smallButtonText}>Criar nova conta</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  textError: {
    color: "red",
  },

  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  buttonContainer: {
    alignItems: "center",
  },

  button: {
    backgroundColor: "rgba(255, 1, 108, 0.4)",
    maxWidth: "80%",
    paddingVertical: 14,
    paddingHorizontal: Platform.OS === "web" ? 100 : 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    bottom: -32,
  },

  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.9,
  },

  smallButton: {
    backgroundColor: "transparent",
    marginTop: 55,
  },

  smallButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.7,
  },

  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginBottom: 20,
  },

  textInput: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    outlineWidth: 0,
  },

  rightIcon: {
    width: 28,
    height: 21,
    marginLeft: -28,
  },

  icon: {
    width: 23,
    height: 23,
    marginRight: 10,
  },

  lockIcon: {
    width: 19,
    height: 19,
    marginRight: 10,
  },

  errorBanner: {
    backgroundColor: "#FF0000",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 12,
    left: 0,
    right: 0,
  },

  errorMessage: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
