import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { keycloakConfig } from "@/components/keycloak/KeycloakConfig";
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetFromSecureStore } from "@/services/SecureStore";
import {getVkaAmount} from "@/Web3/GetTokenAccount";
import {CPG} from "@/app.config";


const ProfileScreen = () => {
  const navigation = useNavigation();
  const amount = getVkaAmount();
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePic, setProfilePic] = useState("https://randomuser.me/api/portraits/men/1.jpg");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState("Crypto Enthusiast");
  const [cin, setCin] = useState('');
  const [walletName, setWalletName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const dataSecureStore = await GetFromSecureStore('walletInfo');

      if (dataSecureStore) {
        const ssfirstName = dataSecureStore.firstName || '[first Name invalide]'
        const sslastName = dataSecureStore.lastName || '[last Name invalide]'
        const ssDescriprion = dataSecureStore.walletDescription || 'Crypto Enthusiast';
        const ssCin = dataSecureStore.cin || "CIN invalide";
        const ssWalletName = dataSecureStore.walletName || "Wallet invalide"
        // Ici, vous pouvez utiliser l'URL de l'image si elle est présente dans le SecureStore
        (dataSecureStore.firstName) && setfirstName(ssfirstName);
        (dataSecureStore.lastName) && setLastName(sslastName);
        (dataSecureStore.walletDescription) && setBio(ssDescriprion);
        (dataSecureStore.image) && setProfilePic(dataSecureStore.image);
        (dataSecureStore.cin) && setCin(ssCin);
        (dataSecureStore.walletName) && setWalletName(ssWalletName);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Supprime le token de AsyncStorage
      await AsyncStorage.removeItem("authToken");

      // Réinitialise l'état local
      setToken(null);
      setIsAuthenticated(false);

      // Effectue la déconnexion côté Keycloak
      const logoutUrl = `${keycloakConfig.serviceConfiguration.revocationEndpoint}?client_id=${keycloakConfig.clientId}&post_logout_redirect_uri=${encodeURIComponent(keycloakConfig.redirectUrl)}`;
      await Linking.openURL(logoutUrl);

      // Force la redirection vers Login et empêche le retour en arrière
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });

    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: profilePic }} style={styles.profileImage} />
        <Text style={styles.profileName}>{firstName} {lastName}</Text>
        <Text style={styles.profileBio}> CIN :{cin}</Text>
        <Text style={styles.profileBio}>Nom Wallet : {walletName}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <FontAwesome name="edit" size={20} color="white" />
          <Text style={styles.editButtonText}>Modifier le profil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Solde total</Text>
        <View style={styles.containerBalance}>
            <Text style={styles.balanceText}>{amount}</Text>
            <Text style={styles.symbole}>{CPG.symbole}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={20} color="white" style={{ marginRight: 10 }} />
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modifier le profil</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setfirstName} placeholder="Nom" />
            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="prenom" />
            <TextInput style={styles.input} value={bio} onChangeText={setBio} placeholder="Bio" />
            <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20, justifyContent: "center" },
  profileSection: { alignItems: "center", marginBottom: 30 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  profileName: { color: "black", fontSize: 24, fontWeight: "bold" },
  profileBio: { color: "#666", fontSize: 16 },
  editButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#0000FF", padding: 10, borderRadius: 10, marginTop: 10 },
  editButtonText: { color: "white", fontSize: 16, marginLeft: 5 },
  balanceCard: { backgroundColor: "#0000FF", padding: 25, borderRadius: 20, marginBottom: 20 },
  balanceLabel: { color: "#C0C0C0", fontSize: 18 },
  balanceAmount: { color: "white", fontSize: 28, fontWeight: "bold" },
  logoutButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#D9534F", padding: 15, borderRadius: 50 },
  logoutButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: 300, backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
  saveButton: { backgroundColor: "#0000FF", padding: 10, borderRadius: 5, width: "100%", alignItems: "center" },
  saveButtonText: { color: "white", fontSize: 16 },
  containerBalance : {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  symbole : {
    fontWeight: "semibold",
    fontSize: 16,
    color:"#fff",
  },
  balanceText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffe",
    marginBottom: 15,
  },
});
