import { View, Modal, TextInput, Text, Pressable, Image } from "react-native";
import { useFonts } from "expo-font";

import Styles from "../styles/StyleSheet";
import ButtonComponent from "../components/ButtonComponent";
import ImageComponent from "../components/ImageComponent";
import TextComponent from "../components/TextComponent"

export default function LoginModal({ visibleA, OnPressCloseA, setCpf, setSenha, handleLogin, error}) {
  const [loaded] = useFonts({
    "Prompt": require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visibleA}>
        <View style={Styles.container}>
          <View style={Styles.section}>
            <View>
              <Pressable onPress={OnPressCloseA}>
                <Image
                  source={require("../assets/images/setinha.png")}
                  style={{ margin: 20 }}
                />
              </Pressable>
            </View>

            <View style={Styles.header}>
              <Image
                source={require("../assets/images/LogoBlue.png")}
                style={Styles.ImgLogo}
              />
            </View>

            <View style={Styles.formEverything} >
              <View style={Styles.formGroup} >
                <TextInput 
                  style={Styles.formInput} 
                  onChangeText={setCpf} 
                  keyboardType="numeric" 
                />
                <View style={{ backgroundColor: "#F0EDE9" }}>
                  <Text style={Styles.formLabel} texto="">CPF</Text>
                </View>
              </View>
                
              <View style={Styles.formGroup}>
                <TextInput 
                  style={Styles.formInput}  
                  onChangeText={ setSenha } 
                />
                <View style={{ backgroundColor: "#F0EDE9" }}>
                  <TextComponent style={Styles.formLabel} texto="SENHA"/>
                </View>
              </View>

              <View style={Styles.errors}>
                <Text>{error}</Text>
              </View>

              <View style={Styles.formGroup}>
                <ButtonComponent
                  TouchStyle={[ Styles.frtButtons, { backgroundColor: "#2F2C79", marginRight: 10 }]}
                  letras={[Styles.firstButtons, { color: "#F5E2CF" }]}
                  children="Entrar"
                  OnPress={handleLogin}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}