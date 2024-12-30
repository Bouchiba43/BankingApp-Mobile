import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ThirdOnBoarding({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../../assets/onBoardingImages/amico3.png')}
            />
            <View style={styles.pagination}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
            </View>
            <Text style={styles.title}>
                Budgeting Made Simple
            </Text>
            <Text style={styles.description}>
                Take control of your finances with our intuitive budgeting tool.
            </Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.getStartedButton}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text style={styles.getStartedButtonText}>Get Started</Text>
                    <Ionicons
                        name="arrow-forward"
                        size={24}
                        color="white"
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    logo: {
        width: 370, // Adjust based on your image dimensions
        height: 300,
        resizeMode: "contain",
        marginBottom: 40, // Space below the image
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20, // Space below pagination
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#d3d3d3", // Gray color for inactive dots
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: "#32CD32", // Green color for the active dot
    },
    title: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: "bold",
        fontSize: 48,
        color: "#000",
        textAlign: "center",
        marginBottom: 15, // Space below the title
    },
    description: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "gray",
        textAlign: "center",
        marginTop: 40,
        marginBottom: 20, // Space below the description
        lineHeight: 20,
    },
    buttonsContainer: {
        flexDirection: "row", // Align buttons horizontally
        justifyContent: "center", // Center the button
        width: "100%", // Ensure the buttons take the full width
        paddingHorizontal: 20, // Add padding for spacing
        marginTop: 40, // Space above buttons
    },
    getStartedButton: {
        backgroundColor: "#32CD32", // Green button color
        flexDirection: "row", // Align text and icon horizontally
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        elevation: 3, // Add shadow on Android
        shadowColor: "#000", // Add shadow on iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    getStartedButtonText: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        color: "white",
        marginRight: 10, // Space between text and icon
    },
    arrowIcon: {
        transform: [{ rotate: '-45deg' }], // Rotate the arrow 45 degrees
    },
});
