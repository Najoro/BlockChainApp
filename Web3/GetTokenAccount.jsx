import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Buffer } from "buffer";
global.Buffer = Buffer;


const GetTokenAccount = ({ connection, publicKey }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(publicKey), {

          programId: TOKEN_PROGRAM_ID, 
        });

        const extractedTokens = tokenAccounts.value.map((tokenAccount) => {
          const dataBuffer = Buffer.from(tokenAccount.account.data); //  Conversion en Buffer
          const accountData = AccountLayout.decode(dataBuffer); //  Décode correctement

          return {
            account: new PublicKey(accountData.mint).toBase58(), //  Convertir en base58
            amount: accountData.amount.toString(), //  Convertir `bigint` en `string`
          };
        });

        setTokens(extractedTokens);
        console.log(extractedTokens);
      } catch (err) {
        console.error(' Erreur lors de l\'extraction des tokens :', err);
      }
    })();
  }, [publicKey]);

  return (
    <View>
      <Text>Chargement...</Text>
      {tokens.map((token, index) => (
        <Text key={index}>{token.account} : {token.amount}</Text>
      ))}
    </View>
  );
};

export default GetTokenAccount;

const styles = StyleSheet.create({});
