import React, { useState, useCallback } from "react";
import { Image } from "react-native";
import {
  SOLANA_WALLET_PUBLIC_KEY,
  SOLANA_WALLET_PRIVATE_KEY,
} from "@/app.config";

import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";

const FactureScreen = () => {
  const [refClient, setRefClient] = useState("23528211520");
  const [refFacture, setRefFacture] = useState("235210721202566");
  const [modalVisible, setModalVisible] = useState(false);
  const [idPaiement, setIdPaiement] = useState(0);
  const [loading, setLoading] = useState(false);
  const [montantTotal, setMontantTotal] = useState(0);
  const [adressRecipient, setAdressRecipient] = useState(
    "Hz5wAtoNTA1fqHZkvZYufzNso4xwZXXCRMhYQnrwzxCx"
  );
  const [adressSender, setAdressSender] = useState(
    "7qfzthjwoh4hDk5ZhFARMDXEpkCDtCVkmrpG4iWU2pP4"
  );
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [outputFacture, setOutpuFacture] = useState("");
  const [factureData, setFactureData] = useState({
    clientName: "",
    addressClient: "",
    montantFacture: "",
  });

  const fetchFactureData = async () => {
    setLoading(true);
    try {
      const [factureResponse, clientResponse] = await Promise.all([
        fetch(
          `https://preprod.api.cashless.eqima.org/jiramacontroller/montantFacture2?referencefacture=${refFacture}`
        ),
        fetch(
          `https://preprod.api.cashless.eqima.org/jiramacontroller/infoClient?referencefacture=${refFacture}&referenceclient=${refClient}`
        ),
      ]);

      const dataFacture = await factureResponse.json();
      const dataClient = await clientResponse.json();

      setFactureData({
        montantFacture:
          dataFacture?.ds_F55INV?.output?.[0]?.["F55INV.55TRINVA_SUM"] || "N/A",
        clientName:
          dataClient?.fs_DATABROWSE_V55WS1A?.data?.gridData?.rowset?.[0]
            ?.F0101_ALPH || "Nom inconnu",
        addressClient:
          dataClient?.fs_DATABROWSE_V55WS1A?.data?.gridData?.rowset?.[0]
            ?.F0116_ADD1 || "Adresse inconnue",
        mois: dataFacture?.ds_F55INV?.output?.[0]?.["F55INV.PN_AVG"] || "N/A",
        annee: dataFacture?.ds_F55INV?.output?.[0]?.["F55INV.CFY_AVG"] || "N/A",
      });

      const MT = factureData.montantFacture + 100;

      setMontantTotal(MT);
      console.log(montantTotal);

      if (
        !dataFacture?.ds_F55INV?.output ||
        dataFacture.ds_F55INV.output.length === 0
      ) {
        setModalVisible(false);
        Alert.alert("Cette facture est déjà payée");
        setLoading(false);
        return;
      } else {
        setModalVisible(true);
        setLoading(false);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de récupérer les informations.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(async () => {
    try {
      if (!refClient || !refFacture) {
        Alert.alert("Erreur", "Veuillez remplir les champs de référence.");
        return;
      }
      await fetchFactureData();
    } catch (error) {
      Alert.alert("Cette reference est inexistante");
    }
  }, [refClient, refFacture]);

  const initialisePaiement = async () => {
    try {
      const { clientName, addressClient, montantFacture, mois, annee } =
        factureData;

      const response = await fetch(
        "https://preprod.api.cashless.eqima.org/api/paiement_facture/insertPost",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            frais: 100,
            operateur: "Volanaka",
            numeroPayeur: SOLANA_WALLET_PUBLIC_KEY,
            refFacture: refFacture,
            refClient: refClient,
            montantFacture: montantFacture,
            nomClient: clientName,
            adresseClient: addressClient,
            mois: mois,
            annee: annee,
            caissier: "vka-001",
            etat: "INITIE",
            total: montantTotal,
          }),
        }
      );
      const result = await response.json();
      if (result.id) {
        setIdPaiement(result.id);
        const dateNow = new Date();
        console.log(result.id);
        setModalVisible(false);
        setTransactionModalVisible(true);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'initer le paiement.");
    } finally {
      setLoading(false);
    }
  };
  const fetchTransfer = async () => {
    const transferAPI = "https://preprod-vka2.eqima.org/wallet/transfer";
    const body = {
      senderAddress: adressSender,
      receiverAddress: adressRecipient,
      amount: montantTotal,
      senderKey: SOLANA_WALLET_PRIVATE_KEY,
    };

    console.log("Test transfer - Sender Address:", body.amount);

    try {
      const response = await fetch(transferAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log("Réponse de l'API:", result);
      setLoading(false);
      return result;
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setLoading(false);
    }
  };

  const envoyerTransaction = async () => {
    setLoading(true);

    try {
      const resultTransfer = await fetchTransfer();
      const signature = resultTransfer.signature;
      if (signature != undefined) {
        const URI = `https://preprod.api.cashless.eqima.org/api/paiement_facture/setRefTransaction?reftransaction=${signature}&idPaiement=${idPaiement}`;
        const setRef = await fetch(URI);

        if (!setRef.ok) {
          throw new Error(`Erreur API: ${setRef.status}`);
        }

        Alert.alert("Succès", "Transaction envoyée et référence mise à jour !");
        console.log("Réponse API setRef:", await setRef.json());

        const operateur = "Volanaka";
        const dateNow = new Date();
        const dateFormat = `${dateNow.getFullYear()}${dateNow.getMonth() + 1}`;
        const operationId = `${dateFormat}${idPaiement}_${operateur}`;
        const controlId = "controlIdadressPayeurVka_Eqima";
        await reglementJirama(signature, operateur, operationId, controlId);

        setTransactionModalVisible(false);
      }
    } catch (error) {
      Alert.alert(
        "Erreur",
        `Impossible d'envoyer la transaction: ${error.message}`
      );
      console.error("Erreur envoyerTransaction:", error);
      setTransactionModalVisible(false);
    } finally {
      setLoading(false);
    }
  };

  const reglementJirama = async (
    signature,
    operateur,
    operationId,
    controlId
  ) => {
    try {
      const url = `https://preprod.api.cashless.eqima.org/jiramacontroller/reglementFacture?referencefacture=${refFacture}&controlid=${controlId}&transid=${signature}&operationid=${operationId}&operateur=${operateur}`;

      const reglementFact = await fetch(url);
      const reglementFactData = await reglementFact.json();

      if (!reglementFact.ok) {
        throw new Error(`Erreur API: ${reglementFact.status}`);
      }

      console.log("Réponse du règlement :", reglementFactData);
      const getCodeRecu =
        reglementFactData?.fs_P55PAYFA_W55PAYFAA?.data?.txtRecuCode_31?.value ||
        "Reçu non disponible";
      console.log("Code reçu 3:", getCodeRecu);

      //Recuperation du code reçu
      const setCodeRecuURL = `https://preprod.api.cashless.eqima.org/api/paiement_facture/setCodeRecu?coderecu=${getCodeRecu}&id=${idPaiement}`;
      const setCodeRecuResponse = await fetch(setCodeRecuURL);

      if (!setCodeRecuResponse.ok) {
        throw new Error(
          `Erreur API setCodeRecu: ${setCodeRecuResponse.status}`
        );
      }
      console.log("Code reçu mis à jour avec succès !");

      //Mise à jour de l'état du paiement à SUCCESS
      const setStateUrl = `https://preprod.api.cashless.eqima.org/api/paiement_facture/setState?etat=SUCCESS&id=${idPaiement}`;
      const setStateResponse = await fetch(setStateUrl);

      if (!setStateResponse) {
        throw new Error(`Erreur API setState: ${setStateResponse.status}`);
      }
      console.log("État du paiement mis à jour en SUCCESS !");

      Alert.alert(
        "Succès",
        "Règlement effectué, code reçu mis à jour et paiement validé !"
      );
      setTransactionModalVisible(false);
    } catch (error) {
      Alert.alert(
        "Erreur",
        `Impossible d'effectuer le règlement: ${error.message}`
      );
      console.error("Erreur reglementJirama:", error);
      setTransactionModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style = {styles.containerImage}>
        <Image
          source={require("@/assets/images/JirakaikyLogo.png")}
          style={{ width: 200, height: 150 }}
        />
      </View>
      <Text style={styles.label}>Référence client</Text>
      {/* Champs de saisie */}
      <TextInput
        style={styles.input}
        placeholder="Entrez la référence client"
        value={refClient}
        onChangeText={setRefClient}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Référence facture</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez la référence facture"
        value={refFacture}
        onChangeText={setRefFacture}
        keyboardType="numeric"
      />

      {/* Bouton de recherche */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button mode="contained" onPress={handleSearch} style={styles.button}>
          Rechercher
        </Button>
      )}

      {/* Modal pour afficher les détails */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Ionicons
              name="information-circle-outline"
              size={50}
              color="#007AFF"
            />
            <Text style={styles.modalTitle}>Détails de la Facture</Text>

            <View style={styles.factureInfo}>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Nom du client:</Text>{" "}
                {factureData.clientName}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Adresse:</Text>{" "}
                {factureData.addressClient}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Référence Facture:</Text> {refFacture}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Montant:</Text>{" "}
                {Math.ceil(factureData.montantFacture)} Ar
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Frais :</Text> 100 Ar
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Montant Total :</Text>{" "}
                {Math.ceil(factureData.montantFacture) + 100} Ar
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Status :</Text> Non Payé
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={initialisePaiement}
              style={styles.button}
            >
              Payer
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                setModalVisible(false);
              }}
              style={[styles.resets]}
            >
              <Ionicons name= "close-circle-outline" size="25" color= "#007AFF"/>
            </Button>
          </View>
        </View>
      </Modal>

      {/* Modal Transaction */}
      <Modal
        visible={transactionModalVisible}
        transparent
        onRequestClose={() => setTransactionModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Ionicons name="wallet-outline" size={50} color="#007AFF" />
            <Text style={styles.modalTitle}>Confirmer la Transaction</Text>
            <View style = {styles.modalContainer}>
              <Text style={styles.infoText}>
                Montant total : {montantTotal + 100} Ar
              </Text>
              <Text style={styles.infoText}>Payer avec : VOLANAKA</Text>

              <TextInput
                style={[styles.input, { display: "none" }]}
                placeholder="Adresse du destinataire"
                value={adressRecipient}
                onChangeText={setAdressRecipient}
              />
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : (
              <Button
                mode="contained"
                onPress={envoyerTransaction}
                style={styles.button}
              >
                Confirmer
              </Button>
            )}
            <Button
              mode="contained"
              onPress={() => {
                setTransactionModalVisible(false);
              }}
              style={[styles.resets]}
            >
              <Ionicons name= "close-circle-outline" size="25" color= "#007AFF"/>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    padding: 25,
    backgroundColor: "#f8f9fa",
  },
  logo: {
    width: 200,
    height: 150,
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    marginTop : 10,
    borderRadius: 30,
    padding:5,
    backgroundColor: "#007AFF",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 320,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#007AFF",
  },
  factureInfo: {
    alignItems: "flex-start",
    marginBottom: 20,
    width: "100%",
  },
  infoText: {
    fontSize: 13,
    color: "#555",
    marginVertical: 2,
  },
  bold: {
    fontWeight: "bold",
    color: "#333",
  },
  resets: {
    position:"absolute",
    top: 20,
    right: 2,
    backgroundColor:"None"
  },
  label: {
    fontSize: 20,
    marginBottom: 5
  },
  containerImage: {
    display: "flex",
    alignItems:"center",
    justifyContent:"space-evenly",
    margin: 10
  },
  modal:{
    position:"relative"
  },
  modalContainer: {
    display: "flex",
    alignItems:"flex-start",
    justifyContent: "flex-start",
    marginLeft: -20
  }
});

export default FactureScreen;
