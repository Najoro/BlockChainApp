import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useCallback, useMemo } from 'react';
import { Button, StyleSheet, Text, View, StatusBar, Platform, TouchableOpacity } from 'react-native';
import isValidSolanaAddress from "@/Web3/Function/IsValidSolanaAddress";


export default function ScanCodeQr(props) {
  const { route } = props; 
  const tokenAddress = route?.params?.token;
  const [permission, requestPermission] = useCameraPermissions();
  const [isValidAddress, setIsValidAddress] = useState(null);
  const navigation = useNavigation();
  const isPermissionGranted = useMemo(() => permission?.granted, [permission]);

  const handleBarcodeScanned = useCallback(({ data }) => {
    const address = data;
    console.log(isValidSolanaAddress(address));
    
    if(isValidSolanaAddress(address)) {
      navigation.navigate("Envoyer", {token: tokenAddress, address: data})
    }else{
      setIsValidAddress(false);      
    }
  }, []);

  if (!permission) return <View />;

  if (!isPermissionGranted) {
    return (
      <View style={styles.permissionContainer}>
      <Text style={styles.permissionMessage}>Autorisez cette application à utiliser votre appareil photo</Text>
      <View style={styles.permissionButton}>
        <TouchableOpacity style={styles.validPermissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Demander la permission</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
  const handleBack = () => {
    navigation.navigate("Envoyer", {token: tokenAddress});
  }
  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && <StatusBar hidden />}
      <Text style={styles.infoScan}>Veuillez scanner le QR code du portefeuille vers lequel vous souhaitez envoyer de l'argent.</Text>
      <CameraView style={styles.camera} facing="back" onBarcodeScanned={handleBarcodeScanned} />
      <TouchableOpacity style={styles.BackButton} onPress={handleBack}>
        <Text style={styles.BackButtonText}>Annuler le scan</Text>
      </TouchableOpacity>
      {isValidAddress == false ? <Text style={[styles.infoScan, styles.infoScanNotValie]}>Ce portefeuille n'est pas Valide</Text>: ""}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  infoScan : {
    fontSize: 20, 
    textAlign:"center",
    margin: 10,
  },
  infoScanNotValie : {
    color: "red",
  },
  camera: {
    flex: 1/2,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  permissionMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  permissionButton: {
    display:"flex",
    flexDirection:"row",
  },
  validPermissionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 5,
    borderRadius: 8,
  },
  rejetPermissionButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    margin: 5,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  BackButton :{
    padding:10,
    margin:20,
    backgroundColor: "#007bff"
  },
  BackButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  }
});
