import { Text, View, Pressable, FlatList } from "react-native"; //Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native"; //Importacao do useNavigation
import { useFonts } from "expo-font";

import Styles from "../styles/StyleSheet"; //Importacao do Styles
import ImageProps from "../components/ImageComponent"; //Importacao do componente ImageProps

export default function Home() {
  const navigation = useNavigation();

  const data = [
    {
      key: '1',
      image: require("../assets/images/pagar.png"),
      text: 'Pagar',
    },
    {
      key: '2',
      image: require("../assets/images/cartao.png"),
      text: 'Cartões',
    },
    {
      key: '3',
      image: require("../assets/images/extratos.png"),
      text: 'Extrato',
    },
    {
      key: '4',
      image: require("../assets/images/extratos.png"),
      text: 'Poupança',
    },
    
  ];

 {/* const [loaded] = useFonts({
    "Prompt": require("../assets/fonts/Prompt-Regular.ttf"),
  });
  
  if (!loaded) {
    return null;
  }
*/}
  return (
    <View style={{ flex: 1}}>
      <View style={{ flex: 1, alignItems: "center" , flexDirection: 'column' }}> 
        <View style={Styles.quadradocontainer}>
          <View style={{ flexDirection: "row", }}>
            <ImageProps
              source={require("../assets/images/saldo.png")}
              style={{ width: 30, height: 30, marginLeft: 15, marginTop: 10 }}
            />

            <Text style={{ color: "white", marginLeft: 10, marginTop: 15,   }}>
              Saldo Disponível:{""}
            </Text>
          </View>

          <View style={{ width: "98%", marginTop: 30, marginLeft: "2%" }}>
            <Text style={{ color: "white", fontSize: 30,  }}>R$ 28.000,00</Text>
          </View>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          horizontal
          renderItem={({ item }) => (
            <Pressable style={[Styles.quadradocontainer2, {width: 150, height: 100,}]} onPress={() => navigation.navigate("Cartoes")} >
              <View style={{ flexDirection: "row" }}>
                <ImageProps
                  source={item.image}
                  style={{ width: 30, height: 30, marginTop: 10, }}
                />
              </View>
              <Text style={{ color: 'white', textAlign: 'center',  fontSize: 20, marginBottom: 10, marginTop: 10}}>{item.text}</Text>
            </Pressable>
          )}
        />
        
        <Text style={{ color: '#000020', textAlign: 'center', fontSize: 20}}>Cartão</Text>
        
        <View style={{width: '96%', height: 3, backgroundColor: '#171A4A', marginBottom: "4%" , borderRadius: 10, marginTop: "2%" }}></View>
        
        <ImageProps source={require('../assets/images/cartaozica.png')} style={{width: '98%', height: '32%', borderRadius: 18, marginBottom: "7%",}}/> 
      </View>
    </View>
  );
}
