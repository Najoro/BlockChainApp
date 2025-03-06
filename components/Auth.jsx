import React, { useState, useEffect } from "react";
import { View, Linking, StyleSheet } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keycloakConfig } from "./keycloak/KeycloakConfig";

const Auth = () => {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    const authUrl = `${
      keycloakConfig.serviceConfiguration.authorizationEndpoint
    }?client_id=${
      keycloakConfig.clientId
    }&response_type=code&scope=openid profile email&redirect_uri=${encodeURIComponent(
      keycloakConfig.redirectUrl
    )}`;

    const supported = await Linking.canOpenURL(authUrl);
    if (supported) {
      await Linking.openURL(authUrl);
    } else {
      console.error("Impossible d'ouvrir l'URL :", authUrl);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigation.replace("Login");
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      setIsAuthenticated(!!storedToken);
    };

    checkAuthentication();

    const handleUrl = (event) => {
      const { url } = event;
      if (url) {
        const codeMatch = url.match(/code=([^&]+)/);
        if (codeMatch) {
          const authCode = codeMatch[1];
          AsyncStorage.setItem("authToken", authCode);
          setIsAuthenticated(true);
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleUrl);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("walletLogin");
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Bienvenue 👋</Text>
          <Text
            style={[
              styles.statusText,
              isAuthenticated ? styles.connectedText : styles.disconnectedText,
            ]}
          >
            {isAuthenticated ? "Connecté ✅" : "Non connecté ❌"}
          </Text>

          {!isAuthenticated ? (
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
            >
              Se connecter
            </Button>
          ) : (
            <Button
              mode="contained"
              buttonColor="#d9534f"
              onPress={handleLogout}
              style={styles.button}
            >
              Se déconnecter
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  connectedText: {
    color: "green",
  },
  disconnectedText: {
    color: "red",
  },
  button: {
    marginTop: 10,
  },
});
