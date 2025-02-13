export const keycloakConfig = {
    issuer: "https://preprod.sso.eqima.org/realms/blockchain",
    clientId: "blockchainApp",
    redirectUrl: "myapp://callback",
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
  