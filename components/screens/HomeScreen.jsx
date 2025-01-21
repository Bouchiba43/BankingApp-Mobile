import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function HomeScreen({ route, navigation }) {
  const [userDetails, setUserDetails] = useState(route.params.userDetails);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const usersData = await AsyncStorage.getItem("users");
        if (usersData) {
          const users = JSON.parse(usersData);
          const user = users.find((u) => u.id === userDetails.id);
          setTransactions(
            (user.transactions || []).sort((a, b) => new Date(b.date) - new Date(a.date))
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
  }, [transactions]);

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
              style={styles.transactionIcon}
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

  const handleTransactionNavigation = () => {
    navigation.navigate("TransactionScreen", { userDetails });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const usersData = await AsyncStorage.getItem("users");
      if (usersData) {
        const users = JSON.parse(usersData);
        const updatedUser = users.find((user) => user.id === userDetails.id);
        setUserDetails(updatedUser);
      }
    };

    fetchUserDetails();
  }, [route.params.userDetails]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>{userDetails.name}</Text>
          </View>
          <Image
            style={styles.icon}
            source={require("../../assets/homeScreenImages/Bell.png")}
          />
        </View>
        <View>
          <View>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Total balance</Text>
              <Image
                style={styles.icon}
                source={require("../../assets/homeScreenImages/eye.png")}
              />
            </View>
            <Text style={styles.balanceAmount}>
              ${userDetails.balance || "0.00"}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.transferButton}
                onPress={() =>
                  navigation.navigate("TransferScreen", {
                    userDetails,
                    setUserDetails,
                  })
                }
              >
                <Text style={styles.buttonText}>Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.receiveButton}
                onPress={() =>
                  navigation.navigate("RechargeScreen", {
                    userDetails,
                    setUserDetails,
                  })
                }
              >
                <Text style={styles.buttonText}>Recharge</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Button grid */}
          <View style={styles.buttonGrid}>
            {[
              // {
              //   title: "Account and Card",
              //   icon: "card",
              //   screen: "AccountScreen",
              // },
              {
                title: "Credit card",
                icon: "card-outline",
                screen: "CardScreen",
              },
              {
                title: "Withdraw",
                icon: "arrow-down-circle",
                screen: "WithdrawScreen",
              },
              {
                title: "Transactions",
                icon: "file-tray-full",
                screen: "TransactionScreen",
              },
              {
                title: "Mobile prepaid",
                icon: "phone-portrait",
                screen: "PrepaidMobileScreen",
              },
              {
                title: "Beneficiary",
                icon: "people",
                screen: "BeneficiaryScreen",
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() =>
                  navigation.navigate(item.screen, {
                    userDetails,
                    setUserDetails,
                  })
                }
              >
                <Ionicons name={item.icon} size={30} color="#28a745" />
                <Text style={styles.buttonText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
            {/* Bouton Admin */}
            {userDetails.isAdmin && (
              <TouchableOpacity
                style={[styles.button, styles.adminButton]}
                onPress={() =>
                  navigation.navigate("AdminScreen", { userDetails })
                }
              >
                <Ionicons name="settings" size={30} color="#FF6347" />
                <Text style={styles.buttonText}>Admin</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Transaction history */}
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.transactionTitle}>Transaction history</Text>
            <Text onPress={handleTransactionNavigation} style={styles.seeAll}>See all</Text>
          </View>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTransaction}
            ListEmptyComponent={
              <Text style={styles.noTransactions}>No transactions found.</Text>
            }
          />
        </View>
      </View>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <Ionicons name="search" size={24} color="white" />
          <Text style={styles.navButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("MessageScreen")}
        >
          <Ionicons name="mail" size={24} color="white" />
          <Text style={styles.navButtonText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("SettingsScreen", { userDetails, setUserDetails })}
        >
          <Ionicons name="settings-outline" size={24} color="white" />
          <Text style={styles.navButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  transactionIcon: {
    width: 25,
    height: 25,
    marginBottom: 10,
    marginRight: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    padding: 14,
    backgroundColor: "#fff",
    flex: 1,
  },
  balanceContainer: {
    marginBottom: 8,
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 50,
    width: 150,
    justifyContent: "center",
  },
  balanceLabel: {
    fontSize: 16,
    color: "#666",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  transferButton: {
    flex: 1,
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  receiveButton: {
    flex: 1,
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  greeting: {
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 10,
  },
  userName: {
    fontWeight: 400,
    fontSize: 20,
    marginBottom: 10,
    color: "gray",
  },
  headerContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 24, // Adjust based on your image dimensions
    height: 24,
    resizeMode: "contain",
    color: "black",
  },
  seeAll: {
    color: "#2ecc71",
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 10,
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
  transactionDate: {
    fontSize: 14,
    color: "#555",
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    paddingTop: 30,
  },
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  adminButton: {
    backgroundColor: "#FFE4E1",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#28a745",
  },
  navButton: {
    alignItems: "center",
    padding: 8,
    borderRadius: 5,
  },
  navButtonText: {
    color: "#ffffff",
    fontSize: 12,
    marginTop: 4,
  },
});

export default HomeScreen;
