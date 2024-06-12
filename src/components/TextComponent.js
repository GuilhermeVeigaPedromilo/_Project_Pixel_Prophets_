import { Text } from "react-native";//importação dos componentes do react-native

export default function Txt({ texto, style }) {
  return <Text style={style}>{texto}</Text>;
}
