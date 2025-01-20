// TransactionScreen.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const TransactionScreen = ({ route, navigation }) => {
  const { userDetails } = route.params;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const usersData = await AsyncStorage.getItem("users");
        if (usersData) {
          const users = JSON.parse(usersData);
          const user = users.find((u) => u.id === userDetails.id);
          setTransactions(
            (user.transactions || []).sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des transactions:",
          error
        );
      }
    };

    fetchTransactions();
  }, []);

  const renderTransaction = ({ item }) => {
    const isPositive = item.type === "Recharge";
    const amountStyle = isPositive
      ? styles.positiveAmount
      : styles.negativeAmount;
    const transfer = item.type === "Transfer";
    const recharge = item.type === "Recharge";

    return (
      <View style={styles.transactionItem}>
        <View
          style={styles.cardHeader}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={styles.icon}
              source={
                transfer
                  ? require("../../assets/send.png")
                  : recharge
                  ? require("../../assets/receive.png")
                  : require("../../assets/withdraw.png")
              }
            />
            <Text style={styles.transactionType}>
              {item.type}
              {item.type === "Transfer" && item.recipient
                ? ` to ${item.recipient}`
                : ""}
            </Text>
          </View>
          <Text style={[styles.transactionAmount, amountStyle]}>
            {isPositive ? `+${item.amount}` : `-${item.amount}`} $
          </Text>
        </View>
        <Text style={styles.transactionDate}>
          {new Date(item.date).toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Transactions</Text>
      </View>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
        ListEmptyComponent={
          <Text style={styles.noTransactions}>Aucune transaction trouvée.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    color: "#007BFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  transactionItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionType: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  transactionAmount: {
    fontSize: 16,
    marginBottom: 5,
  },
  positiveAmount: {
    color: "green",
  },
  negativeAmount: {
    color: "red",
  },
  transactionDate: {
    fontSize: 14,
    color: "#555",
  },
  noTransactions: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 50,
  },
});

export default TransactionScreen;
