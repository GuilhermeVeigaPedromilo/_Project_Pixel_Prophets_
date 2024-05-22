import { Text } from "react-native";//Importacao dos componentes do react-native

export default function Txt({ texto, style }) {
  return <Text style={style}>{texto}</Text>;
}
