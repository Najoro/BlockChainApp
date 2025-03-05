import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,FlatList,TouchableOpacity,ActivityIndicator  } from 'react-native';
import { AccountLayout, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import ImageTextCard from '@/navigation/screens/HomeContent/ImageTextCard';
import { useNavigation } from "@react-navigation/native";
import {Metadata} from "@metaplex-foundation/mpl-token-metadata";

import { Buffer } from "buffer";
global.Buffer = Buffer;

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
    );
    // const metadataPDA = await Metadata.getPDA(mintAddress);

    console.log("metadataPDA");
    
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

const GetTokenAccount = ({ connection, publicKey }) => {
  const navigation = useNavigation();
  const [tokens, setTokens] = useState([]);
  const [error , setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(publicKey), {programId: TOKEN_2022_PROGRAM_ID, });
        
        const tokenList = await Promise.all(
          tokenAccounts.value.map(async (tokenAccount) => {
            const accountData = AccountLayout.decode(tokenAccount.account.data);
            const mintAddress = new PublicKey(accountData.mint).toBase58();
            const amount = parseInt(accountData.amount) / 10 ** 9;
            
            // Récupérer les métadonnées du token
            const metadata = await getTokenMetadata(mintAddress, connection);
            
            return { 
              mintAddress, 
              amount,
              name: metadata?.name || "Ariary",
              symbol: metadata?.symbol || "Ar",
              image: metadata?.image || "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafybeih7laba3limk6h6qq2u7gky4xcmqqvfbyx6atq2uillvxil2azaxy",
            };
          })
        );

        setTokens(tokenList);

      } catch (err) {
        setError({error : `Erreur lors de l\'extraction des tokens : ${err}`})
        console.log(err);
        
      }
    })();
  }, [publicKey,connection]);

  // console.log(tokens);
  
  
  return (
    <View>
      {tokens.length === 0 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        tokens.map((token, index) => (
          <TouchableOpacity  key={index} onPress={() => {navigation.navigate("Envoyer", {token: token.mintAddress})}}>
            <ImageTextCard
              imageSource={{
                uri: token.image,
              }}
              title={token.name}
              description={token.amount}
            />
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export default GetTokenAccount;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  tokenItem: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mint: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  amount: {
    fontSize: 12,
    color: '#666',
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});
