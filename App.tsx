import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SetUsernameScreen from './src/screens/SetUsernameScreen';
import RoomsListScreen from './src/screens/RoomsListScreen';
import CreateRoomScreen from './src/screens/CreateRoomScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
      initialRouteName="SetUsername">
        <Stack.Screen name="SetUsername" component={SetUsernameScreen} />
        <Stack.Screen name="RoomsList" component={RoomsListScreen} />
        <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;