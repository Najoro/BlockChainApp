import React from 'react'
import { Text, SafeAreaView } from 'react-native'
import ImageTextCard from "./ImageTextCard";

function EmptyWallet() {
  return (
    <>
    <SafeAreaView>
      <ImageTextCard
        imageSource={{
          uri: "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreiaj4blqhdjz3ip3gudqsp4qlocdgkfuudxo6ageuudoptmdoprvcy",
        }}
        title="34123"
        description="0.022"
      />
      <ImageTextCard
        imageSource={{
          uri: "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreibcp36ydah77mxniwlv2dqokteayyqgvhsufwbm6gwzjhang5oqya",
        }}
        title="$4221"
        description="0.121"
      />
      <ImageTextCard
        imageSource={{
          uri: "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreihaxcjvq6ugz5msv4axd5g6sh5jerxxfowhphdsucz2y4kabtvl5y",
        }}
        title="$45852222"
        description="0.002"
      />
    </SafeAreaView>
  </>
  )
}

export default EmptyWallet