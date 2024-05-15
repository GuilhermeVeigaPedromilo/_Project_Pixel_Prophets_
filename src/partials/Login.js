
import { useState, useEffect } from "react";
import { View, Modal, TextInput, Text, Pressable, Alert } from "react-native";

import { View, Modal, TextInput, Text, Pressable } from "react-native";
import { useFonts } from "expo-font";

import Btn from "../components/ButtonComponent";
import Styles from "../styles/StyleSheet";
import ImageProps from "../components/ImageComponent";
import axios from "axios";
import { useNavigation, } from "@react-navigation/native";
const IP = "10.144.170.78";

export default function LoginModal({ visibleA, OnPress, OnPressCloseA }) {

  const navigation = useNavigation('')
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");


  const LoginDados = async () => {
    try {
      if (cpf === '' || senha === '') {
        alert('Cadastro inválido: Insira todos os dados solicitados');
      } else {
        await axios.post(`http://${IP}:3000/Cadastro`, {
          cpf,
          senha,

        });
        useEffect(() => {
          // Função para carregar os dados ao iniciar o aplicativo
          carregarDados();
        }, []);
      
      }
    } catch (error) {
      console.error("Erro ao inserir dados", error);
      Alert.alert("Erro ao inserir dados");
    }
  };

  const carregarDados = async () => {
    try {
      const response = await axios.get(`http:/${IP}/:3000/dados`);
      setDados(response.data);
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
    }



  };

  const [loaded] = useFonts({
    "Prompt": require("../assets/fonts/Prompt-Regular.ttf"),
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visibleA}>
        <View style={Styles.section}>
          <View>
            <Pressable onPress={OnPressCloseA}>
              <ImageProps
                source={require("../assets/images/setinha.png")}
                style={{ margin: 20 }}
              />
            </Pressable>
          </View>
          <View style={{  justifyContent: "center", alignItems: "center", marginTop: "15%",}}>
            <ImageProps
              source={require("../assets/images/LogoBlue.png")}
              style={Styles.ImgLogo}
            />

            <View style={{ alignItems: "center", }} >
              <View style={Styles.formGroup} >
                <TextInput style={Styles.formInput} Placeholder="CPF" onChangeText={setCpf} />
                <View style={{ backgroundColor: "#F0EDE9" }}>
                  <Text style={Styles.formLabel}>CPF</Text>
                </View>
              </View>
          
              <View style={Styles.formGroup}>
                <TextInput style={Styles.formInput} Placeholder="SENHA" onChangeText={setSenha} />
                <View style={{ backgroundColor: "#F0EDE9" }}>
                  <Text style={Styles.formLabel}>SENHA</Text>
                </View>
              </View>

              <View style={Styles.formGroup}>
                <Btn
                  TouchStyle={[
                    Styles.frtButtons,
                    { backgroundColor: "#2F2C79", marginRight: 10 },
                  ]}
                  letras={[
                    Styles.firstButtons,
                    { color: "#F0EDE9" },
                  ]}
                  children="Entrar"
                  OnPress={LoginDados}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}