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
});

function FifthPage() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Configuración</Text>
      <View style={{ width: '100%', marginTop: 20, padding: 10 }}>
        <Text>Configuración Basica</Text>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
          <Icon name="cog" style={{ fontSize: 20 }} />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Configuracion 1</Text>
        </View>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
          <Icon name="cog" style={{ fontSize: 20 }} />
          <Text style={{ fontSize: 16, marginLeft: 20 }}>Configuracion 1</Text>
        </View>
      </View>
    </View>
  );
}

export default FifthPage;
