import { useEffect, useState } from "react";
import {GetFromSecureStore} from "./../services/SecureStore";

export const pkSecureStore = () => { 
    const [pk, setPk] = useState("5dL2fzK5no6m4Q8GUK14zfYQrj27sf6gzrpu2hnz4NF9");

    useEffect(() => {
        const fetchSecureStore = async () => {
            try {
                const dataSecureStore = await GetFromSecureStore("walletInfo");
                if (dataSecureStore && dataSecureStore.publicKey) {
                    setPk(dataSecureStore.publicKey);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données du SecureStore :", error);
            }
        };

        fetchSecureStore();
    }, []);

    return pk;
};

export const skSecureStore = () => {
    const [sk, setSk] = useState(null);

    useEffect(() => {
        const fetchSecureStore = async () => {
            try {
                const dataSecureStore = await GetFromSecureStore("walletInfo");
                if (dataSecureStore && dataSecureStore.secretKey) {
                    setSk(dataSecureStore.secretKey);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données du SecureStore :", error);
            }
        };

        fetchSecureStore();
    }, []);

    return sk;
};