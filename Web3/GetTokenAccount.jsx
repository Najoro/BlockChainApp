import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { AccountLayout, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";
import { Metadata  } from "@metaplex-foundation/mpl-token-metadata";

global.Buffer = Buffer;

const GetTokenAccount = ({ connection, publicKey }) => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      setError(null);

      try {
        const tokenAccounts = await connection.getTokenAccountsByOwner(
          new PublicKey(publicKey),
          { programId: TOKEN_2022_PROGRAM_ID }
        );

        const tokenList = await Promise.all(
          tokenAccounts.value.map(async (tokenAccount) => {
            const accountData = AccountLayout.decode(tokenAccount.account.data);
            const mintAddress = new PublicKey(accountData.mint).toBase58();
            const amount = accountData.amount.toString();

            // Récupérer les métadonnées du token
            const metadata = await getTokenMetadata(mintAddress, connection);

            return {
              mintAddress,
              amount,
              name: metadata?.name || "Inconnu",
              symbol: metadata?.symbol || "???",
              image: metadata?.image || null,
            };
          })
        );

        setTokens(tokenList);
      } catch (err) {
        setError(`Erreur lors de l'extraction des tokens : ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [publicKey, connection]);

  console.log(tokens);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : tokens.length > 0 ? (
        tokens.map((item, index) => (
          <View key={index} style={styles.tokenItem}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.tokenImage} />
            )}
            <Text style={styles.mint}>
              {item.name} ({item.symbol})
            </Text>
            <Text style={styles.amount}>Balance: {item.amount}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>Aucun token trouvé.</Text>
      )}
    </View>
  );
};

// Fonction pour récupérer les métadonnées d'un token à partir de son mint address
const getTokenMetadata = async (mintAddress, connection) => {
  try {
    const metadataPDA = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        Metadata.programId.toBuffer(),
        new PublicKey(mintAddress).toBuffer(),
      ],
      Metadata.programId
    )[0];
    console.log(metadataPDA);
    
    const accountInfo = await connection.getAccountInfo(metadataPDA);
    
    if (!accountInfo) return null;

    const metadata = Metadata.deserialize(accountInfo.data)[0];
    const metadataUri = metadata.data.uri;

    // Récupérer les données JSON depuis l'URI
    const response = await fetch(metadataUri);
    return await response.json();
  } catch (err) {
    console.error("Erreur récupération metadata :", err);
    return null;
  }
};

export default GetTokenAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  tokenItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  mint: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  amount: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
  tokenImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
