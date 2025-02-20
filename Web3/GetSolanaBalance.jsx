import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Connection, PublicKey } from '@solana/web3.js';

const GetSolanaBalance = ({ publicKey }) => {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const connection = new Connection('https://api.mainnet-beta.solana.com');

        const getBalance = async () => {
            try {
                const lamports = await connection.getBalance(new PublicKey(publicKey));
                setBalance(lamports);
            } catch (err) {
                setError('Erreur lors de la récupération du solde');
                console.error(err);
            }
        };

        getBalance();
    }, [publicKey]);

    return (
        <View style={styles.container}>
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <Text style={styles.balanceText}>
                    Solde: {balance !== null ? `${balance} lamports` : 'Chargement...'}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    balanceText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export default GetSolanaBalance;
