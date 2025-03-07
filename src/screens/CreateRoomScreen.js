import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const CreateRoomScreen = ({ navigation }) => {
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post('https://chat-api-k4vi.onrender.com/chat/rooms', {name: roomName });
      navigation.navigate('Chat', { roomId: response.data.id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter room name"
        value={roomName}
        onChangeText={setRoomName}
        placeholderTextColor={'grey'}
      />
      <Button title="Create Room" onPress={handleCreateRoom} />
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
    color:'black'
  },
});

export default CreateRoomScreen;