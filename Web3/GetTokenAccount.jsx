import React, { useEffect, useState } from "react";
import { AccountLayout, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import ImageTextCard from "@/navigation/screens/HomeContent/ImageTextCard";
import { useNavigation } from "@react-navigation/native";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Picker } from "@react-native-picker/picker";
import { SOLANA_WALLET_PUBLIC_KEY, SOLANA_RPC_URL, CPG } from "@/app.config";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const cn = new Connection(SOLANA_RPC_URL);
const pk = SOLANA_WALLET_PUBLIC_KEY;

import { Buffer } from "buffer";

global.Buffer = Buffer;
// Adresse du programme Metaplex Token Metadata
const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const fetchTokens = async (connection = cn, publicKey = pk) => {
  try {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(publicKey),
      {
        programId: TOKEN_2022_PROGRAM_ID,
      }
    );

    return await Promise.all(
      tokenAccounts.value.map(async (tokenAccount) => {
        const accountData = AccountLayout.decode(tokenAccount.account.data);
        const mintAddress = new PublicKey(accountData.mint).toBase58();
        const amount = parseInt(accountData.amount) / 10 ** 9;

        const metadata = await getTokenMetadata(connection, mintAddress);
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

//get metadata
async function getTokenMetadata(connection, tokenMintAddress) {
  try {
    const mintPublicKey = new PublicKey(tokenMintAddress);

    // Trouver l'adresse des métadonnées associées au token
    const [metadataPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        METADATA_PROGRAM_ID.toBuffer(),
        mintPublicKey.toBuffer(),
      ],
      METADATA_PROGRAM_ID
    );
    // console.log("metadataPDA:", metadataPDA.toBase58());

    // Récupérer les informations du compte
    const accountInfo = await connection.getAccountInfo(metadataPDA);
    if (accountInfo) {
      const metadata = Metadata.deserialize(accountInfo.data)[0];
      console.log("Metadata :", metadata);
    } else {
      // console.log(
      //   "Aucune metadata trouvée pour ce token.",
      //   metadataPDA.toBase58()
      // );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des métadonnées :", error);
  }
}

const GetTokenAccount = ({ connection = cn, publicKey = pk }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    (async () => {
      const tokenList = await fetchTokens(connection, publicKey);
      setTokens(tokenList);
    })();
  }, [publicKey, connection]);

  return tokens;
};

const TokenDisplay = ({ connection = cn, publicKey = pk }) => {
  const navigation = useNavigation();
  const tokens = GetTokenAccount({ connection, publicKey });
  return (
    <View>
      {tokens.length === 0 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        tokens.map((token, index) => (
          <EachRenderTokenDisplay index={index} token={token} isVka={false} />
        ))
      )}
    </View>
  );
};

const TokendropDownDisplay = ({ connection = cn, publicKey = pk }) => {
  const tokens = GetTokenAccount({ connection, publicKey });
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View>
      {tokens.length === 0 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          {tokens.map((token, index) => (
            <Picker.Item
              key={index}
              label={token.mintAddress}
              value={token.mintAddress}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};
/**VOLANAKA --------------------------------------------------------------------------- */
const TokenVkaDisplay = ({ connection = cn, publicKey = pk }) => {
  const navigation = useNavigation();
  const tokens = GetTokenAccount({ connection, publicKey });
  return (
    <View>
      {tokens.length === 0 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        tokens.map((token,index) =>
            token.mintAddress == CPG.mintAddress && (
              <EachRenderTokenDisplay  key={token.mintAddress || index} index={index} isVka={true} token={token} />
          )
        )
      )}
    </View>
  );
};

const TokenWithoutVkaDisplay = ({ connection = cn, publicKey = pk }) => {
  const navigation = useNavigation();
  const tokens = GetTokenAccount({ connection, publicKey });
  return (
    <View>
      {tokens.length === 0 ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        tokens.map((token, index) =>
            token.mintAddress != CPG.mintAddress && (
              <EachRenderTokenDisplay key={token.mintAddress || index} index={index} token={token} />
          )
        )
      )}
    </View>
  );
};

const getVkaAmount = () => {
  const tokens = GetTokenAccount(cn, pk);
  const [vkaAmount, setVkaAmount] = useState(0);
  useEffect(() => {
    tokens.forEach((token) => {
      if (token.mintAddress === CPG.mintAddress) {
        setVkaAmount(token.amount);
      }
    });
  }, [tokens, CPG]);

  return vkaAmount.toLocaleString("fr-FR");
};


/**FUNCTIONS ---------------------------------------------------------- */
const EachRenderTokenDisplay = ({ token, index, isVka = false }) => {
  const navigation = useNavigation();
  const handelPress = () => {
    navigation.navigate("Envoyer", { token: token.mintAddress });
  };
  return (
    <>
      {isVka ? (
        <TouchableOpacity key={index} onPress={handelPress}>
          <ImageTextCard
            imageSource={{ uri: token.image }}
            title={CPG.name}
            description={token.amount + " " + CPG.symbole}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity key={index} onPress={handelPress}>
          <ImageTextCard
            imageSource={{ uri: token.image }}
            title={token.name}
            description={token.amount + " " + token.symbol}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export {
  GetTokenAccount,
  TokenDisplay,
  TokendropDownDisplay,
  TokenVkaDisplay,
  getVkaAmount,
  TokenWithoutVkaDisplay,
};
