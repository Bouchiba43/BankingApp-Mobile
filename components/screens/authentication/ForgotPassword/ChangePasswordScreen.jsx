import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform, SafeAreaView,
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import SucessChangeScreen from "./SuccessChangeScreen";

const ChangePasswordScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(false);


    const handleSend = () => {
        if (isValid) {
            console.log(`Code envoyé à ${phoneNumber}`);
            // Implémentez ici l'envoi du code de vérification
        }
    };

    return (
        <SafeAreaView style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#007BFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Change password</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.body}>
                    <Text style={styles.label}>Type your password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#ccc"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        placeholderTextColor="#ccc"
                    />

                    <TouchableOpacity
                        style={styles.button}
                        /*disabled={!isValid}*/
                        onPress={() => navigation.navigate('SucessChangeScreen')}
                    >
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    backText: {
        color: '#000000',
        fontSize: 20,
        marginRight: 10,
    },
    headerText: {
        color: '#007BFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    box: {
        margin: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 50, // 50px shadow
        elevation: 10, // For Android shadow
    },
    body: {
        padding: 20,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#6A6A6A',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#000000',
        marginBottom: 15,
    },
    subText: {
        fontSize: 14,
        color: '#6A6A6A',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        height: 50,
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#E0E0E0',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChangePasswordScreen;
