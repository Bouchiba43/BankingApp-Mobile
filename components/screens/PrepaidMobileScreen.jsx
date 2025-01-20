import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function PrepaidMobileScreen({ navigation, route }) {
    const { userDetails, setUserDetails } = route.params;

    const [operator, setOperator] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const operators = [
        { id: 'orange', name: 'Orange Tunisia', logo: require('../../assets/orange.png') },
        { id: 'ooredoo', name: 'Ooredoo Tunisia', logo: require('../../assets/ooredoo.png') },
        { id: 'telecom', name: 'Tunisie Telecom', logo: require('../../assets/telecom.png') }
    ];

    const amounts = ['5', '10', '20', '30', '50'];

    if (userDetails.balance < amount) {
        Alert.alert("Error", "Insufficient balance.");
    }

    // Update user balance and transaction history
    const updatedUser = {
        ...userDetails,
        balance: userDetails.balance - amount,
        transactions: [
            ...(userDetails.transactions || []),
            {
                id: new Date().getTime(),
                type: "Recharge",
                date: new Date().toISOString(),
                amount: amount,
                recipient: `${operator}: ${phoneNumber}`,
            },
        ],
    };
    setUserDetails(updatedUser);

    const handleRecharge = () => {
        if (!operator) {
            setError('Please select an operator');
            return;
        }
        if (!phoneNumber || phoneNumber.length !== 8) {
            setError('Please enter a valid 8-digit phone number');
            return;
        }
        if (!amount) {
            setError('Please select an amount');
            return;
        }

        Alert.alert(
            'Success',
            `Recharge successful!\nOperator: ${operator}\nPhone: ${phoneNumber}\nAmount: $${amount}`,
            [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Mobile Prepaid</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
                        <Ionicons name="settings-outline" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Operator Selection */}
                <Text style={styles.sectionTitle}>Select Operator</Text>
                <View style={styles.operatorContainer}>
                    {operators.map((op) => (
                        <TouchableOpacity
                            key={op.id}
                            style={[
                                styles.operatorButton,
                                operator === op.id && styles.operatorButtonSelected
                            ]}
                            onPress={() => setOperator(op.id)}
                        >
                            <Image source={op.logo} style={styles.operatorLogo} />
                            <Text style={styles.operatorName}>{op.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Phone Number Input */}
                <Text style={styles.sectionTitle}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter 8-digit phone number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={8}
                />

                {/* Amount Selection */}
                <Text style={styles.sectionTitle}>Select Amount</Text>
                <View style={styles.amountContainer}>
                    {amounts.map((amt) => (
                        <TouchableOpacity
                            key={amt}
                            style={[
                                styles.amountButton,
                                amount === amt && styles.amountButtonSelected
                            ]}
                            onPress={() => setAmount(amt)}
                        >
                            <Text style={[
                                styles.amountText,
                                amount === amt && styles.amountTextSelected
                            ]}>${amt}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}

                <TouchableOpacity
                    style={styles.rechargeButton}
                    onPress={handleRecharge}
                >
                    <Text style={styles.rechargeButtonText}>Recharge Now</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
    },
    operatorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    operatorButton: {
        width: '30%',
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    operatorButtonSelected: {
        backgroundColor: '#e3f2fd',
        borderColor: '#2196f3',
        borderWidth: 2,
    },
    operatorLogo: {
        width: 50,
        height: 50,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    operatorName: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        marginBottom: 25,
    },
    amountContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    amountButton: {
        width: '18%',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
    },
    amountButtonSelected: {
        backgroundColor: '#e3f2fd',
        borderColor: '#2196f3',
        borderWidth: 2,
    },
    amountText: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
    },
    sup: {
        fontSize: 10,
    },
    amountTextSelected: {
        color: '#2196f3',
    },
    errorText: {
        color: '#f44336',
        marginBottom: 15,
        fontSize: 14,
    },
    rechargeButton: {
        backgroundColor: '#28a745',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    rechargeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default PrepaidMobileScreen;