import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "../components/navigation/StackNavigation";
import { AuthProvider, useAuth } from "../components/auth/AuthProvider";
import { View, ActivityIndicator } from "react-native";
import Auth from "../components/auth/Auth";

const RootLayout = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthWrapper />
      </NavigationContainer>
    </AuthProvider>
  );
};

const AuthWrapper = () => {
  const { userToken, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return userToken ? <StackNavigation /> : <Auth />;
};

export default RootLayout;
