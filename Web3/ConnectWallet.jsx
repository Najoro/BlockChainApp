import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GetSolanaBalance from './GetSolanaBalance';

const ConnectWallet = () => {
  const pubkey = "Ao4xeDk5kS3XstEfG9C11mqt9NpvePMvH6ZDPompbMwH";
  return (
    <View>
      <Text><GetSolanaBalance publicKey={pubkey} /></Text>
      {/* <Text>asx</Text> */}
    </View>
  )
}

export default ConnectWallet

const styles = StyleSheet.create({})