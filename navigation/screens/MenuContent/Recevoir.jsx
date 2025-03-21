import React from "react";
import { View, Text, StyleSheet , TouchableOpacity,Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import DropdownComponent from "../../../components/DropdownComponent ";
// import Clipboard  from "@react-native-clipboard/clipboard";
import {SOLANA_WALLET_PUBLIC_KEY} from "@/app.config";

import { Buffer } from "buffer";
global.Buffer = Buffer;

const pubkey = SOLANA_WALLET_PUBLIC_KEY;

function Recevoir() {
  const walletAddress = pubkey;
 
  const handleClick = () => {
    alert("Copier");
  }
  
  const handleCopieClick = () => {
    // Clipboard.setString(walletAddress);
    Alert.alert('Copié !', 'Le texte a été copié dans le presse-papiers.');
    }

  return (
    <>
      <View>
        <DropdownComponent />
      </View>
      <View style = {styles.wallet}>
        <QRCode value={walletAddress} size={200} />
        <View style ={ styles.containerAdress}>
          <Text style={styles.walletText}>Mon Portefuille</Text>
          <Text style={styles.address}>{walletAddress}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button,styles.copyButton]} onPress={handleCopieClick}>
          <Text style={styles.buttonText}>Copie address</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.shareButton, styles.button]} onPress={handleClick}>
          <Text style={styles.buttonText}>Partager</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wallet: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerAdress : {
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
  },
  walletText : {
    fontSize : 18,
    opacity : 0.8,
    marginTop : 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  address: {
    marginTop: 10,
    fontSize: 20,
    textAlign : "center",
    fontWeight: "bold",
    color: "#333",
  },
  buttonsContainer :{
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom : 20,
  },
  button : {
    width: '100%',
    padding : 10,
    margin : 10,
    borderRadius: 50,
    alignItems: 'center',

  },
  copyButton: {
    backgroundColor: 'blue',
  },
  shareButton: {
    backgroundColor: 'gray', 
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Recevoir;
