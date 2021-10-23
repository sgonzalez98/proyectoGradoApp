import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#8fcbbc',
  },
  card: {
    width: '95%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 15,
    shadowColor: '#7F5DF0',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#748c94',
    padding: 5,
  },
});

function SecondPage() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Registros</Text>
      <View style={styles.card}>
        <Text>Registros</Text>
        <View style={styles.cardItem}>
          <Icon name="check-circle" style={{ fontSize: 24, color: 'green' }} />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Acetaminofen 1</Text>
          <Text style={{ fontSize: 16, marginLeft: 20 }}>2021-10-10 8:00 PM</Text>
        </View>
        <View style={styles.cardItem}>
          <Icon name="check-circle" style={{ fontSize: 24, color: 'green' }} />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Amoxixilina 2</Text>
          <Text style={{ fontSize: 16, marginLeft: 20 }}>2021-10-11 2:00 PM</Text>
        </View>
        <View style={styles.cardItem}>
          <Icon name="times-circle" style={{ fontSize: 24, color: 'red' }} />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Naproxeno 1</Text>
          <Text style={{ fontSize: 16, marginLeft: 20 }}>2021-10-10 8:00 PM</Text>
        </View>
      </View>
    </View>
  );
}

export default SecondPage;
