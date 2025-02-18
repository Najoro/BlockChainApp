import { TouchableOpacity, StyleSheet, Text, View, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keycloakConfig } from '../keycloak/KeycloakConfig';

const Auth = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    const authUrl = `${keycloakConfig.serviceConfiguration.authorizationEndpoint}?client_id=${keycloakConfig.clientId}&response_type=code&scope=openid profile email&redirect_uri=${encodeURIComponent(keycloakConfig.redirectUrl)}`;
    const supported = await Linking.canOpenURL(authUrl);

    if (supported) {
      await Linking.openURL(authUrl);
    } else {
      console.error("Impossible d'ouvrir l'URL : ", authUrl);
    }
  };

  // Vérifie si l'utilisateur est authentifié lors du lancement de l'application
  useEffect(() => {
    const checkAuthentication = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
    
    const handleUrl = (event) => {
      const { url } = event;
      if (url) {
        console.log("URL de redirection reçue :", url);

        // Extraction du code d'authentification
        const codeMatch = url.match(/code=([^&]+)/);
        if (codeMatch) {
          const authCode = codeMatch[1];
          console.log("Code d'authentification :", authCode);

          // Sauvegarder le token dans AsyncStorage
          AsyncStorage.setItem("authToken", authCode);
          setToken(authCode);
          setIsAuthenticated(true);
        }else{
          setIsAuthenticated(false);
        }
      }
    };
    // Ajouter l'écouteur d'événements
    const subscription = Linking.addEventListener("url", handleUrl);

    return () => {
      subscription.remove();
    };
  }, []);

  // Rediriger vers la page Home si l'utilisateur est authentifié
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home'); // Utilise `replace` pour éviter de revenir en arrière
    }else{
      navigation.navigate('Login')
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenue</Text>

      {isAuthenticated ? (
        <Text style={styles.statusText}>✅ Connecté</Text>
      ) : (
        <Text style={styles.statusText}>❌ Non connecté</Text>
      )}

      {!isAuthenticated && (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>
      )}

      {isAuthenticated && (
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
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
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
