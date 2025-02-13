// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// const AuthScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{isSignUp ? 'Inscription' : 'Connexion'}</Text>
//       <TextInput
//         style={styles.input}
//         placeholder='Email'
//         value={email}
//         onChangeText={setEmail}
//         keyboardType='email-address'
//         autoCapitalize='none'
//       />
//       <TextInput
//         style={styles.input}
//         placeholder='Mot de passe'
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>{isSignUp ? 'S\'inscrire' : 'Se connecter'}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
//         <Text style={styles.toggleText}>
//           {isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     width: '100%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   toggleText: {
//     marginTop: 10,
//     color: '#007bff',
//   },
// });

// export default AuthScreen;


import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Auth = () => {
  const handleLogin = () => {
    // Logique de connexion ici
    navigation.navigate("Home")
  };
  return (
    <View style={styles.container}>
    <Text style={styles.welcomeText}>Bienvenue</Text>
    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
      <Text style={styles.loginText}>Se connecter</Text>
    </TouchableOpacity>
  </View>
  )
}

export default Auth

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f55',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
