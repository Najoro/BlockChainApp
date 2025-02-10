import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20, justifyContent: "center" }}>
      
      {/* Profil */}
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 3,
            borderColor: "white",
            marginBottom: 10,
          }}
        />
        <Text style={{ color: "black", fontSize: 24, fontWeight: "bold" }}>Lanja</Text>
        <Text style={{ color: "#666", fontSize: 16 }}>Crypto Enthusiast</Text>
      </View>

      {/* Solde total */}
      <View style={{ 
        backgroundColor: "#3674B5",
        padding: 25,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 20,
      }}>
        <Text style={{ color: "#C0C0C0", fontSize: 18 }}>Solde total</Text>
        <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>$27,852</Text>
      </View>

      {/* Crypto détenues */}
      <View style={{
        backgroundColor: "#3674B5",
        padding: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 20,
      }}>
        <Text style={{ color: "#C0C0C0", fontSize: 18, marginBottom: 10 }}>Mes Cryptos</Text>

        {[ 
          { name: "Bitcoin", amount: "0.5 BTC", color: "orange" },
          { name: "Ethereum", amount: "2.3 ETH", color: "#8B8BFF" },
          { name: "Solana", amount: "10 SOL", color: "#00FFA3" },
        ].map((crypto, index) => (
          <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <Text style={{ color: crypto.color, fontSize: 18, fontWeight: "bold" }}>{crypto.name}</Text>
            <Text style={{ color: "#E0E0E0", fontSize: 18 }}>{crypto.amount}</Text>
          </View>
        ))}
      </View>

      {/* Bouton Déconnexion Amélioré */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#D9534F",
          padding: 15,
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        }}
        activeOpacity={0.8}
      >
        <FontAwesome name="sign-out" size={20} color="white" style={{ marginRight: 10 }} />
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
