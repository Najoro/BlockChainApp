import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert,ActivityIndicator,TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import {
  createTransferInstruction,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  TOKEN_2022_PROGRAM_ID
} from '@solana/spl-token';

// Connexion à la Devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Charger la clé privée
// import secret from '../../../token/wallet/id.json';
import {SOLANA_WALLET_PRIVATE_KEY} from "@/app.config";
import { useNavigation } from '@react-navigation/native';
const senderKeypair = Keypair.fromSecretKey(new Uint8Array(SOLANA_WALLET_PRIVATE_KEY));

const TOKEN_PROGRAM_ID_FIXED = TOKEN_2022_PROGRAM_ID;

const createToken2022ATA = async (connection, payer, mint, owner) => {
  const ata = getAssociatedTokenAddressSync(
    mint,
    owner,
    false,
    TOKEN_2022_PROGRAM_ID
  );

  const accountInfo = await connection.getAccountInfo(ata);
  if (accountInfo) {
    return ata;
  }

  const transaction = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      payer.publicKey,
      ata,
      owner,
      mint,
      TOKEN_2022_PROGRAM_ID
    )
  );

  await sendAndConfirmTransaction(connection, transaction, [payer]);
  return ata;
};

const EnvoyerPage = (props) => {
  const { route } = props; 
  const token = route?.params?.token;
  const addressScan = route?.params?.address || null;
  const [recipientAddress, setRecipientAddress] = useState(addressScan);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
 
  const sendToken = async () => {
    try {
      if (!token || !recipientAddress || !amount) {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
        return;
      }
      setLoading(true);

      const mint = new PublicKey(token);
      const recipientPublicKey = new PublicKey(recipientAddress);

      const senderTokenAccount = await createToken2022ATA(
        connection,
        senderKeypair,
        mint,
        senderKeypair.publicKey
      );

      const recipientTokenAccount = await createToken2022ATA(
        connection,
        senderKeypair,
        mint,
        recipientPublicKey
      );

      const decimals = 9;
      const amountInSmallestUnit = parseInt(amount) * 10 ** decimals;

      const transaction = new Transaction().add(
        createTransferInstruction(
          senderTokenAccount,
          recipientTokenAccount,
          senderKeypair.publicKey,
          amountInSmallestUnit,
          [],
          TOKEN_PROGRAM_ID_FIXED
        )
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = senderKeypair.publicKey;

      const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
      if(signature){
        setLoading(false);
      }
      Alert.alert('Succès', `Transaction confirmée !\nSignature : ${signature}`);

    } catch (error) {
      setLoading(false);
      Alert.alert('Erreur', `La transaction a échoué.\n${error}`);
    }
  };
  const handleScan = () => {
    navigation.navigate('ScanCodeQr', {token : token})
  }

  return (
    <View style={styles.container}>
      <Ionicons name="send-outline" size={60} color="#007AFF" />
      <Text style={styles.title}>Envoyer des Tokens</Text>
      <Text>{token}</Text>
      <View style={styles.formContainer}>
        <View style = {styles.scanContenaire}>
          <Text style={styles.label}>Adresse du destinataire</Text>
          <TouchableOpacity onPress={handleScan}>
            <Ionicons name="scan" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <TextInput mode="outlined" placeholder="Entrez l'adresse du wallet" value={recipientAddress} onChangeText={setRecipientAddress} style={styles.input} />

        <Text style={styles.label}>Montant</Text>
        <TextInput mode="outlined" placeholder="Entrez le montant" keyboardType="numeric" value={amount} onChangeText={setAmount} style={styles.input} />
          {!loading 
          ? (<Button mode="contained" onPress={sendToken} style={styles.button} labelStyle={styles.buttonText}>Envoyer</Button>) 
          : (<ActivityIndicator size="large" color="#007bff" />)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scanContenaire : {display: "flex", flexDirection:'row' , alignItems: "center", gap: 20, marginBottom: 10},
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#333' },
  formContainer: { width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  label: { fontSize: 16, marginBottom: 8, color: '#333' },
  picker: { height: 50, marginBottom: 20 },
  input: { marginBottom: 20 },
  button: { borderRadius: 8, paddingVertical: 8, marginTop: 10 },
  buttonText: { fontSize: 16 },
});

export default EnvoyerPage;
