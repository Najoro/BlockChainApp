import React, { useState } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Clipboard,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { Keypair } from "@solana/web3.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import {GetFromSecureStore, SaveToSecureStore} from "@/services/SecureStore"

const CreateWalletPage = ({ navigation }) => {
  const [wallet, setWallet] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cin, setCin] = useState("");
  const [walletName, setWalletName] = useState("");
  const [walletDescription, setWalletDescription] = useState("");
  const [image, setImage] = useState(null);
  const [dataSecureStore, setdataSecureStore] = useState(null);

  // Fonction pour choisir une image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createWallet = async () => {
    try {
      const keypair = Keypair.generate();
      const secretKey = JSON.stringify(Array.from(keypair.secretKey));
      const publicKey = keypair.publicKey.toBase58();

      // Sauvegarde sécurisée de la clé privée
      await SecureStore.setItemAsync(publicKey, secretKey);

      const newWallet = {
        firstName,
        lastName,
        cin,
        walletName,
        walletDescription,
        publicKey,
        secretKey,
        image,
      };

      setWallet(newWallet);
      await SaveToSecureStore("walletInfo", newWallet);
      const getInSS = await GetFromSecureStore("walletInfo");
      setdataSecureStore(getInSS);
      Alert.alert("Succès", "Votre wallet a été créé avec succès !");

      // Envoyer les données du wallet à la page Home
      navigation.navigate("Home", { wallet: newWallet });
    } catch (error) {
      Alert.alert("Erreur", "Échec de la création du wallet");
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(wallet.publicKey);
    Alert.alert("Copié", "Adresse publique copiée dans le presse-papier");
  };  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un Nouveau Wallet</Text>

      {/* Image sélectionnée */}
      <View style={styles.containerImages}>
        {image ? (
            <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image source={require("../../../assets/images/profil.png")} style={styles.image} />
        )}
        <TouchableOpacity style={styles.changeImage} onPress={pickImage}>
            <Ionicons name="pencil-outline" size={24} color="white" />
          </TouchableOpacity>
      </View>

      {/* Formulaire */}
      <TextInput label="Prénom" value={firstName} onChangeText={setFirstName} mode="outlined" style={styles.input} />
      <TextInput label="Nom" value={lastName} onChangeText={setLastName} mode="outlined" style={styles.input} />
      <TextInput label="CIN" value={cin} onChangeText={setCin} mode="outlined" style={styles.input} />
      <TextInput label="Nom du Wallet" value={walletName} onChangeText={setWalletName} mode="outlined" style={styles.input} />
      <TextInput label="Description du Wallet" value={walletDescription} onChangeText={setWalletDescription} mode="outlined" style={styles.input} multiline />
      
      <Button mode="contained" onPress={createWallet} style={styles.button}>
        Générer un Wallet
      </Button>

      {/* Affichage du Wallet */}
      

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        Aller à l'Accueil
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
  },
  walletCard: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  publicKey: {
    fontSize: 14,
    color: "blue",
    marginBottom: 10,
  },
  containerImages: {
    position: "relative",
    alignSelf: "center",
  },
  changeImage: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#500073",
    padding: 6,
    borderRadius: 15,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  imageText: {
    fontSize: 14,
    color: "#555",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default CreateWalletPage;
