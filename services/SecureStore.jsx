import * as SecureStore from 'expo-secure-store';

/**
 * Sauvegarde une donnée dans SecureStore
 * @param {string} key - Clé sous laquelle la donnée sera stockée
 * @param {any} value - Valeur à stocker (objet, string, etc.)
 */
export async function SaveToSecureStore(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
    });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
  }
}

/**
 * Récupère une donnée depuis SecureStore
 * @param {string} key - Clé de la donnée à récupérer
 * @returns {any|null} - Valeur récupérée (objet ou string), ou null si non trouvée
 */
export async function GetFromSecureStore(key) {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return null;
  }
}

/**
 * Supprime une donnée depuis SecureStore
 * @param {string} key - Clé de la donnée à supprimer
 */
export async function DeleteFromSecureStore(key) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
}
