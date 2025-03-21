import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,ActivityIndicator } from "react-native";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;



const GetSolanaBalance = ({ connection, publicKey }) => {
  const [Sol, setSol] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const lamports = await connection.getBalance(new PublicKey(publicKey));
        const solBalance = lamports / 1e9;
        setSol(solBalance);
      } catch (err) {
        setError("Erreur lors de la récupération du solde");
        console.error(err);
      }
    })();
  }, [publicKey]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text style={styles.solText}>
          Solana Balance : {Sol !== null ? `${Math.ceil(Sol)} SOL` : (<ActivityIndicator size="large" color="white" />)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor : "#3674B5",
    alignItems: "center",
  },
  solText: {
    fontSize: 18,
    fontWeight: "bold",
    color :'white',

  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default GetSolanaBalance;
