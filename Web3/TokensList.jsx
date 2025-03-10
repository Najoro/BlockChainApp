import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";
import {Connection,clusterApiUrl} from "@solana/web3.js";
import GetSolanaBalance from './GetSolanaBalance';
import {TokenDisplay} from "./GetTokenAccount";

import {SOLANA_WALLET_PUBLIC_KEY, SOLANA_RPC_URL} from "@/app.config";

import { Buffer } from "buffer";
global.Buffer = Buffer;

const connection = new Connection(SOLANA_RPC_URL);
const pubkey = SOLANA_WALLET_PUBLIC_KEY;

const TokensList = () => {
  return (
    <View>
      <View>
        <Text style={styles.title}>Token associé</Text>
        <TokenDisplay connection={connection} publicKey={pubkey}  />
      </View>
    </View>
  )
}

export default TokensList;

const styles = StyleSheet.create({
  solanaBalance : {
    display : "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title : {
    fontSize : 20,
    marginTop : 20,
    fontWeight: "bold",
    color : "#3674B5",
  }
})