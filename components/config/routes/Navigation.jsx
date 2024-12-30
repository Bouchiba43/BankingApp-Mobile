import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstOnBoarding from "../../screens/onboarding/FirstOnboarding";
import SecondOnBoarding from "../../screens/onboarding/SecondOnBoarding";
import ThirdOnBoarding from "../../screens/onboarding/ThirdOnBoarding";
import LoginScreen from "../../screens/authentication/LoginScreen";
import RegistrationScreen from "../../screens/authentication/RegistrationScreen";
import OTPInputScreen from "../../screens/authentication/OTPInputScreen";
import ForgotPasswordScreen from "../../screens/authentication/ForgotPassword/ForgotPasswordScreen";
import ChangePasswordScreen from "../../screens/authentication/ForgotPassword/ChangePasswordScreen";
import OTPChangePasswordScreen from "../../screens/authentication/ForgotPassword/OTPChangePasswordScreen";
import SucessChangeScreen from "../../screens/authentication/ForgotPassword/SuccessChangeScreen";
import {HomeScreen} from "../../screens/HomeScreen";
import {TransferScreen} from "../../screens/TransferScreen";
import {WithdrawScreen} from "../../screens/WithdrawScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import MessageScreen from "../../screens/MessageScreen";
import ProfileScreen from "../../screens/settings/ProfileScreen";
import {AdminScreen} from "../../screens/AdminScreen";
import RechargeScreen from "../../screens/RechargeScreen";
import TransactionScreen from "../../screens/TransactionScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="FirstOnBoarding" component={FirstOnBoarding} />
                <Stack.Screen name="SecondOnBoarding" component={SecondOnBoarding} />
                <Stack.Screen name="ThirdOnBoarding" component={ThirdOnBoarding} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                <Stack.Screen name="OTPInputScreen" component={OTPInputScreen} />
                <Stack.Screen name="OTPChangePasswordScreen" component={OTPChangePasswordScreen} />
                <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
                <Stack.Screen name="SucessChangeScreen" component={SucessChangeScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="TransferScreen" component={TransferScreen} />
                <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />
                <Stack.Screen name="MessageScreen" component={MessageScreen} />
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="AdminScreen" component={AdminScreen} />
                <Stack.Screen name="RechargeScreen" component={RechargeScreen} />
                <Stack.Screen name="TransactionScreen" component={TransactionScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
