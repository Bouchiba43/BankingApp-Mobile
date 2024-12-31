import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function HomeScreen({ route, navigation }) {
  const [userDetails, setUserDetails] = useState(route.params.userDetails);

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
      </View>
      {/* Card section */}
      {/* <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{userDetails.name}</Text>
            <Text style={styles.cardSubtitle}>Amazon Platinum</Text>
            <View style={styles.cardDetails}>
              <Text style={styles.cardNumber}>
                **** **** **** {userDetails.phoneNumber.slice(-4)}
              </Text>
              <Text style={styles.cardBalance}>
                ${userDetails.balance || "0.00"}
              </Text>
              <Text style={styles.cardType}>{userDetails.cardType}</Text>
            </View>
          </View>
        </View> */}

      {/* Button grid */}
      <View style={styles.buttonGrid}>
        {[
          {
            title: "Account and Card",
            icon: "card",
            screen: "AccountScreen",
          },
          { title: "Transfer", icon: "arrow-redo", screen: "TransferScreen" },
          {
            title: "Withdraw",
            icon: "arrow-down-circle",
            screen: "WithdrawScreen",
          },
          {
            title: "Mobile prepaid",
            icon: "phone-portrait",
            screen: "PrepaidScreen",
          },
          { title: "Recharge", icon: "wallet", screen: "RechargeScreen" },
          { title: "Save online", icon: "save", screen: "SaveOnlineScreen" },
          {
            title: "Credit card",
            icon: "card-outline",
            screen: "CreditCardScreen",
          },
          {
            title: "Transactions",
            icon: "file-tray-full",
            screen: "TransactionScreen",
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
            <Ionicons name={item.icon} size={30} color="#007BFF" />
            <Text style={styles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bouton Admin */}
      {/* {userDetails.isAdmin && (
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
      </View> */}

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
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          <Ionicons name="settings-outline" size={24} color="white" />
          <Text style={styles.navButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 8,
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
  // container: {
  //   flex: 1,
  //   backgroundColor: "#f9f9f9",
  //   flexDirection: "column",
  // },
  // icon: {
  //   width: 24, // Adjust based on your image dimensions
  //   height: 24,
  //   resizeMode: "contain",
  //   color: "black",
  //   marginBottom: 40, // Space below the image
  // },
  // mainContent: {
  //   flex: 1,
  //   paddingBottom: 60, // Adjust the bottom padding to avoid overlap with the nav
  // },
  // cardContainer: {
  //   padding: 16,
  //   marginBottom: 20,
  // },
  // card: {
  //   backgroundColor: "#007BFF",
  //   borderRadius: 10,
  //   padding: 16,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
  // cardTitle: {
  //   color: "#ffffff",
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // cardSubtitle: {
  //   color: "#bbdefb",
  //   fontSize: 16,
  //   marginBottom: 10,
  // },
  // cardDetails: {
  //   marginTop: 10,
  // },
  // cardNumber: {
  //   color: "#ffffff",
  //   fontSize: 16,
  //   marginBottom: 5,
  // },
  // cardBalance: {
  //   color: "#ffffff",
  //   fontSize: 22,
  //   fontWeight: "bold",
  //   marginBottom: 5,
  // },
  // cardType: {
  //   alignContent: "flex-end",
  //   color: "#ffffff",
  //   fontSize: 16,
  // },
  // buttonGrid: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "space-between",
  //   padding: 16,
  // },
  // button: {
  //   backgroundColor: "#ffffff",
  //   borderRadius: 10,
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   marginBottom: 10,
  //   width: "30%",
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 1.41,
  //   elevation: 2,
  // },
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
    backgroundColor: "#007BFF",
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
