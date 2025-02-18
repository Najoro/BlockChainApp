import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Content from "../HistoryContent/Content";

function History() {
  const [filter, setFilter] = useState("TOUT");
  
  return (
    <ScrollView style={styles.container}>
      {/* En-tête avec titre et filtre */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Historique</Text>
        <View style={styles.filterContainer}>
          {["TOUT", "BTC", "ETH", "LTC"].map((currency) => (
            <TouchableOpacity
              key={currency}
              style={[styles.filterButton, filter === currency && styles.activeFilterButton]}
              onPress={() => setFilter(currency)}
            >
              <Text style={[styles.filterText, filter === currency && styles.activeFilterText]}>
                {currency}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Résumé des transactions */}
      <View style={styles.transactionSummary}>
        <View style={styles.transactionItem}>
          <Feather name="arrow-up-right" size={20} color="#3674B5" />
          <View>
            <Text style={styles.totalLabel}>Envoyé</Text>
            <Text style={styles.totalValue}>$1,250</Text>
          </View>
        </View>
        <View style={styles.transactionItem}>
          <Feather name="arrow-down-left" size={20} color="#3674B5" />
          <View>
            <Text style={styles.totalLabel}>Reçu</Text>
            <Text style={styles.totalValue}>$500</Text>
          </View>
        </View>
      </View>
      
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Exporter l'historique" style={styles.searchInput} />
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={20} color="#3674B5" />
        </TouchableOpacity>
      </View>
      
      {/* Contenu de l'historique */}
      <View style={styles.content}>
        <Content date="Aujourd'hui, 10 Février" />
        <Content date="15 Février" />
      </View>
    </ScrollView>
  );
}

export default History;

const styles = StyleSheet.create({
  container: {
    maxheight:'100%',
    flex: 1,
    backgroundColor: "#F5F5F5",
    overflow: 'hidden',
  },
  header: {
    backgroundColor: "#0000FF",
    height: "26%",
    padding: 20,
    alignItems: "center",
    justifyContent:'space-around'
  },
  headerText: {
    color: "white",
    fontSize: 25,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 40
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  activeFilterButton: {
  },
  filterText: {
    color: "#D3D3D3",
    fontSize: 16,
  },
  activeFilterText: {
    color: "white",
  },
  transactionSummary: {
    marginTop: -60,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
    margin: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3674B5",
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 5,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
  },
  searchButton: {
    padding: 10,
  },
  content:{
    marginBottom:80
  }
});
