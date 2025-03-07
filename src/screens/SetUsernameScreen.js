import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetUsernameScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const handleSetUsername = async () => {
        try {
            const response = await axios.post('https://chat-api-k4vi.onrender.com/chat/username', { username: username });
            console.log('response', response.data)
            await AsyncStorage.setItem('username', username);
            navigation.navigate('RoomsList');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor={'grey'}
            />
            <Button title="Next" onPress={handleSetUsername} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor:'white'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: 'black'
    },
});

export default SetUsernameScreen;