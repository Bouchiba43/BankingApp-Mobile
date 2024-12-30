import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function SecondOnBoarding({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../../assets/onBoardingImages/amico2.png')}
            />
            <Text style={styles.title}>
                Smart Investing Opportunities
            </Text>
            <Text style={styles.description}>
                Explore a world of investment possibilities with our smart investing feature
            </Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => navigation.navigate('ThirdOnBoarding')}
                >
                    <Text style={styles.skipButtonText}>skip</Text>
                </TouchableOpacity>
                <View style={styles.pagination}>
                    <View style={styles.dot} />
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                </View>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('ThirdOnBoarding')}
                >
                    <View style={styles.arrowContainer}>
                        <Ionicons name="arrow-forward" size={24} color="white" />
                    </View>
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
        justifyContent: "space-between", // Space out the buttons
        width: "100%", // Ensure the buttons take the full width
        paddingHorizontal: 20, // Add padding for spacing
        marginTop: 40, // Space above buttons
    },
    skipButton: {
        flex: 1, // Take equal space for each button
        alignItems: "center",
    },
    skipButtonText: {
        color: "gray", // Gray text for the skip button
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
    },
    nextButton: {
        flex: 1, // Take equal space for each button
        alignItems: "center",
        justifyContent: "center",
    },
    arrowContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        backgroundColor: "#32CD32", // Green container
        borderRadius: 30, // Make it circular
        shadowColor: "#000", // Shadow effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // For Android shadow
    },
});

