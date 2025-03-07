import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ChatScreen = ({ route }) => {
    const { roomId } = route.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('');

    const webSocket = useRef(null);
    const flatListRef = useRef(null);

    useEffect(() => {
        fetchUsername();
        fetchMessages();


        return () => {
            if (webSocket.current) {
                webSocket.current.close();
            }
        };
    }, []);

    const fetchUsername = async () => {
        const storedUsername = await AsyncStorage.getItem('username');
        setUsername(storedUsername);
        setupWebSocket(storedUsername);
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`https://chat-api-k4vi.onrender.com/chat/rooms/${roomId}/messages`);
            console.log('response123', response.data)
            setMessages(response.data.reverse());
        } catch (error) {
            console.error(error);
        }
    };

    const setupWebSocket = (username) => {
        const wsUrl = `ws://chat-api-k4vi.onrender.com/ws/${roomId}/${username}`;
        webSocket.current = new WebSocket(wsUrl);

        webSocket.current.onopen = () => {
            console.log('WebSocket connection opened');
        };

        webSocket.current.onmessage = (e) => {
            const message = JSON.parse(e.data);
            const msg = message.message
            if (msg) {
                console.log('msg', msg)
                setMessages((prevMessages) => [...prevMessages, msg]);
            }
        };

        webSocket.current.onerror = (e) => {
            console.error('WebSocket error:', e);
        };

        webSocket.current.onclose = () => {
            console.log('WebSocket connection closed');
        };
    };


    const handleSendMessage = () => {
        if (newMessage.trim() && webSocket.current) {
            const messagePayload = {
                event: 'message',
                content: newMessage,
            };
            webSocket.current.send(JSON.stringify(messagePayload));
            setNewMessage('');
            scrollToBottom();
        }
    };

    const scrollToBottom = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true }); // Scroll to the end of the list
        }
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                ref={flatListRef}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[item?.username == username && { alignSelf: 'flex-end' }]}>
                        <Text style={[{ color: 'black',fontSize:10 }, item?.username == username && { textAlign: 'right' }]}>{item?.username == username ? 'You' : item?.username}</Text>
                        <View style={[styles.messageItem, ]}>
                            <Text style={[{ color: 'black' }, item?.username == username && { textAlign: 'right' }]}>{item?.content}</Text>
                        </View>
                    </View>
                )}
                onContentSizeChange={() => scrollToBottom()}
                onLayout={() => scrollToBottom()}
            />
            <TextInput
                style={styles.input}
                placeholder="Type a message"
                value={newMessage}
                onChangeText={setNewMessage}
                placeholderTextColor={'grey'}
            />
            <Button title="Send" onPress={handleSendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white'
    },
    messageItem: {
        padding: 8,
        marginBottom: 8,
        backgroundColor: '#9ddbfa',
        maxWidth: '80%',
        alignSelf: 'flex-start',
        borderRadius: 8
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: 'black',
        borderRadius: 8
    },
});

export default ChatScreen;