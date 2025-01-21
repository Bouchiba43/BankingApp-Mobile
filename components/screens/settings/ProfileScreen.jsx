import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ProfileScreen({ route, navigation }) {
    // console.log("route params: ", route.params);
    const { userDetails } = route.params;
    // console.log("user: ", userDetails);

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('LoginScreen') },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#007BFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Profile</Text>
            </View>

            <View style={styles.profileContainer}>
                <Text style={styles.title}>User Profile</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{userDetails.name}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Balance:</Text>
                    <Text style={styles.value}>${userDetails.balance.toFixed(2)}</Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    headerText: { color: '#007BFF', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
    profileContainer: {
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
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#555' },
    value: { fontSize: 16, color: '#777' },
    logoutButton: {
        marginTop: 30,
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    logoutButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});

export default ProfileScreen;
