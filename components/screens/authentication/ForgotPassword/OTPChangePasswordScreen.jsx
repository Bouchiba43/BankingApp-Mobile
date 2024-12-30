import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const OTPChangePasswordScreen = ({ navigation }) => {
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleInputChange = (text, index) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = text;

        // Pass focus to the next field automatically
        if (text && index < otp.length - 1) {
            const nextInput = inputs[index + 1];
            nextInput && nextInput.focus();
        }

        setOtp(updatedOtp);
    };

    const inputs = [];

    const handleConfirm = () => {
        if (otp.join('').length === 4) {
            alert(`OTP Confirmed: ${otp.join('')}`);
        } else {
            alert('Please enter a valid 4-digit OTP.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Go Back Icon */}
            <View >
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#007BFF" />
                </TouchableOpacity>

            </View>


            {/* Screen Content */}
            <View style={styles.content}>
                <Text style={styles.header}>Enter OTP</Text>
                <View style={styles.otpContainer}>
                    {otp.map((value, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={value}
                            onChangeText={(text) => handleInputChange(text, index)}
                            ref={(input) => (inputs[index] = input)}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('ChangePasswordScreen')}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    backButton: {
        position: 'absolute',
        top: 50, // Adjust based on your design
        left: 20,
        zIndex: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        width: '80%',
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    confirmButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OTPChangePasswordScreen;
