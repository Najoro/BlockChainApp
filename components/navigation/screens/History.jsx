import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

function History() {
  const [filter, setFilter] = useState("ALL");

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header avec titre History et sous-menu de filtrage */}
      <View style={styles.header}>
        <Text style={styles.headerText}>History</Text>
        
        {/* Sous-menu de filtrage */}
        <View style={styles.filterContainer}>
          {["ALL", "BTC", "ETH", "LTC"].map((currency) => (
            <TouchableOpacity
              key={currency}
              style={[
                styles.filterButton,
                filter === currency && styles.activeFilterButton, // Mettre en évidence le bouton actif
              ]}
              onPress={() => setFilter(currency)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === currency && styles.activeFilterText, // Change la couleur du texte pour le bouton actif
                ]}
              >
                {currency}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bloc Total des Transactions (Sent et Received) */}
      <View style={styles.transactionSummary}>
        <View style={styles.totalRow}>
          <View style={styles.transactions}>
            <Feather name="arrow-up-right" size={20} color="#3674B5" />
            <View>
              <Text style={styles.totalLabel}>Sent</Text>
              <Text style={styles.totalValue}>$1,250</Text>
            </View>
          </View>
        </View>
        <View style={styles.totalRow}>
          <View style={styles.transactions}>
            <Feather name="arrow-down-left" size={20} color="#3674B5" />
            <View>
              <Text style={styles.totalLabel}>Received</Text>
              <Text style={styles.totalValue}>$500</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Barre de recherche séparée */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Export History" style={styles.searchInput} />
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={20} color="#3674B5" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default History;

const styles = {
  header: {
    backgroundColor: "#3674B5",
    padding: 20,
    height: "33%", // Utilisation d'un tiers de la page pour le header
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 10,
  },
  activeFilterButton: {
    // Pas de couleur de fond
  },
  filterText: {
    color: "#A9A9A9", // Gris pour l'option non sélectionnée
    fontSize: 16,
    fontWeight: "bold",
  },
  activeFilterText: {
    color: "white", // Blanc pour l'option sélectionnée
  },
  transactionSummary: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    marginTop: -70, // Centré juste sous le header
    alignSelf: "center", // Centré horizontalement
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  transactions: {
    flexDirection: "row",
  },
  totalRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  totalLabel: {
    color: "#000",
    fontSize: 16,
    marginLeft: 10,
  },
  totalValue: {
    color: "#3674B5",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "flex-start", // Aligner à gauche
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    height: 40,
    fontSize: 16,
    color: "#000",
    marginRight: 30, // Espace entre le champ texte et le bouton
    paddingLeft: 15,
    borderRadius: 25,
    borderWidth: 1,
  },
  searchButton: {
    borderWidth: 1,
    borderColor: "#3674B5",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
};
