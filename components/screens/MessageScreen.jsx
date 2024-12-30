import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const messages = [
    {
        id: '1',
        name: 'John Doe',
        message: 'Hello! How are you?',
        time: '2:30 PM',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '2',
        name: 'Jane Smith',
        message: 'Are we still meeting tomorrow?',
        time: '1:45 PM',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '3',
        name: 'Emily Johnson',
        message: 'Thanks for the update!',
        time: '12:10 PM',
        avatar: 'https://via.placeholder.com/50',
    },
];

const MessageScreen = ({ navigation }) => {
    const renderMessageItem = ({ item }) => (
        <TouchableOpacity
            style={styles.messageItem}
            onPress={() => navigation.navigate('ChatScreen', { userName: item.name })}
        >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.messageContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.message}>{item.message}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#007BFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Messages</Text>
                <TouchableOpacity onPress={() => console.log('Search')}>
                    <Ionicons name="search-outline" size={24} color="#007BFF" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessageItem}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    listContent: {
        padding: 10,
    },
    messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    messageContent: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    message: {
        fontSize: 14,
        color: '#888',
        marginTop: 2,
    },
    time: {
        fontSize: 12,
        color: '#aaa',
    },
});

export default MessageScreen;
