import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const Invoice = () => {
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("all");

    // Liste des factures avec des statuts différents
    const factures = [
        { id: "1", client: "Jean Dupont", montant: "150 €", statut: "payé" },
        { id: "2", client: "Marie Curie", montant: "200 €", statut: "non payé" },
        { id: "5", client: "Nikola Tesla", montant: "300 €", statut: "payé" },
        { id: "7", client: "Nikola Tesla", montant: "300 €", statut: "payé" },
        { id: "8", client: "Nikola Tesla", montant: "300 €", statut: "non payé"},
        { id: "9", client: "Nikola Tesla", montant: "300 €", statut: "payé" },
        { id: "10", client: "Nikola Tesla", montant: "300 €", statut: "non payé" },
        { id: "11", client: "Nikola Tesla", montant: "300 €", statut: "payé" },
        { id: "12", client: "Nikola Tesla", montant: "300 €", statut: "non payé" },
        { id: "14", client: "Nikola Tesla", montant: "300 €", statut: "payé" },
    ];

    // Couleurs en fonction du statut
    const statusColors = {
        "payé": "blue",
        "non payé": "red",
    };

    // Filtrer les factures selon le texte et le statut
    const facturesFiltrées = factures.filter(facture =>
        facture.client.toLowerCase().includes(searchText.toLowerCase()) &&
        (filter === "all" || facture.statut === filter)
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Suivi des Factures</Text>

            {/* Barre de recherche */}
            <TextInput
                style={styles.searchBar}
                placeholder="Rechercher un client..."
                onChangeText={setSearchText}
                value={searchText}
            />

            {/* Filtres */}
            <View style={styles.filterContainer}>
                {["all", "payé", "non payé"].map(status => (
                    <TouchableOpacity 
                        key={status} 
                        style={[styles.filterButton, filter === status && styles.activeFilter]}
                        onPress={() => setFilter(status)}
                    >
                        <Text style={styles.filterText}>
                            {status === "all" ? "Tous" : status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Liste des factures */}
            <FlatList
                data={facturesFiltrées}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.factureItem, { borderLeftColor: statusColors[item.statut] }]}>
                        <Text style={styles.factureText}>{item.client}</Text>
                        <Text style={styles.factureText}>{item.montant}</Text>
                        <Text style={[styles.statut, { color: statusColors[item.statut] }]}>{item.statut}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
    filterButton: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#333",
    },
    activeFilter: {
        backgroundColor: "#333",
    },
    filterText: {
        color: "#000",
    },
    factureItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        marginBottom: 5,
        borderRadius: 5,
        borderLeftWidth: 5,
        backgroundColor: "#f9f9f9",
    },
    factureText: {
        fontSize: 16,
    },
    statut: {
        fontWeight: "bold",
    },
});

export default Invoice;
