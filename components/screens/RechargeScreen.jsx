// RechargeScreen.jsx
import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons} from "@expo/vector-icons";

const RechargeScreen = ({ route,navigation }) => {
    const { userDetails, setUserDetails } = route.params; // Détails utilisateur transmis via la navigation
    const [rechargeCode, setRechargeCode] = useState(''); // État pour le code de recharge
    const [modifiedUsers, setModifiedUsers] = useState([]);

    const handleRecharge = async () => {
        // Validation : vérifier si le code est bien de 14 chiffres
        if (rechargeCode.length !== 14 || isNaN(rechargeCode)) {
            Alert.alert('Erreur', 'Le code de recharge doit contenir exactement 14 chiffres.');
            return;
        }

        // Extraire les 4 derniers chiffres
        const amountToAdd = parseInt(rechargeCode.slice(-4), 10);

        try {
            // Récupérer les utilisateurs depuis AsyncStorage
            const usersData = await AsyncStorage.getItem('users');
            if (usersData) {
                const users = JSON.parse(usersData);

                // Trouver l'utilisateur actuel
                const updatedUsers = users.map(user => {
                    if (user.id === userDetails.id) {
                        user.balance = (parseFloat(user.balance) || 0) + amountToAdd; // Ajouter le montant à la balance
                    }
                    if (!user.transactions) user.transactions = [];
                    user.transactions.push({
                        id: Date.now(), // Identifiant unique pour la transaction
                        type: 'Recharge',
                        amount: amountToAdd,
                        date: new Date().toISOString(),
                    });

                    return user;
                });

                // Mettre à jour AsyncStorage avec les nouvelles données
                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

                // Mettre à jour l'état local
                const updatedUser = updatedUsers.find(user => user.id === userDetails.id);
                setUserDetails(updatedUser);

                Alert.alert('Succès', `Votre balance a été rechargée de ${amountToAdd} $.`);
            } else {
                Alert.alert('Erreur', 'Aucun utilisateur trouvé.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour des utilisateurs:', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour de la balance.');
        }

        // Réinitialiser le champ de saisie
        setRechargeCode('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#007BFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Recharge Balance</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.title}>Recharge Balance</Text>

                <Text style={styles.balanceText}>Balance actuelle : {userDetails.balance} $</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Entrez votre code de recharge"
                    keyboardType="numeric"
                    value={rechargeCode}
                    onChangeText={setRechargeCode}
                    maxLength={14} // Limiter à 14 caractères
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
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    headerText: { color: '#007BFF', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
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
