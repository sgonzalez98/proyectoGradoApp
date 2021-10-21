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

function FourthPage() {
  return (
    <View style={styles.container}>
      <Text> Fourth Page</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
}

export default FourthPage;
