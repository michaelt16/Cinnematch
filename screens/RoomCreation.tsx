import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RoomCreation(): JSX.Element {
  const handleJoinRoom = () => {
    // Handle logic for joining a room
    console.log('Joining a room');
  };

  const handleCreateRoom = () => {
    // Handle logic for creating a room
    console.log('Creating a room');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleJoinRoom}>
        <Text style={styles.buttonText}>Join Room</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateRoom}>
        <Text style={styles.buttonText}>Create Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


