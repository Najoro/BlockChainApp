import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,FlatList,TouchableOpacity,ActivityIndicator  } from 'react-native';
import { AccountLayout, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Buffer } from "buffer";
import ImageTextCard from '@/navigation/screens/HomeContent/ImageTextCard';
import { useNavigation } from "@react-navigation/native";

global.Buffer = Buffer;


const GetTokenAccount = ({ connection, publicKey }) => {
  const navigation = useNavigation();
  const [tokens, setTokens] = useState([]);
  const [error , setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(publicKey), {programId: TOKEN_2022_PROGRAM_ID, });
        
        const tokenList = tokenAccounts.value.map((tokenAccount) => {
          const accountData = AccountLayout.decode(tokenAccount.account.data);
          const mintAddress = new PublicKey(accountData.mint).toBase58();
          const amount = parseInt(accountData.amount) / 10 ** 9;
          return { mintAddress, amount };
        });

        setTokens(tokenList);

      } catch (err) {
        setError({error : `Erreur lors de l\'extraction des tokens : ${err}`})
        console.log(err);
        
      }
    })();
  }, [publicKey,connection]);

  
  return (
    <View>
      {tokens.length === 0 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        tokens.map((token, index) => (
          <TouchableOpacity  key={index} onPress={() => {navigation.navigate("Envoyer", {token: token.mintAddress})}}>
            <ImageTextCard
              imageSource={{
                uri: "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreidbtcki227qnikxjnj4jz6i34eso6vml6xtaquvdtszi23purydt4",
              }}
              title={token.mintAddress}
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
