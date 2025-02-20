import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import {AccountLayout, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { PublicKey } from '@solana/web3.js';

const GetTokenAccount = ({connection , publicKey}) => {
    const [tokens, setTokens] = useState([]);
    
    // useEffect(() =>{
    //     (async () => {
    //         try{
    //             const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
    //                 programId : TOKEN_PROGRAM_ID,
    //             });

    //             tokenAccounts.value.forEach((tokenAccount) => {
    //                 const accountData = AccountLayout.decode(tokenAccount.account.data);
    //                 setTokens(...{account : accountData.mint, amount : accountData.amount});
    //                 console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
    //             })

    //         }catch(err) {
    //             console.log("error d'extraction token");
    //             console.log(err);
    //         }
    //     })([publicKey]);
    // },[])

  return (
    <View>
        <Text>chargement</Text>
    </View>
  )
}

export default GetTokenAccount

const styles = StyleSheet.create({})