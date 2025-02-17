import { TouchableOpacity, StyleSheet, Text, View, Linking} from 'react-native'

import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {keycloakConfig} from './keycloak/KeycloakConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const handleLogin = async() => {
    const authUrl = `${keycloakConfig.serviceConfiguration.authorizationEndpoint}?client_id=${keycloakConfig.clientId}&response_type=code&scope=openid profile email&redirect_uri=${encodeURIComponent(keycloakConfig.redirectUrl)}`;
    const supported = await Linking.canOpenURL(authUrl);

    if (supported) {
      const url = await Linking.openURL(authUrl);
      // console.log("url : ", url);
      
    } else {
      console.error("Impossible d'ouvrir l'URL : ", authUrl);
    }
  };


const Auth = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const handleUrl = async (event) => {
      const { url } = event;
      if(url) {
        setToken(url);
        console.log("true");
        
      }
      
    };
    
    const t = Linking.addEventListener("url", handleUrl);

    console.log(t);
    return () => {
      Linking.removeAllListeners("url");
    };
    
  }, []);
  
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
