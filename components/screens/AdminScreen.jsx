import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AdminScreen({ route, navigation }) {
    const { userDetails } = route.params;
    const [modifiedUsers, setModifiedUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await AsyncStorage.getItem('users');
                if (usersData) {
                    const users = JSON.parse(usersData);
                    setModifiedUsers(users); // Met à jour l'état avec les utilisateurs récupérés
                } else {
                    setModifiedUsers([]);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
                Alert.alert('Erreur', 'Échec du chargement des utilisateurs');
            }
        };

        fetchUsers();
    }, []);

    // Mise à jour des détails de l'utilisateur et sauvegarde immédiatement dans AsyncStorage
    const updateUserDetails = (id, field, value) => {
        const updatedUsers = modifiedUsers.map(user =>
            user.id === id ? { ...user, [field]: value } : user
        );
        setModifiedUsers(updatedUsers); // Met à jour l'état local

        // Sauvegarde des données mises à jour dans AsyncStorage
        AsyncStorage.setItem('users', JSON.stringify(updatedUsers))
            .catch(error => console.error('Erreur lors de la sauvegarde des utilisateurs mis à jour:', error));
    };

    // Suppression d'un utilisateur et sauvegarde des modifications dans AsyncStorage
    const deleteUser = (id) => {
        Alert.alert(
            "Delete user",
            "Do you want to delete the user ?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: () => {
                        const newUsers = modifiedUsers.filter(user => user.id !== id);
                        setModifiedUsers(newUsers);
                        AsyncStorage.setItem('users', JSON.stringify(newUsers)) // Sauvegarde la nouvelle liste d'utilisateurs
                            .catch(error => console.error('Erreur lors de la suppression de l\'utilisateur:', error));
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userList}>
                {modifiedUsers.map(user => (
                    <View key={user.id} style={styles.userCard}> {/* Utilisation de `user.id` comme clé unique */}
                        <Text style={styles.userName}>Nom: {user.name}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom"
                            value={user.name}
                            onChangeText={text => updateUserDetails(user.id, 'name', text)}
                        />

                        <Text style={styles.userBalance}>Phone number: {user.phoneNumber}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Phone number"
                            value={user.phoneNumber}
                            onChangeText={text => updateUserDetails(user.id, 'phoneNumber', text)}
                        />

                        <Text style={styles.userBalance}>Balance: ${user.balance}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Balance"
                            keyboardType="numeric"
                            value={user.balance.toString()}
                            onChangeText={text => updateUserDetails(user.id, 'balance', text)}
                        />

                        <Text style={styles.userBalance}>Status: {user.isAdmin ? "Admin" : "Utilisateur"}</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => updateUserDetails(user.id, 'isAdmin', !user.isAdmin)}
                        >
                            <Text style={{ textAlign: 'center' }}>
                                {user.isAdmin ? 'Remove admin status' : 'Give admin status'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteUser(user.id)}
                        >
                            <Text style={styles.deleteButtonText}>Delete user</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.saveButtonText}>Save changes</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    userList: {
        flex: 1,
    },
    userCard: {
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userBalance: {
        fontSize: 16,
        marginVertical: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 8,
        fontSize: 16,
        marginBottom: 12,
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
