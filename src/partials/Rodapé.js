import {  View, Pressable } from "react-native";//Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native";

import Styles from "../styles/StyleSheet"; // Importacao do Styles

import { Ionicons } from "@expo/vector-icons";//Importacao do Ionicons

export default function Rodape() {
  const navigation = useNavigation();

  return (
  <View style={Styles.tabs}>
    <Pressable onPress={() => navigation.navigate("Home")}><Ionicons name="home" size={28} color="#F5E2CF" /></Pressable>
    <Pressable onPress={() => navigation.navigate("Transferencia")}><Ionicons name="cash" size={28} color="#F5E2CF" /></Pressable>
    <Pressable onPress={() => navigation.navigate("Cartoes")}><Ionicons name="card" size={28} color="#F5E2CF" /></Pressable>
    <Pressable onPress={() => navigation.navigate("Extrato")}><Ionicons name="receipt" size={28} color="#F5E2CF" /></Pressable>
  </View>
  );
}
