import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function CardScreen({ route, navigation }) {
    const [userDetails] = useState(route.params.userDetails);
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [showCardNumber, setShowCardNumber] = useState(false);
    const [showCVV, setShowCVV] = useState(false);

    const generateCardNumber = () => {
        const lastFour = userDetails.phoneNumber.slice(-4);
        return `4532 8721 9012 ${lastFour}`;
    };

    const handleCardFlip = () => {
        setIsCardFlipped(!isCardFlipped);
        setShowCardNumber(false);
        setShowCVV(false);
    };

    const CardActions = () => (
        <View style={styles.cardActions}>
            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate("TransferScreen", { userDetails })}
            >
                <Ionicons name="send" size={24} color="#28a745" />
                <Text style={styles.actionButtonText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate("RechargeScreen", { userDetails })}
            >
                <Ionicons name="add-circle" size={24} color="#28a745" />
                <Text style={styles.actionButtonText}>Top Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate("WithdrawScreen", { userDetails })}
            >
                <Ionicons name="cash" size={24} color="#28a745" />
                <Text style={styles.actionButtonText}>Withdraw</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.actionButton}
                onPress={handleCardFlip}
            >
                <Ionicons name="flip" size={24} color="#28a745" />
                <Text style={styles.actionButtonText}>Flip Card</Text>
            </TouchableOpacity>
        </View>
    );

    const SecureInfoButtons = () => (
        <View style={styles.secureInfoContainer}>
            {!isCardFlipped ? (
                <TouchableOpacity
                    style={styles.secureButton}
                    onPress={() => setShowCardNumber(!showCardNumber)}
                >
                    <Ionicons
                        name={showCardNumber ? "eye-off" : "eye"}
                        size={20}
                        color="#28a745"
                    />
                    <Text style={styles.secureButtonText}>
                        {showCardNumber ? "Hide Number" : "Show Number"}
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.secureButton}
                    onPress={() => setShowCVV(!showCVV)}
                >
                    <Ionicons
                        name={showCVV ? "eye-off" : "eye"}
                        size={20}
                        color="#28a745"
                    />
                    <Text style={styles.secureButtonText}>
                        {showCVV ? "Hide CVV" : "Show CVV"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Card Details</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
                    <Ionicons name="settings-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={handleCardFlip}>
                    <View style={[styles.card, isCardFlipped && styles.cardFlipped]}>
                        {!isCardFlipped ? (
                            <>
                                <Text style={styles.cardTitle}>{userDetails.name}</Text>
                                <Text style={styles.cardSubtitle}>FreeCash Platinum</Text>
                                <View style={styles.cardDetails}>
                                    <Text style={styles.cardNumber}>
                                        {showCardNumber
                                            ? generateCardNumber()
                                            : "**** **** **** " + userDetails.phoneNumber.slice(-4)}
                                    </Text>
                                    <Text style={styles.cardBalance}>
                                        ${userDetails.balance || "0.00"}
                                    </Text>
                                    <Text style={styles.cardType} numberOfLines={1}>
                                        {userDetails.cardType}
                                    </Text>
                                </View>
                            </>
                        ) : (
                            <View style={styles.cardBack}>
                                <Text style={styles.cardCvv}>CVV: {showCVV ? "247" : "***"}</Text>
                                <Text style={styles.cardExpiry}>Valid Thru: 12/25</Text>
                                <Text style={styles.cardInfo}>
                                    This card is the property of FreeCash Bank
                                </Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>

            <SecureInfoButtons />
            <CardActions />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    cardContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#28a745",
        borderRadius: 20,
        padding: 24,
        width: Dimensions.get("window").width - 48,
        height: 200,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    cardFlipped: {
        backgroundColor: "#218838",
    },
    cardBack: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardTitle: {
        color: "#ffffff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    cardSubtitle: {
        color: "#d4edda",
        fontSize: 18,
        marginBottom: 16,
    },
    cardDetails: {
        marginTop: 10,
    },
    cardNumber: {
        color: "#ffffff",
        fontSize: 18,
        marginBottom: 8,
    },
    cardBalance: {
        color: "#ffffff",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
    },
    cardType: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
    },
    cardCvv: {
        color: "#ffffff",
        fontSize: 18,
        marginBottom: 12,
    },
    cardExpiry: {
        color: "#ffffff",
        fontSize: 18,
        marginBottom: 12,
    },
    cardInfo: {
        color: "#d4edda",
        fontSize: 14,
    },
    cardActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    actionButton: {
        alignItems: "center",
        padding: 12,
    },
    actionButtonText: {
        marginTop: 8,
        color: "#28a745",
        fontSize: 14,
    },
    secureInfoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    secureButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e9f7ef",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#28a745",
    },
    secureButtonText: {
        color: "#28a745",
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "500",
    },
});

export default CardScreen;
