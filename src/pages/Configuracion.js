import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  topcard: {
    height: 100,
    backgroundColor: '#0A99FF',
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  absotuleCard: {
    backgroundColor: '#0A99FF',
    top: 100,
    height: 50,
  },
  title: {
    color: 'white',
    fontSize: 26,
    marginLeft: 10,
  },
  titleIcon: {
    color: 'white',
    fontSize: 30,
    marginLeft: 20,
  },
  cards: {
    height: '100%',
    borderTopLeftRadius: 40,
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 15,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 10,
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

function Configuracion() {
  return (
    <View style={styles.container}>
      <View style={styles.topcard}>
        <Icon name="cog" style={styles.titleIcon} />
        <Text style={styles.title}>Configuraciones</Text>
      </View>
      <View style={{ ...StyleSheet.absoluteFillObject, ...styles.absotuleCard }} />
      <View style={styles.cards}>
        <View style={styles.card}>
          <Text>Configuraciónes del usuario</Text>
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
    </View>
  );
}

export default Configuracion;
