
import { useState, useEffect } from "react";
import { View, Modal, TextInput, Text, Pressable, Alert } from "react-native";
import { useFonts } from "expo-font";

import Btn from "../components/ButtonComponent";
import Styles from "../styles/StyleSheet";
import ImageProps from "../components/ImageComponent";
import axios from "axios";
import { useNavigation, } from "@react-navigation/native";


export default function LoginModal({ visibleA, OnPressCloseA, setCpf, setSenha, LoginDados}) {

  
 
  const [loaded] = useFonts({
    "Prompt": require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visibleA}>
      <View style={{backgroundColor: "#F0EDE9", flex: 1}}>
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
        </View>
      </Modal>
    </View>
  );
}