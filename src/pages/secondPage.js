import React from 'react';
import {
  Button, StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
});

function SecondPage() {
  return (
    <View style={styles.container}>
      <Text> Second Page</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
}

export default SecondPage;
