import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function TransferScreen({ route, navigation }) {

    const { userDetails, setUserDetails } = route.params; // Access user details and updater function
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = async () => {
        const transferAmount = parseFloat(amount);

        if (!recipient || !amount || isNaN(transferAmount)) {
            Alert.alert('Error', 'Please fill out all fields correctly.');
            return;
        }

        if (transferAmount > userDetails.balance) {
            Alert.alert('Error', 'Insufficient balance for this transfer.');
            return;
        }

        const updatedBalance = userDetails.balance - transferAmount;

        // Create a new transaction
        const newTransaction = {
            id: Date.now(), // Unique ID for the transaction
            type: 'Transfer',
            amount: transferAmount,
            recipient: recipient,
            date: new Date().toISOString(),
        };

        // Update user details
        const updatedUser = {
            ...userDetails,
            balance: updatedBalance,
            transactions: [...(userDetails.transactions || []), newTransaction],
        };

        setUserDetails(updatedUser);

        // Update AsyncStorage
        try {
            const usersData = await AsyncStorage.getItem('users');
            if (usersData) {
                const users = JSON.parse(usersData);
                const updatedUsers = users.map(user =>
                    user.id === userDetails.id ? updatedUser : user
                );
                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            }
        } catch (error) {
            console.error('Error updating AsyncStorage:', error);
        }

        // Reset inputs and navigate back
        Alert.alert('Success', `Transfer of $${amount} to ${recipient} completed.`);
        setRecipient('');
        setAmount('');
        navigation.navigate('HomeScreen', { userDetails: updatedUser });
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#007BFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Transfer</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.title}>Transfer Funds</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Recipient's Name"
                    value={recipient}
                    onChangeText={setRecipient}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
                <TouchableOpacity
                    style={[
                        styles.button,
                        userDetails.balance <= 0 ? styles.disabledButton : null,
                    ]}
                    onPress={handleTransfer}
                    disabled={userDetails.balance <= 0}
                >
                    <Text style={styles.buttonText}>
                        {userDetails.balance <= 0 ? 'Insufficient Balance' : 'Transfer'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    headerText: { color: '#28a745', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 80,
    },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#28a745', textAlign: 'center' },
    input: { height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, marginBottom: 16, paddingHorizontal: 10, fontSize: 16 },
    button: { backgroundColor: '#28a745', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
    disabledButton: { backgroundColor: '#ccc' },
    buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});

export default TransferScreen;
