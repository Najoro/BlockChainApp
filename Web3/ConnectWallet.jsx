import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
// import GetSolanaBalance from './GetSolanaBalance';
import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const Keypair = new PublicKey('Ao4xeDk5kS3XstEfG9C11mqt9NpvePMvH6ZDPompbMwH');
const getBalance = await connection.getBalance(pubkey);

const ConnectWallet = () => {
  return (
    <View>
      <Text>Solana  : {getBalance}</Text>

    </View>
  )
}

export default ConnectWallet

const styles = StyleSheet.create({})