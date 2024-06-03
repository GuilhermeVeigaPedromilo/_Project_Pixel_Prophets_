import { Text, View, Image, Pressable } from "react-native";//Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native";//Importacao do useNavigation
const API_URL = 'http://192.168.0.177:3000';//Constante da URL
import Styles from "../styles/StyleSheet"; // Importacao do Styles

import Line from "../components/LineComponent"//Importacao da Line

import { useFonts } from "expo-font";//Importacao do useFonts
import { Ionicons } from "@expo/vector-icons";//Importacao do Ionicons

export default function Cartoes() {
  const navigation = useNavigation();
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
        <Text style={Styles.textosCard}>Cartões</Text>
      </View>

      <Line/>

      <View style={Styles.viewconstrucao}>
        <Text style={Styles.textosCard}>Página em construção</Text>
        <Ionicons name="build-outline" margim size={100} color="#171A4a" />
      </View>
      <View style={Styles.tabscartoes}>
  <Pressable onPress={() => navigation.navigate("Home")}><Ionicons name="home" size={28} color="#F5E2CF" /></Pressable>
  <Pressable onPress={() => navigation.navigate("Transferencia")}><Ionicons name="cash" size={28} color="#F5E2CF" /></Pressable>
  <Pressable onPress={() => navigation.navigate("Cartoes")}><Ionicons name="card" size={28} color="#F5E2CF" /></Pressable>
  <Pressable onPress={() => navigation.navigate("Extrato")}><Ionicons name="receipt" size={28} color="#F5E2CF" /></Pressable>
</View>
    </View>
  );
}
