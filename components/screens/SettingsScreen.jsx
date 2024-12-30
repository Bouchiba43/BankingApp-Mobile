import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ route,navigation }) => {
    const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false);
    const { userDetails, setUserDetails } = route.params || {};


    const toggleNotifications = () => {
        setIsNotificationsEnabled((prevState) => !prevState);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#007BFF" />
            </TouchableOpacity>
            <View style={styles.header}>

                <Text style={styles.headerText}>Settings</Text>
            </View>

            <View style={styles.settingItem}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userDetails, setUserDetails })}>

                <View style={styles.settingRow}>
                        <Ionicons name="person-circle-outline" size={24} color="#007BFF" />
                        <Text style={styles.settingText}>Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
                <TouchableOpacity onPress={() => console.log('Change Language')}>
                    <View style={styles.settingRow}>
                        <Ionicons name="language-outline" size={24} color="#007BFF" />
                        <Text style={styles.settingText}>Language</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
                <TouchableOpacity>
                    <View style={styles.settingRow}>
                        <Ionicons name="notifications-outline" size={24} color="#007BFF" />
                        <Text style={styles.settingText}>Notifications</Text>
                    </View>
                    <Switch
                        value={isNotificationsEnabled}
                        onValueChange={toggleNotifications}
                        trackColor={{ false: '#ccc', true: '#007BFF' }}
                        thumbColor={isNotificationsEnabled ? '#007BFF' : '#f4f3f4'}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
                <TouchableOpacity onPress={() => console.log('Terms and Conditions')}>
                    <View style={styles.settingRow}>
                        <Ionicons name="document-text-outline" size={24} color="#007BFF" />
                        <Text style={styles.settingText}>Terms and Conditions</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
                <TouchableOpacity onPress={() => console.log('Privacy Policy')}>
                    <View style={styles.settingRow}>
                        <Ionicons name="lock-closed-outline" size={24} color="#007BFF" />
                        <Text style={styles.settingText}>Privacy Policy</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <View style={styles.settingRow}>
                        <Ionicons name="exit-outline" size={24} color="#FF3B30" />
                        <Text style={[styles.settingText, styles.logoutText]}>Log Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    settingItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    logoutText: {
        color: '#FF3B30',
    },
});

export default SettingsScreen;
