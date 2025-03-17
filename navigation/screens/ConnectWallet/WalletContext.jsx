import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Keypair } from "@solana/web3.js";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);

  // Charger le wallet depuis SecureStore au démarrage
  useEffect(() => {
    const loadWallet = async () => {
      try {
        const storedPublicKey = await SecureStore.getItemAsync("publicKey");
        const storedSecretKey = await SecureStore.getItemAsync("secretKey");

        if (storedPublicKey && storedSecretKey) {
          setWallet({
            publicKey: storedPublicKey,
            secretKey: JSON.parse(storedSecretKey),
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement du wallet :", error);
      }
    };

    loadWallet();
  }, []);

  // Fonction pour créer un nouveau wallet
  const createWallet = async () => {
    try {
      const keypair = Keypair.generate();
      const secretKey = Array.from(keypair.secretKey); // Convertir en tableau pour stockage
      const publicKey = keypair.publicKey.toBase58();

      // Sauvegarder en local de manière sécurisée
      await SecureStore.setItemAsync("publicKey", publicKey);
      await SecureStore.setItemAsync("secretKey", JSON.stringify(secretKey));

      const newWallet = { publicKey, secretKey };
      setWallet(newWallet);

      return newWallet;
    } catch (error) {
      console.error("Erreur lors de la création du wallet :", error);
      return null;
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, createWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
