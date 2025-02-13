import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {keycloakConfig} from './keycloak/KeycloakConfig';
import {authorize} from 'react-native-app-auth';

const REDIRECT_URI = 'myapp://callback';
const CLIENT_ID = 'BlockchainApp';
const keycloakURL = `https://preprod.sso.eqima.org/realms/blockchain/protocol/openid-connect/auth` +
  `?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=openid profile email` +
  `&kc_idp_hint=google`;

const Auth = () => {
  const navigation = useNavigation();

  const handleLogin = async() => {
    // Logique de connexion ici
    // navigation.navigate("Home")
    try {
      const result = await authorize(keycloakConfig);
      console.log("Connexion réussie : ", result);
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
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
