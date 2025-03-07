import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const RoomsListScreen = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('https://chat-api-k4vi.onrender.com/chat/rooms');
      if (response.data && Array.isArray(response.data)) {
        // Sort rooms by `created_at` in descending order (newest first)
        const sortedRooms = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setRooms(sortedRooms); // Set the sorted rooms
      } else {
        console.error('Invalid API response:', response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateRoom = () => {
    navigation.navigate('CreateRoom');
  };

  const handleJoinRoom = (roomId) => {
    navigation.navigate('Chat', { roomId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.roomItem}>
            <Text style={{color:'black'}}>{item.name}</Text>
            <Button title="Join" onPress={() => handleJoinRoom(item.id)} />
          </View>
        )}
      />
      <Button title="Create Room" onPress={handleCreateRoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'white'
  },
  roomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default RoomsListScreen;