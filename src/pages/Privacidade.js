import { Text, View, Image } from "react-native";//Importacao dos componentes do react-native

import Styles from "../styles/StyleSheet"; // Importacao do Styles

import Line from "../components/LineComponent"//Importacao do Line

import { useFonts } from "expo-font";//Importacao do useFonts
import { Ionicons } from "@expo/vector-icons";//Importacao do Ionicons

export default function Privacidade() {
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
          style={{  width: 200, height: 200 }}
        />
        <Text style={Styles.textosCard}>Privacidade</Text>
      </View>

      <Line/>

      <View style={{justifyContent: "center", alignItems: "center", marginTop: "30%"}}>
        <Text style={Styles.textosCard}>Página em construção</Text>
        <Ionicons name="build" margim size={58} color="#171A4a" />
      </View>
    </View>
  );
}
