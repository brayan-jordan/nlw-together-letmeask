import  firebase from "firebase/app";

// firebase recomenda que faca a importacao de cada servico que for utilizar,
// como vamos utilizar autenticacao com google e banco de dados esses serao os importados
import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCcm-R7rNOUI-aPMOwQR71RTFP2urNQ_qM",
  authDomain: "nlwtogether-3eaf9.firebaseapp.com",
  databaseURL: "https://nlwtogether-3eaf9-default-rtdb.firebaseio.com",
  projectId: "nlwtogether-3eaf9",
  storageBucket: "nlwtogether-3eaf9.appspot.com",
  messagingSenderId: "590844812401",
  appId: "1:590844812401:web:ef2eff860f8904d61ecfd0"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }