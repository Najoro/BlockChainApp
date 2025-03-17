import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const ImportPrivateKey = () => {
  const [name, setName] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const navigation = useNavigation(); // Récupération de navigation

  const storePrivateKey = async () => {
    if (!privateKey.trim()) {
      Alert.alert("Erreur", "Veuillez entrer une clé privée.");
      return;
    }

    try {
      const keyToStore = typeof privateKey === "string" ? privateKey : JSON.stringify(privateKey);
      console.log("Clé privée à stocker :", keyToStore);
      
      await SecureStore.setItemAsync("user_private_key", keyToStore, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });

      await getPrivateKey();
      Alert.alert("Succès", "Clé privée enregistrée avec succès !");
      setPrivateKey("");
      setName("");
      navigation.navigate("Home");
    } catch (e) {
      Alert.alert("Erreur", "Impossible d'enregistrer la clé privée.");
      console.error("Erreur de stockage de la clé privée :", e);
    }
  };

  const getPrivateKey = async () => {
    const key = await SecureStore.getItemAsync("user_private_key");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Importer une clé privée</Text>
      <TextInput 
        placeholder="Nom" 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        placeholder="Clé privée" 
        style={styles.area} 
        secureTextEntry 
        value={privateKey} 
        onChangeText={setPrivateKey} 
      />
      <TouchableOpacity style={styles.button} onPress={storePrivateKey}>
        <Text style={styles.buttonText}>Importer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  area: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ImportPrivateKey;
