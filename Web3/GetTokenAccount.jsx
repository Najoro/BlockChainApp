import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Connection, PublicKey } from "@solana/web3.js";
import { AccountLayout, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import ImageTextCard from "@/navigation/screens/HomeContent/ImageTextCard";
import { SOLANA_RPC_URL, CPG, SOLANA_WALLET_PUBLIC_KEY } from "@/app.config";
import { pkSecureStore } from "./WaletSecureStore";
import { Buffer } from "buffer";

// Configuration globale
global.Buffer = Buffer;
const connection = new Connection(SOLANA_RPC_URL);
const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

/** UTILS FUNCTIONS **/

const fetchTokens = async (pubkey) => {
  console.log("fech hook pk :", pubkey);

  try {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(pubkey),
      { programId: TOKEN_2022_PROGRAM_ID }
    );

    return await Promise.all(
      tokenAccounts.value.map(async (tokenAccount) => {
        const accountData = AccountLayout.decode(tokenAccount.account.data);
        const mintAddress = new PublicKey(accountData.mint).toBase58();
        const amount = parseInt(accountData.amount) / 10 ** 9;
        console.log("amount :" ,amount);
        
        return {
          mintAddress,
          amount,
          name: "Ariary",
          symbol: "Ar",
          image:
            "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafybeih7laba3limk6h6qq2u7gky4xcmqqvfbyx6atq2uillvxil2azaxy",
        };
      })
    );
  } catch (err) {
    console.error("Erreur lors de l'extraction des tokens :", err);
    return [];
  }
};

const getTokenMetadata = async (tokenMintAddress) => {
  try {
    const mintPublicKey = new PublicKey(tokenMintAddress);
    const [metadataPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        METADATA_PROGRAM_ID.toBuffer(),
        mintPublicKey.toBuffer(),
      ],
      METADATA_PROGRAM_ID
    );

    const accountInfo = await connection.getAccountInfo(metadataPDA);
    if (accountInfo) {
      return Metadata.deserialize(accountInfo.data)[0];
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des métadonnées :", error);
  }
  return null;
};

/** CUSTOM HOOK **/

const useTokenAccounts = () => {
  const [tokens, setTokens] = useState([]);
  const walletAddress = pkSecureStore();

  useEffect(() => {
    if (walletAddress == null) {
      setTokens(null);
    } else {
      (async () => {
        const tokenList = await fetchTokens(walletAddress);
        setTokens(tokenList);
      })();
    }
  }, [walletAddress]);

  return tokens;
};

/** COMPONENTS **/

const EachRenderTokenDisplay = ({ token, isVka }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Envoyer", { token: token.mintAddress })
      }
    >
      <ImageTextCard
        imageSource={{ uri: token.image }}
        title={isVka ? CPG.name : token.name}
        description={`${token.amount} ${isVka ? CPG.symbole : token.symbol}`}
      />
    </TouchableOpacity>
  );
};

const TokenDisplay = () => {
  const tokens = useTokenAccounts();
  if(tokens == null) {
    return <Text>Cette address n'as pas de Token associer</Text>
  }
  return (
    <View>
      {tokens.length === 0 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        tokens.map((token, index) => (
          <EachRenderTokenDisplay
            key={token.mintAddress || index}
            token={token}
            isVka={false}
          />
        ))
      )}
    </View>
  );
};

const TokendropDownDisplay = () => {
  const tokens = useTokenAccounts();
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View>
      {tokens.length === 0 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Picker selectedValue={selectedValue} onValueChange={setSelectedValue}>
          {tokens.map((token, index) => (
            <Picker.Item
              key={token.mintAddress || index}
              label={token.mintAddress}
              value={token.mintAddress}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};

const TokenVkaDisplay = () => {
  const tokens = useTokenAccounts();

  return (
    <View>
      {tokens.length === 0 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        tokens
          .filter((token) => token.mintAddress === CPG.mintAddress)
          .map((token, index) => (
            <EachRenderTokenDisplay
              key={token.mintAddress || index}
              token={token}
              isVka={true}
            />
          ))
      )}
    </View>
  );
};

const TokenWithoutVkaDisplay = () => {
  const tokens = useTokenAccounts();
  if(tokens == null) {
    return <Text>Cette address n'as pas de Token associer</Text>
  }
  return (
    <View>
      {!tokens ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        tokens
          .filter((token) => token.mintAddress !== CPG.mintAddress)
          .map((token, index) => (
            <EachRenderTokenDisplay
              key={token.mintAddress || index}
              token={token}
              isVka={false}
            />
          ))
      )}
    </View>
  );
};

const getVkaAmount = () => {
  const tokens = useTokenAccounts();
  if(tokens == null) {
    return "0";
  }
  const vkaToken = tokens.find(
    (token) => token.mintAddress === CPG.mintAddress
  );
  return vkaToken ? vkaToken.amount.toLocaleString("fr-FR") : "0";
};

export {
  TokenDisplay,
  TokendropDownDisplay,
  TokenVkaDisplay,
  getVkaAmount,
  TokenWithoutVkaDisplay,
};
