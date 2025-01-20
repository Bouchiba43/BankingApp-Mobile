import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";


export function WithdrawScreen({ route, navigation }) {
    const { userDetails, setUserDetails } = route.params; // Receive userDetails and updater function
    const [amount, setAmount] = useState('');



    const handleWithdraw = async () => {
        const withdrawAmount = parseFloat(amount);

        if (!amount || isNaN(withdrawAmount) || withdrawAmount <= 0) {
            Alert.alert('Error', 'Please enter a valid amount');
            return;
        }

        if (withdrawAmount > userDetails.balance) {
            Alert.alert('Error', 'Insufficient funds');
            return;
        }

        const newBalance = userDetails.balance - withdrawAmount;

        try {
            // Récupérer les utilisateurs depuis AsyncStorage
            const usersData = await AsyncStorage.getItem('users');
            if (usersData) {
                const users = JSON.parse(usersData);

                // Mettre à jour l'utilisateur avec la nouvelle balance et la transaction
                const updatedUsers = users.map(user => {
                    if (user.id === userDetails.id) {
                        user.balance = newBalance;

                        // Ajouter la transaction
                        if (!user.transactions) user.transactions = [];
                        user.transactions.push({
                            id: Date.now(), // Identifiant unique pour la transaction
                            type: 'Retrait',
                            amount: withdrawAmount,
                            date: new Date().toISOString(),
                        });
                    }
                    return user;
                });

                // Enregistrer les mises à jour dans AsyncStorage
                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

                // Mettre à jour l'état local
                setUserDetails({ ...userDetails, balance: newBalance });
            }

            Alert.alert('Success', `Withdrawal of $${withdrawAmount} completed`);
            setAmount(''); // Réinitialiser le champ de saisie

            // Retour à l'écran précédent
            navigation.goBack();
        } catch (error) {
            console.error('Erreur lors de la mise à jour des utilisateurs:', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors du retrait.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Withdraw Funds</Text>
            </View> */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Withdraw Funds</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
                    <Ionicons name="settings-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
                <TouchableOpacity
                    style={[styles.button, userDetails.balance === 0 && styles.buttonDisabled]}
                    onPress={handleWithdraw}
                    disabled={userDetails.balance === 0}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                {userDetails.balance === 0 && <Text style={styles.errorText}>Balance is zero. Cannot withdraw.</Text>}
            </View>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#28a745',
    },
    form: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 80,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    cancelText: {
        color: '#28a745',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default WithdrawScreen;
