import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EnvoyerPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Envoyer</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Adresse de réception</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez l'adresse"
          keyboardType="default"
        />
        
        <Text style={styles.label}>Montant</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez le montant"
          keyboardType="numeric"
        />
        
        <Button title="Envoyer" onPress={() => alert('Envoyer!')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default EnvoyerPage;
