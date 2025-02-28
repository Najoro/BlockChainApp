import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import { AccountLayout, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Buffer } from "buffer";
import ImageTextCard from '@/navigation/screens/HomeContent/ImageTextCard';
global.Buffer = Buffer;


const GetTokenAccount = ({ connection, publicKey }) => {
  const [tokens, setTokens] = useState([]);
  const [error , setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(publicKey), {programId: TOKEN_2022_PROGRAM_ID, });
        
        const tokenList = tokenAccounts.value.map((tokenAccount) => {
          const accountData = AccountLayout.decode(tokenAccount.account.data);
          const mintAddress = new PublicKey(accountData.mint).toBase58();
          const amount = accountData.amount.toString();
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
        <Text style={styles.loading}>Chargement...</Text>
      ) : (
        tokens.map((token, index) => (
          <View key={index}>
            <ImageTextCard
              imageSource={{
                uri: "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreidbtcki227qnikxjnj4jz6i34eso6vml6xtaquvdtszi23purydt4",
              }}
              title="Nom token"
              description={token.amount}
            />
          </View>
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
