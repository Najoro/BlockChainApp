import React, { useState } from 'react';
import { View, Alert, StyleSheet, Clipboard } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { Keypair } from '@solana/web3.js';

const CreateWalletPage = ({ navigation }) => {
  const [wallet, setWallet] = useState(null);
  const [walletName, setWalletName] = useState('');
  const [walletDescription, setWalletDescription] = useState('');

  const createWallet = async () => {
    try {
      const keypair = Keypair.generate();
      const secretKey = JSON.stringify(Array.from(keypair.secretKey));
      const publicKey = keypair.publicKey.toBase58();

      // Sauvegarde sécurisée de la clé privée
      await SecureStore.setItemAsync(publicKey, secretKey);

      const newWallet = { 
        name: walletName, 
        description: walletDescription, 
        publicKey, 
        secretKey 
      };

      setWallet(newWallet);
      Alert.alert('Succès', 'Votre wallet a été créé avec succès !');

      // Envoyer les données du wallet à la page Home
      navigation.navigate('Home', { wallet: newWallet });

    } catch (error) {
      Alert.alert('Erreur', 'Échec de la création du wallet');
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(wallet.publicKey);
    Alert.alert('Copié', 'Adresse publique copiée dans le presse-papier');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un Nouveau Wallet</Text>

      {/* Formulaire */}
      <TextInput
        label="Nom du Wallet"
        value={walletName}
        onChangeText={setWalletName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={walletDescription}
        onChangeText={setWalletDescription}
        mode="outlined"
        style={styles.input}
        multiline
      />

      <Button mode="contained" onPress={createWallet} style={styles.button}>
        Générer un Wallet
      </Button>

      {/* Affichage du Wallet */}
      {wallet && (
        <Card style={styles.walletCard}>
          <Card.Content>
            <Text style={styles.label}>Nom : {wallet.name}</Text>
            <Text style={styles.label}>Description : {wallet.description}</Text>
            <Text style={styles.label}>Adresse Publique :</Text>
            <Text style={styles.publicKey}>{wallet.publicKey}</Text>
            <Button mode="text" onPress={copyToClipboard}>
              Copier l'adresse
            </Button>
          </Card.Content>
        </Card>
      )}

      <Button mode="outlined" onPress={() => navigation.navigate('Home')} style={styles.button}>
        Aller à l'Accueil
      </Button>
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
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
  },
  walletCard: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  publicKey: {
    fontSize: 14,
    color: 'blue',
    marginBottom: 10,
  },
});

export default CreateWalletPage;
