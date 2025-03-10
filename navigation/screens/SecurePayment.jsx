import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SecurePayment = () => {
  return (
    <View style ={styles.container}>
      <Text>Payement Securiser</Text>
    </View>
  )
}

export default SecurePayment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})