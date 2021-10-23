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

function FifthPage() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Configuración</Text>
      <View style={styles.card}>
        <Text>Configuración Basica</Text>
        <View style={styles.cardItem}>
          <Icon name="cog" style={{ fontSize: 30 }} />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Configuracion 1</Text>
        </View>
        <View style={styles.cardItem}>
          <Icon name="cog" style={{ fontSize: 30 }} />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Configuracion 2</Text>
        </View>
        <View style={styles.cardItem}>
          <Icon name="cog" style={{ fontSize: 30 }} />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Configuracion 3</Text>
        </View>
        <View style={styles.cardItem}>
          <Icon name="cog" style={{ fontSize: 30 }} />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Configuracion 4</Text>
        </View>
        <View style={styles.cardItem}>
          <Icon name="cog" style={{ fontSize: 30 }} />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Configuracion 5</Text>
        </View>

      </View>
    </View>
  );
}

export default FifthPage;
