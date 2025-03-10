import React, { useEffect, useState } from 'react';
import { AccountLayout, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import ImageTextCard from '@/navigation/screens/HomeContent/ImageTextCard';
import { useNavigation } from "@react-navigation/native";
import { Buffer } from "buffer";

global.Buffer = Buffer;

const fetchTokens = async (connection, publicKey) => {
  try {
    const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(publicKey), {
      programId: TOKEN_2022_PROGRAM_ID,
    });

    return await Promise.all(
      tokenAccounts.value.map(async (tokenAccount) => {
        const accountData = AccountLayout.decode(tokenAccount.account.data);
        const mintAddress = new PublicKey(accountData.mint).toBase58();
        const amount = parseInt(accountData.amount) / 10 ** 9;

        return {
          mintAddress,
          amount,
          name: "Ariary",
          symbol: "Ar",
          image: "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafybeih7laba3limk6h6qq2u7gky4xcmqqvfbyx6atq2uillvxil2azaxy",
        };
      })
    );
  } catch (err) {
    console.error("Erreur lors de l'extraction des tokens :", err);
    return [];
  }
};

const GetTokenAccount = ({ connection, publicKey }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    (async () => {
      const tokenList = await fetchTokens(connection, publicKey);
      setTokens(tokenList);
    })();
  }, [publicKey, connection]);

  return tokens;
};

const TokenDisplay = ({ connection, publicKey }) => {
  const navigation = useNavigation();
  const tokens = GetTokenAccount({ connection, publicKey });

  return (
    <View>
      {tokens.length === 0 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        tokens.map((token, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate("Envoyer", { token: token.mintAddress })}>
            <ImageTextCard
              imageSource={{ uri: token.image }}
              title={token.name}
              description={token.amount}
            />
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export { GetTokenAccount, TokenDisplay };
