// TransactionScreen.jsx
import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons";

const TransactionScreen = ({ route, navigation }) => {
    const { userDetails } = route.params;
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const usersData = await AsyncStorage.getItem('users');
                if (usersData) {
                    const users = JSON.parse(usersData);
                    const user = users.find(u => u.id === userDetails.id);
                    setTransactions(user.transactions || []);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const renderTransaction = ({ item }) => {
        const isPositive = item.type === 'Recharge';
        const amountStyle = isPositive ? styles.positiveAmount : styles.negativeAmount;

        return (
            <View style={styles.transactionItem}>
                <Text style={styles.transactionType}>{item.type}</Text>
                <Text style={[styles.transactionAmount, amountStyle]}>
                    {isPositive ? `+${item.amount}` : `-${item.amount}`} $
                </Text>
                <Text style={styles.transactionDate}>{new Date(item.date).toLocaleString()}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#007BFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Transactions</Text>
            </View>
            <Text style={styles.title}>Transactions</Text>
            <FlatList
                data={transactions}
                keyExtractor={item => item.id.toString()}
                renderItem={renderTransaction}
                ListEmptyComponent={<Text style={styles.noTransactions}>Aucune transaction trouvée.</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: '#007BFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    transactionItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    transactionType: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    transactionAmount: {
        fontSize: 16,
        marginBottom: 5,
    },
    positiveAmount: {
        color: 'green',
    },
    negativeAmount: {
        color: 'red',
    },
    transactionDate: {
        fontSize: 14,
        color: '#555',
    },
    noTransactions: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 50,
    },
});


export default TransactionScreen;
