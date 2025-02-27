import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Button, Card, TextInput } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import Content from "../screens/HistoryContent/Content";

function History() {
  const [filter, setFilter] = useState("TOUT");

  return (
    <ScrollView style={styles.container}>
      {/* 🔹 En-tête avec titre et filtres */}
      <Card style={styles.header}>
        <Card.Content>
          <Text style={styles.headerText}>Historique</Text>
          <View style={styles.filterContainer}>
            {["TOUT", "BTC", "ETH", "LTC"].map((currency) => (
              <Button
                key={currency}
                mode={filter === currency ? "contained" : "outlined"}
                onPress={() => setFilter(currency)}
                style={styles.filterButton}
                labelStyle={styles.filterText}
              >
                {currency}
              </Button>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* 🔹 Résumé des transactions */}
      <Card style={styles.transactionSummary}>
        <Card.Content>
          <View style={styles.transactionRow}>
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
        </Card.Content>
      </Card>

      {/* 🔹 Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          label="Exporter l'historique"
          style={styles.searchInput}
          right={<TextInput.Icon name="magnify" />}
        />
      </View>

      {/* 🔹 Contenu de l'historique */}
      <View style={styles.content}>
        <Content date="Aujourd'hui, 10 Février" />
        <Content date="15 Février" />
      </View>
    </ScrollView>
  );
}

export default History;

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  header: {
    backgroundColor: "#3674B5",
    borderRadius: 15,
    paddingVertical: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  filterButton: {
    marginHorizontal: 5,
  },
  filterText: {
    fontSize: 14,
  },
  transactionSummary: {
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#fff",
    fontSize: 16,
  },
  content: {
    marginBottom: 80,
  },
});
