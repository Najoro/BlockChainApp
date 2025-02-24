import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Buffer } from "buffer";

// ✅ Assurer que Buffer est défini globalement
global.Buffer = global.Buffer || Buffer;

const GetTokenAccount = ({ connection, publicKey }) => {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const tokenAccounts = await connection.getTokenAccountsByOwner(
          new PublicKey(publicKey), // ✅ Conversion correcte
          { programId: TOKEN_PROGRAM_ID }
        );

        const extractedTokens = tokenAccounts.value.map((tokenAccount) => {
          const dataBuffer = Buffer.from(tokenAccount.account.data);
          const accountData = AccountLayout.decode(dataBuffer);

          return {
            account: new PublicKey(accountData.mint).toBase58(),
            amount: accountData.amount.toString(),
          };
        });

        setTokens(extractedTokens);
      } catch (err) {
        setError('Erreur lors de la récupération des tokens');
        console.error(err);
      }
    })();
  }, [publicKey]);

  return (
    <View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        tokens.length > 0 ? (
          tokens.map((token, index) => (
            <Text key={index}>{token.account} : {token.amount}</Text>
          ))
        ) : (
          <Text>Chargement...</Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default GetTokenAccount;
