import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export function BeneficiaryScreen({ route, navigation }) {
    const { userDetails } = route.params;
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const usersData = await AsyncStorage.getItem("users");
                if (usersData) {
                    const users = JSON.parse(usersData);
                    const currentUser = users.find((u) => u.id === userDetails.id);

                    if (currentUser && currentUser.transactions) {
                        const beneficiaryTransactions = currentUser.transactions
                            .filter((t) => t.type === "Transfer");

                        const beneficiaryMap = new Map();

                        beneficiaryTransactions.forEach((transaction) => {
                            if (!beneficiaryMap.has(transaction.recipient)) {
                                beneficiaryMap.set(transaction.recipient, {
                                    recipient: transaction.recipient,
                                    recipientId: transaction.recipientId,
                                    lastTransaction: transaction.date,
                                    lastAmount: transaction.amount,
                                    transactions: 1
                                });
                            } else {
                                const existing = beneficiaryMap.get(transaction.recipient);
                                const newDate = new Date(transaction.date);
                                const existingDate = new Date(existing.lastTransaction);

                                if (newDate > existingDate) {
                                    existing.lastTransaction = transaction.date;
                                    existing.lastAmount = transaction.amount;
                                }
                                existing.transactions += 1;
                            }
                        });

                        const beneficiaryList = Array.from(beneficiaryMap.values());
                        setBeneficiaries(beneficiaryList);
                        //sort by last transaction date
                        beneficiaryList.sort((a, b) => new Date(b.lastTransaction) - new Date(a.lastTransaction));
                        setFilteredBeneficiaries(beneficiaryList);
                    }
                }
            } catch (error) {
                console.error("Error fetching beneficiaries:", error);
            }
        };

        fetchBeneficiaries();
    }, [userDetails.id]);

    useEffect(() => {
        const filtered = beneficiaries.filter(beneficiary =>
            beneficiary.recipient.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBeneficiaries(filtered);
    }, [searchQuery, beneficiaries]);

    const renderBeneficiary = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.beneficiaryItem}
                onPress={() => navigation.navigate("TransferScreen", {
                    userDetails,
                    recipientId: item.recipientId,
                    recipientName: item.recipient
                })}
            >
                <View style={styles.cardHeader}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            style={styles.icon}
                            source={require("../../assets/send.png")}
                        />
                        <View>
                            <Text style={styles.beneficiaryName}>{item.recipient}</Text>
                            <Text style={styles.transactionCount}>
                                {item.transactions} transactions
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.lastAmount}>
                        Last: ${item.lastAmount}
                    </Text>
                </View>
                <Text style={styles.lastTransaction}>
                    Last transaction: {new Date(item.lastTransaction).toLocaleString()}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#007BFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Beneficiaries</Text>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search beneficiaries..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#666"
                />
                {searchQuery !== "" && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <Ionicons name="close-circle" size={20} color="#666" />
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={filteredBeneficiaries}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderBeneficiary}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>

                        <Ionicons name="people-outline" size={48} color="#666" />
                        <Text style={styles.noBeneficiaries}>
                            {searchQuery ? "No matching beneficiaries found." : "No beneficiaries found."}
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 16,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        height: "100%",
    },
    beneficiaryItem: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 12,
    },
    beneficiaryName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    transactionCount: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    lastAmount: {
        fontSize: 16,
        color: "#28a745",
        fontWeight: "500",
    },
    lastTransaction: {
        fontSize: 14,
        color: "#666",
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    noBeneficiaries: {
        textAlign: "center",
        fontSize: 16,
        color: "#666",
        marginTop: 20,
    },
});

export default BeneficiaryScreen;