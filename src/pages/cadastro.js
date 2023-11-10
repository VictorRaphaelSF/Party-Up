import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  TextInput,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { TextInputMask } from "react-native-masked-text";
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Backbutton from "../components/backbutton";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [telefone, setTelefone] = useState("");

  //Linha abaixo somente para validações.
  const [erro, setErro] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [senhaIcon, setSenhaIcon] = useState(
    require("../assets/images/icons/eye.png")
  );
  const [confirmarSenhaIcon, setConfirmarSenhaIcon] = useState(
    require("../assets/images/icons/eye.png")
  );
  const [confirmarSenhaErro, setConfirmarSenhaErro] = useState(false);
  const [emailValido, setEmailValido] = useState(true);
  const [emailInvalido, setEmailInvalido] = useState(false);
  const [senhaFraca, setSenhaFraca] = useState(false);
  const [mostrarMensagemSenhaFraca, setMostrarMensagemSenhaFraca] =
    useState(false);

  const InputNum = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  };

  const validarIdade = (dataNascimento) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dataNascimento)) {
      setErro("Formato de data inválido. Use dd/mm/aaaa.");
      return false;
    }
  
    const parts = dataNascimento.split("/");
    const data = new Date(parts[2], parts[1] - 1, parts[0]);
    const idade = new Date().getFullYear() - data.getFullYear();
    
    return idade >= 18 && idade <= 102;
};


  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const setForcaSenha = (senha) => {
    const pontuacao = calcularForcaSenha(senha);
    setSenhaFraca(pontuacao < 0);
  };

  const validarSenha = (senhaConfirmacao) => {
    if (senha !== senhaConfirmacao) {
      setConfirmarSenhaErro(true);
    } else {
      setConfirmarSenhaErro(false);
      const pontuacaoSenha = calcularForcaSenha(senhaConfirmacao);
      if (pontuacaoSenha >= 3) {
        setForcaSenha(2);
        setSenhaFraca(false);
      } else if (pontuacaoSenha === 2) {
        setForcaSenha(1);
        setSenhaFraca(false);
      } else {
        setForcaSenha(0);
        setSenhaFraca(true);
        setMostrarMensagemSenhaFraca(true);
      }
    }
  };

  const formatCpfCnpj = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 11) {
      return numericValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
      );
    } else {
      return numericValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }
  };

  const calcularForcaSenha = (senha) => {
    let pontuacao = 0;
    if (senha.length >= 8) {
      pontuacao += 1;
    }
    if (/[0-9]/.test(senha)) {
      pontuacao += 1;
    }
    if (/[A-Z]/.test(senha)) {
      pontuacao += 1;
    }
    return pontuacao;
  };

  let userData;

  try {
    userData = {
      email: email,
      senha: senha,
      cpfCnpj: cpfCnpj,
      dataNas: yearOfBirth,
      telefone: telefone,
    };
  } catch (error) {
    console.error("Ocorreu um erro ao criar o objeto userData:", error);
    // Trate o erro conforme necessário.
  }

  const Avancar = () => {
    const cpfDigits = cpfCnpj.replace(/\D/g, '');
    const cnpjDigits = cpfCnpj.replace(/\D/g, '');
  
    if (
      !emailValido ||
      !senha ||
      !confirmarSenha ||
      !telefone ||
      confirmarSenhaErro
    ) {
      setErro("Preencha todos os campos obrigatórios");
      setTimeout(() => {
        setErro("");
      }, 4000);
    } else if (cpfDigits.length === 11 && !cpf.isValid(cpfCnpj)) {
      setErro("CPF inválido");
      setTimeout(() => {
        setErro("");
      }, 4000);
    } else if (cnpjDigits.length === 14 && !cnpj.isValid(cpfCnpj)) {
      setErro("CNPJ inválido");
      setTimeout(() => {
        setErro("");
      }, 4000);
    } else if (cpfDigits.length !== 11 && cnpjDigits.length !== 14) {
      setErro("Digite um CPF ou CNPJ válido");
      setTimeout(() => {
        setErro("");
      }, 4000);
    } else if (!validarIdade(yearOfBirth)) {
      setTimeout(() => {
        setErro("Insira uma data de nascimento válida");
      }, 0);
      setTimeout(() => {
        setErro("");
      }, 4000);
    } else {
      setErro("");
      navigation.navigate("cadastropart2", { userData });
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/telap.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Backbutton/>
      {erro !== "" && (
        <Animatable.View
          style={[
            styles.errorBanner,
            {
              display: erro ? "flex" : "none",
              borderRadius: 10,
              marginTop: erro ? 20 : 0,
            },
          ]}
          animation="shake"
          iterationCount={1}
          duration={800}>
          <Text style={styles.errorMessage}>{erro}</Text>
        </Animatable.View>
      )}
      {emailInvalido && (
        <Animatable.View
          style={[
            styles.errorBanner,
            {
              display: emailInvalido ? "flex" : "none",
              borderRadius: 10,
              marginTop: emailInvalido ? 20 : 0,
            },
          ]}
          animation="shake"
          iterationCount={1}
          duration={800}>
          <Text style={styles.errorMessage}>
            O E-mail inserido não é válido.
          </Text>
        </Animatable.View>
      )}
      <View style={styles.content}>
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
            maxLength={100}
            value={email}
            onChangeText={setEmail}
            onBlur={() => {
              setEmailValido(validarEmail(email));
              setEmailInvalido(!validarEmail(email));
            }}
          />
        </View>
        <View style={styles.textInputContainerLock}>
          <Image
            source={require("../assets/images/icons/cadeadoicon.png")}
            style={styles.lockIconSenha}
          />
          <TextInput
            style={styles.textInputSenha}
            placeholder="Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            secureTextEntry={!senhaVisivel}
            maxLength={24}
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
        <View style={styles.textInputContainerLock}>
          <Image
            source={require("../assets/images/icons/cadeadoicon.png")}
            style={styles.lockIconSenha}
          />
          <TextInput
            style={[
              styles.textInputSenha,
              confirmarSenhaErro ? styles.inputError : null,
            ]}
            placeholder="Confirmar Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            secureTextEntry={!confirmarSenhaVisivel}
            maxLength={24}
            value={confirmarSenha}
            onChangeText={(text) => {
              setConfirmarSenha(text);
              validarSenha(text);
            }}
            onBlur={() => validarSenha(confirmarSenha)}
          />
          <Pressable
            onPress={() => {
              setConfirmarSenhaVisivel(!confirmarSenhaVisivel);
              setConfirmarSenhaIcon(
                confirmarSenhaVisivel
                  ? require("../assets/images/icons/eye.png")
                  : require("../assets/images/icons/eyeclosed.png")
              );
            }}>
            <Image source={confirmarSenhaIcon} style={styles.rightIcon} />
          </Pressable>
        </View>
        <View style={styles.textInputContainer}>
          <Image
            source={require("../assets/images/icons/Group.png")}
            style={styles.lockIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="CPF ou CNPJ"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            maxLength={18}
            value={formatCpfCnpj(cpfCnpj)}
            onChangeText={(text) => setCpfCnpj(text)}
          />
        </View>
        {Platform.OS === "web" ? (
          <View style={styles.textInputContainer}>
            <Image
              source={require("../assets/images/icons/Vector.png")}
              style={styles.lockIcon}
            />
            <TextInputMask
              style={styles.textInput}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              underlineColorAndroid="transparent"
              type={"datetime"}
              options={{
                format: "DD/MM/YYYY",
              }}
              value={yearOfBirth}
              onChangeText={(text) => setYearOfBirth(text)}
            />
          </View>
        ) : (
          <View style={styles.textInputContainer}>
            <Image
              source={require("../assets/images/icons/Vector.png")}
              style={styles.lockIcon}
            />
          </View>
        )}
        <View style={styles.textInputContainer}>
          <Image
            source={require("../assets/images/icons/uil_padlock.png")}
            style={styles.lockIcon}
          />
          <TextInputMask
            style={styles.textInput}
            placeholder="Telefone(Cel)"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            underlineColorAndroid="transparent"
            type={"cel-phone"}
            options={{
              maskType: "BRL",
            }}
            maxLength={15}
            value={telefone}
            onChangeText={(text) => InputNum(text, setTelefone)}
          />
        </View>
      </View>
      <View style={styles.MessageSenhaError}>
        {confirmarSenhaErro && (
          <Text style={styles.errorText}>As senhas não coincidem.</Text>
        )}
      </View>
      <View style={styles.MessageSenhaError2}>
        {mostrarMensagemSenhaFraca && (
          <Text style={styles.errorText}>
            A senha é fraca. Tente uma senha mais forte.
          </Text>
        )}
      </View>
      <Pressable style={styles.button} onPress={Avancar}>
        <Text style={styles.buttonText}>Avançar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#260038",
  },

  backgroundImage: {
    flex: 1,
    width: Platform.OS === "web" ? "100%" : "109%",
    height: Platform.OS === "web" ? "100%" : "108%",
    position: "absolute",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  button: {
    position: 'absolute',
    backgroundColor: "#95003F",
    maxWidth: "80%",
    paddingVertical: 14,
    paddingHorizontal: Platform.OS === "web" ? 100 : 110,
    justifyContent:'flex-end',
    alignSelf: "center",
    borderRadius: 10,
    bottom: 75,
  },

  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.9,
  },

  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginBottom: 20,
    bottom: 30,
  },

  textInputContainerLock: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginBottom: 20,
    bottom: 30,
  },

  textInput: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    outlineWidth: 0,
  },

  textInputSenha: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    left: Platform.OS === "web" ? 0 : 0,
    outlineWidth: 0,
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

  lockIconSenha: {
    width: 19,
    height: 19,
    marginRight: Platform.OS === "web" ? 10 : 10,
  },

  inputError: {
    borderBottomColor: "red",
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

  rightIcon: {
    width: 28,
    height: 21,
    marginLeft: -28,
  },

  placeholderText: {
    color: "#FFFFFF",
  },

  activePlaceholder: {
    color: "rgba(255, 255, 255, 0.5)",
  },

  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -20,
    top: Platform.OS === "web" ? 30 : 10,
  },

  MessageSenhaError: {
    color: "red",
    fontSize: 14,
    marginTop: 0,
    top: Platform.OS === "web" ? 40 : 10,
  },

  MessageSenhaError2: {
    color: "red",
    fontSize: 14,
    marginTop: 0,
    top: Platform.OS === "web" ? 60 : 50,
  },
});
