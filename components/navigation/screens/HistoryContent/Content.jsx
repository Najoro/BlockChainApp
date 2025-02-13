import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ImageTextCard from '../HomeContent/ImageTextCard'

function Content({date}) {
  return (
    <View style= {s.container}>
        <Text style={s.title}>{date}</Text>
        <View>
            <ImageTextCard 
            imageSource={{
            uri: "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreidbtcki227qnikxjnj4jz6i34eso6vml6xtaquvdtszi23purydt4",
          }}
          title="$78546"
          description="0.000002"
          type = 'historique'/>
          <ImageTextCard 
          imageSource={{
          uri: "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreihaxcjvq6ugz5msv4axd5g6sh5jerxxfowhphdsucz2y4kabtvl5y",
        }}
        title="$3564"
        description="0.000002"
        type = 'historique'/>
        <ImageTextCard 
        imageSource={{
        uri: "https://red-leading-marmot-607.mypinata.cloud/ipfs/bafkreibcp36ydah77mxniwlv2dqokteayyqgvhsufwbm6gwzjhang5oqya",
      }}
      title="$58962"
      description="0.000002"
      type = 'historique'/>
        </View>
    </View>
  )
}

export default Content

const s = StyleSheet.create(
    {
        title:{
            margin: 2,
            padding:5,
            fontSize: 16, 
            opacity: 0.4,
            marginBottom: -5,
        },
        container:{
          marginTop:5,
          marginBottom:5,
          backgroundColor: 'white'

        }

    }
)
