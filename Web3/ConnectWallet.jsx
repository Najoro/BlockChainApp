import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {Connection,clusterApiUrl} from "@solana/web3.js";
import GetSolanaBalance from './GetSolanaBalance';
import GetTokenAccount from "./GetTokenAccount"

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const pubkey = "Ao4xeDk5kS3XstEfG9C11mqt9NpvePMvH6ZDPompbMwH";

const ConnectWallet = () => {
  return (
    <View>
      <View>
        <Text style={styles.title}>Get SOL BALANCE</Text>
        <GetSolanaBalance connection={connection} publicKey={pubkey} />
      </View>
      <View>
        <Text style={styles.title}>Liste des token Associer</Text>
        <GetTokenAccount connection={connection} publicKey={pubkey}  />
      </View>
    </View>
  )
}

export default ConnectWallet

const styles = StyleSheet.create({
  title : {
    fontSize : 16,
    color : "blue",
  }
})