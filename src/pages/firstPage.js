import React from 'react';
import {
  ScrollView,
  StyleSheet, Text, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#8fcbbc',
  },
  card: {
    width: '90%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 10,
    shadowColor: '#7F5DF0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#748c94',
    padding: 5,
  },
});

const data = [
  { label: '5:00 PM - Acetaminofen', cantidad: 1 },
  { label: '8:00 PM - Dolex Gripa', cantidad: 2 },
  { label: '2:00 PM - Dolex', cantidad: 1 },
  { label: '9:00 AM - Hierba Buena', cantidad: 2 },
  { label: '5:00 PM - Amoxicilina', cantidad: 1 },
  { label: '6:00 AM - Ibuprofeno', cantidad: 1 },
  { label: '5:00 PM - Paracetamol', cantidad: 3 },
  { label: '5:00 PM - Dronabinol', cantidad: 1 },
  { label: '5:00 PM - Ezetimiba', cantidad: 2 },
  { label: '5:00 PM - Flumazenil', cantidad: 1 },
];

function FirstPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((row, i) => (
        <View style={styles.card} key={String(i)}>
          <View style={styles.cardTitle}>
            <Icon name="pills" style={{ fontSize: 24, color: '#748c94' }} />
            <Text style={{ fontSize: 16, marginLeft: 10 }}>{row.label}</Text>
          </View>
          <View>
            <Text>{`Cantidad: ${row.cantidad}`}</Text>
            <Text>Observación: Se debe tomar esta pastilla con agua</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default FirstPage;
