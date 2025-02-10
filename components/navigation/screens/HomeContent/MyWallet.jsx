import React from "react";
import {StyleSheet, SafeAreaView } from "react-native";
import ImageTextCard from "./ImageTextCard";

function MyWallet() {
  return (
    <>
      <SafeAreaView>
        <ImageTextCard
          imageSource={{
            uri: "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreidbtcki227qnikxjnj4jz6i34eso6vml6xtaquvdtszi23purydt4",
          }}
          title="$458521"
          description="0.000002"
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
  );
}

export default MyWallet;
