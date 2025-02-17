import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("Lanja");
  const [bio, setBio] = useState("Crypto Enthusiast");
  const [profilePic, setProfilePic] = useState("https://randomuser.me/api/portraits/men/1.jpg");

  return (
    <View style={styles.container}>
      {/* Profil */}
      <View style={styles.profileSection}>
        <Image source={{ uri: profilePic }} style={styles.profileImage} />
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileBio}>{bio}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <FontAwesome name="edit" size={20} color="white" />
          <Text style={styles.editButtonText}>Modifier le profil</Text>
        </TouchableOpacity>
      </View>

      {/* Solde total */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Solde total</Text>
        <Text style={styles.balanceAmount}>$27,852</Text>
      </View>

      {/* Crypto détenues */}
      <View style={styles.cryptoCard}>
        <Text style={styles.cryptoLabel}>Mes Cryptos</Text>
        {[ 
          { name: "Bitcoin", amount: "0.5 BTC", color: "orange" },
          { name: "Ethereum", amount: "2.3 ETH", color: "#8B8BFF" },
          { name: "Solana", amount: "10 SOL", color: "#00FFA3" },
        ].map((crypto, index) => (
          <View key={index} style={styles.cryptoItem}>
            <Text style={[styles.cryptoName, { color: crypto.color }]}>{crypto.name}</Text>
            <Text style={styles.cryptoAmount}>{crypto.amount}</Text>
          </View>
        ))}
      </View>

      {/* Bouton Déconnexion */}
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
        <FontAwesome name="sign-out" size={20} color="white" style={{ marginRight: 10 }} />
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>

      {/* Modal de modification du profil */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modifier le profil</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nom" />
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
  cryptoCard: { backgroundColor: "#0000FF", padding: 20, borderRadius: 20, marginBottom: 20 },
  cryptoLabel: { color: "#C0C0C0", fontSize: 18, marginBottom: 10 },
  cryptoItem: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  cryptoName: { fontSize: 18, fontWeight: "bold" },
  cryptoAmount: { color: "#E0E0E0", fontSize: 18 },
  logoutButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#D9534F", padding: 15, borderRadius: 50 },
  logoutButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: 300, backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
  saveButton: { backgroundColor: "#0000FF", padding: 10, borderRadius: 5, width: "100%", alignItems: "center" },
  saveButtonText: { color: "white", fontSize: 16 },
});
