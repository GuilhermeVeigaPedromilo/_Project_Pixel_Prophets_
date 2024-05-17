import { Text, View, Image, FlatList } from "react-native";
import Styles from "../styles/StyleSheet"; // Importacao do Styles
import { Dimensions } from "react-native";
import { useFonts } from "expo-font";

//const SCREEN_WIDTH = Dimensions.get("window").width;

const data = [
  {
    id: "1",
    text1: "Físico",
    text2: "Débito",
    source: require("../assets/images/CartaoVert.png"),
  },
  {
    id: "2",
    text1: "Físico",
    text2: "Crédito",
    source: require("../assets/images/CartaoVert.png"),
  },
  {
    id: "3",
    text1: "Virtual",
    text2: "Débito",
    source: require("../assets/images/CartaoVert.png"),
  },
  {
    id: "4",
    text1: "Virtual",
    text2: "Crédito",
    source: require("../assets/images/CartaoVert.png"),
  },

  // Adicione mais itens conforme necessário
];

export default function Cartoes() {
  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F0EDE9",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{ alignItems: "center", marginTop: "15%", marginBottom: "-15%" }}
      >
        <Image
          source={require("../assets/images/LogoBlue.png")}
          style={{ marginTop: 250, width: 200, height: 200 }}
        />
        <Text style={Styles.textosCard}>Cartões</Text>
      </View>

      <View style={{ marginTop: 50, marginLeft: 10, flexDirection: "column" }}>
        <View
          style={{
            marginTop: 50,
            marginRight: 10,
            borderTopWidth: 2,
            padding: 5,
            marginLeft: 10,
            marginRight: 15,
            borderTopColor: "#171A4A",
          }}
        />
          <FlatList
  showsHorizontalScrollIndicator={false}
  data={data}
  horizontal={true}
  renderItem={({ item }) => (
    <View style={Styles.card2}>
      <Image source={item.source} style={Styles.card} />
      <Text style={Styles.details}>{item.text1}</Text>
      <Text style={Styles.details}>{item.text2}</Text>
    </View>
  )}
/>
      </View>
    </View>
  );
}
