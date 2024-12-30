
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNav = ({ navigation }) => {
    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomeScreen')}>
                <Ionicons name="home" size={24} color="white" />
                <Text style={styles.navButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('SearchScreen')}>
                <Ionicons name="search" size={24} color="white" />
                <Text style={styles.navButtonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MessagesScreen')}>
                <Ionicons name="mail" size={24} color="white" />
                <Text style={styles.navButtonText}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('SettingsScreen')}>
                <Ionicons name="settings-outline" size={24} color="white" />
                <Text style={styles.navButtonText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#007BFF',
    },
    navButton: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 5,
    },
    navButtonText: {
        color: '#ffffff',
        fontSize: 12,
        marginTop: 4,
    },
});

export default BottomNav;
