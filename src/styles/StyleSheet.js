import { StyleSheet } from "react-native";
// import { useFonts, Prompt_400Regular } from "@expo-google-fonts/prompt";

// const Prompt = useFonts({
//   Prompt_400Regular,
// });

const Styles = StyleSheet.create({
  container: {
    flex: 1, // Cobrir todo o espaço
    backgroundColor: "#F0EDE9",
    justifyContent: "center", // Justificar todo o conteudo
    alignItems: "center",
  },

  containerTwo: {
    flex: 1,
    borderWidth: 2,
  },

  textos: {
    fontSize: 17,
    paddingBottom: 20,
    color: "#2F2C79",
    marginBottom: 40,
    fontFamily: "Prompt",
  },

  textosextrato: {
    fontSize: 19,
    color: "#2F2C79",
    fontFamily: "Prompt",
    textAlign: "center"
  },

  textosComprovante: {
    fontSize: 18,
    paddingBottom: 20,
    color: "#171A4A",
    fontFamily: "Prompt",
  },

  linhaComprovante: {
    width: '95%' , 
    borderBottomColor: "#171A4A", 
    borderBottomWidth: 1,
    marginTop: "10%",
  },

  textosCard: {
    fontSize: 22,
    color: "#2F2C79",
    fontFamily: "Prompt",
  },

  textossaldo: {
    fontSize: 17,
    color: "#2F2C79",
    fontFamily: "Prompt",
  },

  textosextrato: {
    fontSize: 17,
    color: "#2F2C79",
    fontFamily: "Prompt",
  },

  textosconfig: {
    fontSize: 17,
    color: "#2F2C79",
    fontFamily: "Prompt",
    marginLeft: "2%",
  },

  saldo: {
    fontSize: 25,
    color: "#2F2C79",
    fontFamily: "Prompt",
  },

  data: {
    fontSize: 19,
    color: "#2F2C79",
    fontFamily: "Prompt",
  },

  textosbeges: {
    fontSize: 17,
    color: "#E8C39E",
    fontFamily: "Prompt",
  },

  linhaabx: {
    width: "95%",
    borderBottomWidth: 1,
    borderBottomColor: "#2F2C79",
    marginBottom: "11%",
    padding: "3%",
  },

  linhald: {
    height: 80,
    width: "100%",
    borderLeftWidth: 1,
    borderLeftColor: "#2F2C79",
    marginBottom: "5%",
    marginLeft: "20%",
    padding: "3%",
  },

  ImgLogo: {
    width: 200,
    height: 200,
  },

  firstButtons: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Prompt",
  },

  frtButtons: {
    width: 162,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    fontFamily: "Prompt",
  },

  caixauser: {
    width: "25%",
    height: 50,
    textAlign: "center",
    borderBottomWidth: 2,
    fontSize: 20,
    borderBottomColor: "#171A4A",
    marginTop: "1%",
  },
  caixasenha: {
    width: "25%",
    height: 50,
    textAlign: "center",
    borderBottomWidth: 2,
    fontSize: 20,
    borderBottomColor: "#171A4A",
    marginTop: "1%",
  },
  caixas: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: "25%",
    height: "4%",
    borderRadius: 15,
    backgroundColor: "#171A4A",
    marginTop: "1%",
    justifyContent: "center",
    alignItems: "center",
  },
  textobtn: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#F0EDE9",
  },
  imagesicones: {
    width: 25,
    height: 25,
  },
  firstFooter: {
    flexDirection: "row",
    position: "absolute",
    borderRadius: 15,
    height: 135,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  IconsRdp: {
    width: 30,
    height: 30,
    margin: 18,
  },
  quadradocontainer: {
    marginTop: "7%",
    width: "95%",
    height: "40%",
    backgroundColor: "#171A4A",
    display: "flex",
    borderRadius: 10,
  },
  quadradocontainer2: {
    marginTop: "15%",
    backgroundColor: "#000020",
    display: "flex",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },

  section: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#F0EDE9",
  },

  formInput: {
    padding: 10,
    borderRadius: 5,
    width: 300,
    borderWidth: 2,
    borderColor: "#2F2C79",
    backgroundColor: "#2F2C7900",
    color: "#2F2C79",
    fontFamily: "Prompt",
  },

  formLabel: {
    position: "absolute",
    backgroundColor: "#F0EDE9",
    marginTop: -60,
    marginLeft: 10,
    paddingRight: 10,
    paddingLeft: 10,
    color: "#2F2C79",
    fontFamily: "Prompt",
  },

  formGroup: {
    marginBottom: 40,
  },

  card: {
    width: "100%",
    height: 150, // Defina uma altura em pixels ou ajuste conforme necessário
    borderRadius: 10,
  },
  card2: {
    margin: 10, // Ajuste conforme necessário
    alignItems: "center",
    paddingTop: 10, // Ajuste conforme necessário
    width: 200, // Ajuste conforme necessário para obter o layout desejado
  },

  details: {
    color: "#171A4A",
    fontSize: 22,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Prompt",
  },

  boxess: {
    width: "100%",
    height: "100%",
  },

  containerteste: {
    flex: 1,
    backgroundColor: "#F0EDE9",
  },

  centro: {
    alignItems: "center",
    justifyContent: "center",
  },

  linha:{
    backgroundColor: "#2F2C79",
    height: 2,
    width: "90%",
    marginTop: 20,
  },

  header:{
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: "15%",
  },

  formEverything:{
    alignItems:"center"
  },
  tabscartoes:{
    flexDirection: 'row', 
     justifyContent: 'space-around',
     alignItems: 'center',
     backgroundColor: '#171A4A',
     width: '100%',
     height: '5%',
     position: "absolute",
     top: "95%",
  },
  tabs:{
    flexDirection: 'row', 
     justifyContent: 'space-around',
     alignItems: 'center',
     backgroundColor: '#171A4A',
     width: '100%',
     height: '5%',
  },
  viewconstrucao:{
   justifyContent: "center",
   alignItems: "center",
   marginTop: "30%",
  },
  construcaopagina:{
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "95%"
  },
  transferpagina:{
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "95%"
  },
  viewsetinha: {
    position: "absolute",
    top: "5%", 
    left: "3%",
  },
});

export default Styles;
