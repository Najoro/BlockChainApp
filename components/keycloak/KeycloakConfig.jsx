export const keycloakConfig = {
    issuer: "https://preprod.sso.eqima.org/realms/blockchain",
    clientId: "BlockchainApp",
    redirectUrl: "exp://192.168.88.12:8081",
    scopes: ["openid", "profile", "email"],
    serviceConfiguration: {
      authorizationEndpoint:
        "https://preprod.sso.eqima.org/realms/blockchain/protocol/openid-connect/auth",
      tokenEndpoint:
        "https://preprod.sso.eqima.org/realms/blockchain/protocol/openid-connect/token",
      revocationEndpoint:
        "https://preprod.sso.eqima.org/realms/blockchain/protocol/openid-connect/logout",
    },
  };
  