import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  transfer,
  TOKEN_2022_PROGRAM_ID
} from '@solana/spl-token';

const TOKEN_PROGRAM_ID_FIXED = TOKEN_2022_PROGRAM_ID;

// Connexion à la Devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Charger la clé privée depuis ton fichier id.json
import secret from '../../../token/wallet/wallet.json';
const senderKeypair = Keypair.fromSecretKey(new Uint8Array(secret));

// Adresse du Token Mint
const TOKEN_MINT_ADDRESS = "Fi9wM1uTCMtRHXyHkjCdQGMAyA9uwonxmrxepm3jfmXV";

const EnvoyerPage = () => {
  const [tokens, setTokens] = useState([]); // Liste des tokens disponibles
  const [selectedToken, setSelectedToken] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchUserTokens();
  }, []);

  const fetchUserTokens = async () => {
    try {
      const tokenAccounts = await connection.getTokenAccountsByOwner(
        senderKeypair.publicKey,
        { programId: TOKEN_PROGRAM_ID_FIXED }
      );

      const tokenList = tokenAccounts.value.map((tokenAccount) => {
        const mintAddress = new PublicKey(tokenAccount.account.data.slice(0, 32)).toBase58();
        return { mintAddress };
      });

      setTokens(tokenList);
      if (tokenList.length > 0) setSelectedToken(tokenList[0].mintAddress);
    } catch (error) {
      console.error('Erreur lors de la récupération des tokens:', error);
      Alert.alert('Erreur', 'Impossible de récupérer les tokens.');
    }
  };

  const sendToken = async () => {
    try {
      if (!selectedToken || !recipientAddress || !amount) {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
        return;
      }

      const mint = new PublicKey(selectedToken);
      const recipientPublicKey = new PublicKey(recipientAddress);

      // Vérifier le compte token du sender
      const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        senderKeypair,
        mint,
        senderKeypair.publicKey
      );

      // Vérifier ou créer le compte token du destinataire
      const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        senderKeypair,
        mint,
        recipientPublicKey,
        true,
        undefined,
        TOKEN_PROGRAM_ID_FIXED
      );

      // Convertir en plus petite unité
      const decimals = 9;
      const amountInSmallestUnit = parseInt(amount) * 10 ** decimals;

      // Créer la transaction
      const transaction = new Transaction().add(
        createTransferInstruction(
          senderTokenAccount.address,
          recipientTokenAccount.address,
          senderKeypair.publicKey,
          amountInSmallestUnit,
          [],
          TOKEN_PROGRAM_ID_FIXED
        )
      );

      

      // Ajouter blockhash et fee payer
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = senderKeypair.publicKey;

      // Envoyer la transaction
      const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

      Alert.alert('Succès', `Transaction confirmée !\nSignature : ${signature}`);
      console.log(`Transaction envoyée : https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', `La transaction a échoué.\n${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Envoyer des Tokens</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Sélectionner un Token</Text>
          <Picker
            selectedValue={selectedToken}
            onValueChange={(itemValue) => setSelectedToken(itemValue)}
            style={styles.picker}
          >
            {tokens.map((token, index) => (
              <Picker.Item key={index} label={token.mintAddress} value={token.mintAddress} />
            ))}
          </Picker>
        
        <Text style={styles.label}>Adresse du destinataire</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez l'adresse du wallet"
          value={recipientAddress}
          onChangeText={setRecipientAddress}
        />

        <Text style={styles.label}>Montant</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez le montant"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Button title="Envoyer" onPress={sendToken} />
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
