import React, { useEffect, useState } from "react";
import { Button, Linking, View, Text } from "react-native";
import axios from "axios";
import { keycloakConfig } from "./keycloakConfig";

const Auth = () => {
  const [authCode, setAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const handleUrl = async (event) => {
      const { url } = event;
      const code = new URL(url).searchParams.get("code");

      if (code) {
        setAuthCode(code);
        await exchangeCodeForToken(code); // Échanger le code contre un token
      }
    };

    Linking.addEventListener("url", handleUrl);

    return () => {
      Linking.removeEventListener("url", handleUrl);
    };
  }, []);

  // 🔹 Fonction pour ouvrir Keycloak
  const loginWithKeycloak = async () => {
    const authUrl = `${keycloakConfig.serviceConfiguration.authorizationEndpoint}?client_id=${keycloakConfig.clientId}&response_type=code&scope=openid profile email&redirect_uri=${encodeURIComponent(keycloakConfig.redirectUrl)}`;

    const supported = await Linking.canOpenURL(authUrl);
    if (supported) {
      await Linking.openURL(authUrl);
    } else {
      console.error("❌ Impossible d'ouvrir l'URL :", authUrl);
    }
  };

  // 🔹 Échanger le code contre un token avec Axios
  const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.post(keycloakConfig.serviceConfiguration.tokenEndpoint, new URLSearchParams({
        grant_type: "authorization_code",
        client_id: keycloakConfig.clientId,
        redirect_uri: keycloakConfig.redirectUrl,
        code,
      }).toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      console.log("✅ Token reçu :", response.data);
      setAccessToken(response.data.access_token);
      await fetchUserInfo(response.data.access_token);
    } catch (error) {
      console.error("❌ Erreur lors de l'échange du token :", error.response ? error.response.data : error);
    }
  };

  // 🔹 Récupérer les infos de l'utilisateur avec le token
  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get(keycloakConfig.serviceConfiguration.userInfoEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Infos utilisateur :", response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.error("❌ Erreur récupération user info :", error.response ? error.response.data : error);
    }
  };

  return (
    <View>
      {accessToken ? (
        <>
          <Text>🔑 Token reçu !</Text>
          {userInfo && <Text>👤 {userInfo.name}</Text>}
        </>
      ) : (
        <Button title="Se connecter avec Keycloak" onPress={loginWithKeycloak} />
      )}
    </View>
  );
};

export default Auth;
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const checkActiveSession = async () => {
  //     try {
  //       // Récupérer le token d'accès stocké
  //       const accessToken = await AsyncStorage.getItem('accessToken');

  //       if (accessToken) {
  //         // Vérifier la validité du token en faisant une requête à une API protégée
  //         const response = await axios.get(keycloakConfig.serviceConfiguration.authorizationEndpoint, {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         });

  //         if (response.status === 200) {
  //           // L'utilisateur est connecté
  //           setIsLoggedIn(true);
  //           // Rediriger vers un écran approprié ou afficher un message
  //           navigation.navigate('MainScreen');
  //         }
  //       } else {
  //         // Aucun token trouvé, l'utilisateur n'est pas connecté
  //         setIsLoggedIn(false);
  //       }
  //     } catch (error) {
  //       console.error('Erreur lors de la vérification de la session :', error);
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkActiveSession();
  // }, [navigation]);
