import { Text, View, Image, Pressable } from "react-native";//Importacao dos componentes do react-native
const API_URL = 'http://10.144.170.31:3000';//Constante da URL
import Styles from "../styles/StyleSheet"; // Importacao do Styles

import Line from "../components/LineComponent"//Importacao do Line
import Rodape from "../partials/Rodapé"; //Importacao do Rodape

import { useFonts } from "expo-font";//Importacao do useFonts
import { Ionicons } from "@expo/vector-icons";//Importacao do Ionicons

export default function Poupanca() {
  //Constante das Fontes
  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={Styles.container}>
      <View style={{ alignItems: "center"}}>
        <Image
          source={require("../assets/images/LogoBlue.png")}
          style={Styles.ImgLogo}
        />
        <Text style={Styles.textosCard}>Poupança</Text>
      </View>

      <Line/>

      <View style={Styles.viewconstrucao}>
        <Text style={Styles.textosCard}>Página em construção</Text>
        <Ionicons name="build" margim size={100} color="#171A4a" />
      </View>
      <Rodape />
    </View>
  );
}
