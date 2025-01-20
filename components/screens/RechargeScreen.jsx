import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const RechargeScreen = ({ route, navigation }) => {
    const { userDetails, setUserDetails } = route.params; // User details passed via navigation
    const [rechargeAmount, setRechargeAmount] = useState(''); // State for the recharge amount

    const handleRecharge = async () => {
        const amountToAdd = parseFloat(rechargeAmount);
        if (isNaN(amountToAdd) || amountToAdd <= 0) {
            Alert.alert('Erreur', 'Veuillez entrer un montant valide.');
            return;
        }

        try {
            const usersData = await AsyncStorage.getItem('users');
            if (usersData) {
                const users = JSON.parse(usersData);

                const updatedUsers = users.map(user => {
                    if (user.id === userDetails.id) {
                        user.balance = (parseFloat(user.balance) || 0) + amountToAdd;
                        if (!user.transactions) user.transactions = [];
                        user.transactions.push({
                            id: Date.now(),
                            type: 'Recharge',
                            amount: amountToAdd,
                            date: new Date().toISOString(),
                        });
                    }
                    return user;
                });

                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

                const updatedUser = updatedUsers.find(user => user.id === userDetails.id);
                setUserDetails(updatedUser);

                Alert.alert('Succès', `Votre balance a été rechargée de ${amountToAdd.toFixed(2)} $.`, [
                    {
                        text: 'OK',
                        onPress: () =>
                            navigation.navigate('HomeScreen', { userDetails: updatedUser }),
                    },
                ]);
            } else {
                Alert.alert('Erreur', 'Aucun utilisateur trouvé.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour des utilisateurs:', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour de la balance.');
        }

        setRechargeAmount('');
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Recharge Balance</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
                    <Ionicons name="settings-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.title}>Recharge Balance</Text>

                <Text style={styles.balanceText}>Balance actuelle : {userDetails.balance} $</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Entrez le montant à recharger"
                    keyboardType="numeric"
                    value={rechargeAmount}
                    onChangeText={setRechargeAmount}
                />

                <Button title="Recharger" onPress={handleRecharge} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        color: '#28a745',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    balanceText: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
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
});

export default RechargeScreen;
