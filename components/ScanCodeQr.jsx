import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useCallback, useMemo } from 'react';
import { Button, StyleSheet, Text, View, StatusBar, Platform, TouchableOpacity } from 'react-native';

export default function ScanCodeQr(props) {
  const { route } = props; 
  const tokenAddress = route?.params?.token;
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();
  const isPermissionGranted = useMemo(() => permission?.granted, [permission]);

  const handleBarcodeScanned = useCallback(({ data }) => {
    if(data != null) {
      navigation.navigate("Envoyer", {token: tokenAddress, address: data})
    }
  }, []);

  if (!permission) return <View />;

  if (!isPermissionGranted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }
  const handleBack = () => {
    navigation.navigate();
  }
  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && <StatusBar hidden />}
      <CameraView style={styles.camera} facing="back" onBarcodeScanned={handleBarcodeScanned} >
          <TouchableOpacity onPress={handleBack}>
              <Text>Back</Text>
          </TouchableOpacity>
      </CameraView>
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
  camera: {
    flex: 1,
  },
});
