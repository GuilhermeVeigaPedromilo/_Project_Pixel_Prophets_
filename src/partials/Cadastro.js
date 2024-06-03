import React, { useState } from "react";//Importacao do React e do useState
import {View, Modal, TextInput, Text, Pressable, Alert, ScrollView } from "react-native";//Importacao dos componentes do react-native
import axios from "axios";//Importacao do axios
import { useNavigation } from "@react-navigation/native";

import { useFonts } from "expo-font";//Importacao do useFonts

import Btn from "../components/ButtonComponent";//Importacao do Btn
import ImageProps from "../components/ImageComponent";//Importacao da ImageProps

import Styles from "../styles/StyleSheet";//Importacao do Styles

const API_URL = 'http://192.168.0.177:3000';//Constante da URL

export default function LoginModal({ visibleB, OnPressCloseB }) {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confsenha, setConfSenha] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    const newUser = { nome, senha, email, cpf, };
    await axios.post(`${API_URL}/Cadastro`, newUser);
    if (nome === "" || cpf === "" || email === "" || senha === "") {
      Alert.alert("Cadastro inválido", "Insira todos os dados solicitados");
    } else if (confsenha != senha) {
      Alert.alert("A senha esta diferente");
    } else {
      try{
      await axios.post(`${API_URL}/Cadastro`, newUser);
      navigation.navigate('Splash');
      console.log(`Cadastro realizado: ${nome} - ${senha} - ${email} - ${cpf}`)
      
      } catch (err) {
        console.log(err, "Erro")
      }
      
    }
};

  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visibleB}>
        <View style={{ backgroundColor: "#F0EDE9", flex: 1 }}>
          <ScrollView>
            <View style={Styles.section}>
              <View>
                <Pressable onPress={OnPressCloseB}>
                  <ImageProps
                    source={require("../assets/images/setinha.png")}
                    style={{ margin: 20 }}
                  />
                </Pressable>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ImageProps
                  source={require("../assets/images/LogoBlue.png")}
                  style={Styles.ImgLogo}
                />
                <View style={{ alignItems: "center" }}>
                  <View style={Styles.formGroup}>
                    <TextInput
                      style={Styles.formInput}
                      value={nome}
                      onChangeText={setNome}
                    />
                    <View style={{ backgroundColor: "#F0EDE9" }}>
                      <Text style={Styles.formLabel}>NOME COMPLETO</Text>
                    </View>
                  </View>
                  <View style={Styles.formGroup}>
                    <TextInput
                      style={Styles.formInput}
                      value={cpf}
                      onChangeText={setCpf}
                      keyboardType="numeric"
                    />
                    <View style={{ backgroundColor: "#F0EDE9" }}>
                      <Text style={Styles.formLabel}>CPF</Text>
                    </View>
                  </View>
                  <View style={Styles.formGroup}>
                    <TextInput
                      style={Styles.formInput}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email"
                    />
                    <View style={{ backgroundColor: "#F0EDE9" }}>
                      <Text style={Styles.formLabel}>E-MAIL</Text>
                    </View>
                  </View>
                  <View style={Styles.formGroup}>
                    <TextInput
                      style={Styles.formInput}
                      value={senha}
                      onChangeText={setSenha}
                      keyboardType="numeric"
                    />
                    <View style={{ backgroundColor: "#F0EDE9" }}>
                      <Text style={Styles.formLabel}>SENHA</Text>
                    </View>
                  </View>
                  <View style={Styles.formGroup}>
                    <TextInput
                      style={Styles.formInput}
                      value={confsenha}
                      onChangeText={setConfSenha}
                      keyboardType="numeric"
                    />
                    <View style={{ backgroundColor: "#F0EDE9" }}>
                      <Text style={Styles.formLabel}>CONFIRMAR SENHA</Text>
                    </View>
                  </View>
                  <View style={Styles.formGroup}>
                    <Btn
                      TouchStyle={[
                        Styles.frtButtons,
                        { backgroundColor: "#2F2C79", marginRight: 10 },
                      ]}
                      letras={[Styles.firstButtons, { color: "#F5E2CF" }]}
                      children="Cadastrar"
                      OnPress={handleRegister}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
