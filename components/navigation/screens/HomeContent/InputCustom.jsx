import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const InputCustom = ({label}) => {
    const [value , setValue] = useState('');
    return (
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrer une valeur"
              value={value}
              onChangeText={setValue}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1, 
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default InputCustom;
