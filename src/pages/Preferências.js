import { Text, View, Image, Pressable } from "react-native";//importação dos componentes do react-native
import { useNavigation } from "@react-navigation/native";
const API_URL = 'http://10.144.170.39:3000';//Constante da URL
import Styles from "../styles/StyleSheet"; // importação do Styles

import Line from "../components/LineComponent"//importação do Line
import Rodape from "../partials/Rodapé"; //importação do Rodape

import { useFonts } from "expo-font";//importação do useFonts
import { Ionicons } from "@expo/vector-icons";//importação do Ionicons

export default function Preferencias() {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.construcaopagina}>
        <View style={Styles.viewsetinha}>
          <Pressable onPress={() => navigation.navigate('Configuracoes')}>
            <Image
              source={require("../assets/images/setinha.png")}
              style={{ margin: 20 }}
            />
          </Pressable>
        </View>

        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/images/LogoBlue.png")}
            style={Styles.ImgLogo}
          />
          <Text style={Styles.textosCard}>Preferências</Text>
        </View>

        <Line />

        <View style={Styles.viewconstrucao}>
          <Text style={Styles.textosCard}>Página em construção</Text>
          <Ionicons name="build-outline" margim size={100} color="#171A4a" />
        </View>
      </View>
      <Rodape />
    </View>
  );
}
