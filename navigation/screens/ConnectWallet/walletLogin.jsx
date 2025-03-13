import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const WalletSelectionPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="wallet-outline" size={60} color="#007AFF" />
      <Text style={styles.title}>Connecter un Wallet</Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('CreateWallet')}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Créer un nouveau compte
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('ImportPrivateKey')}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Importer une clé privée
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    gap: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default WalletSelectionPage;
