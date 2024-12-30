import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {HomeScreen} from "../../HomeScreen";

export default function SucessChangeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../../../assets/success.png')}
            />
            <Text style={styles.title}>
                SUCCESS
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('HomeScreen')}
            >
                <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>

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
        width: 300, // Adjust based on your image dimensions
        height: 200,
        resizeMode: "contain",
        marginBottom: 40, // Space below the image
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20, // Space below pagination
    },
    title: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: "bold",
        fontSize: 30,
        color: "#4d8944",
        textAlign: "center",
        marginBottom: 15, // Space below the title
    },
    description: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "gray",
        textAlign: "center",
        marginTop:40,
        marginBottom: 20, // Space below the description
        lineHeight: 20,
    },
    button: {
        backgroundColor: "#007BFF", // Blue color
        borderRadius: 10, // Slightly rounded corners
        paddingVertical: 15,
        paddingHorizontal: 170,
        marginTop: 100,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000", // Shadow effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // For Android shadow
    },
    buttonText: {
        color: "#fff", // White text
        fontFamily: "Poppins-SemiBold",
        fontSize: 16,
    },
});
