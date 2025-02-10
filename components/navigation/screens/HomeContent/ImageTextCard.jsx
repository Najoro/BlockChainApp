import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";

const ImageTextCard = ({ imageSource, title, description }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Aligner l'image et le texte côte à côte
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginTop : 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Permet au texte d'occuper l'espace restant
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
});

export default ImageTextCard;