import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

const RegistrationScreen = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleInputChange = (text) => {
        setPhoneNumber(text);
        setIsValid(/^\+?\d{10,15}$/.test(text)); // Validation for international numbers (+XX...)
    };

    const saveUser = async (user) => {
        try {
            const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
            users.push(user);
            await AsyncStorage.setItem('users', JSON.stringify(users));
            Alert.alert('Success', 'User registered successfully');
            navigation.navigate('LoginScreen');
        } catch (e) {
            console.error('Error saving user:', e);
            Alert.alert('Error', 'Failed to register user');
        }
    };

    const handleRegister = () => {
        if (name === '' || phoneNumber === '' || password === '') {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const newUser = {
            id : uuid.v4(),
            name,
            phoneNumber,
            password,
            balance: 0,
            cardType: 'VISA',
            isAdmin: true,
        };

        saveUser(newUser);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#4CAF50" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Sign up</Text>
            </View>

            {/* Welcome Text */}
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTitle}>Welcome to us</Text>
                <Text style={styles.welcomeSubtitle}>Hello there, create a new account</Text>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/onBoardingImages/register.png')}
                    />
                </View>
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChangeText={handleInputChange}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={styles.checkboxContainer}>
                    <BouncyCheckbox
                        size={25}
                        fillColor="#4CAF50"
                        unfillColor="#FFFFFF"
                        text="By creating an account, you agree to our Terms and Conditions"
                        iconStyle={{ borderColor: '#E0E0E0', borderRadius: 5 }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={styles.checkboxText}
                        onPress={(checked) => setIsChecked(checked)}
                    />
                </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
                <Text style={styles.signUpButtonText}>Sign up</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.bottomContainer}>
                <Text style={styles.signUpText}>
                    Have an account?{' '}
                    <Text
                        style={styles.signUpLink}
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        Sign in
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9', // Light green background
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: '#4CAF50', // Green color
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginBottom: 5,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#388E3C', // Darker green
        marginBottom: 5,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: '#388E3C',
    },
    logoContainer: {
        marginVertical: 20,
        borderRadius: 50,
        paddingTop: 20,
        paddingBottom: 2,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        borderColor: '#4CAF50', // Green border
        borderWidth: 1,
        margin: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        paddingTop: 5,
        paddingLeft: 20,
    },
    checkboxText: {
        fontSize: 14,
        color: '#388E3C', // Green color for checkbox text
    },
    signUpButton: {
        backgroundColor: '#4CAF50', // Green background
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,
    },
    signUpButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    signUpText: {
        fontSize: 14,
        color: '#388E3C', // Green for footer text
        marginTop: 20,
    },
    signUpLink: {
        color: '#4CAF50', // Green for link text
        fontWeight: 'bold',
    },
    logo: {
        width: 180,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 40,
    },
});

export default RegistrationScreen;
