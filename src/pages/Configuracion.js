import { Content, TopCard } from 'components';
import React from 'react';
import {
  ScrollView,
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#748c94',
    padding: 8,
    margin: 8,
    borderRadius: 10,
  },
});

function Configuracion() {
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <TopCard title="Configuraciones" iconName="cog" />
      <Content>
        <View style={{ width: '100%' }}>
          <TouchableOpacity style={styles.cardItem}>
            <Icon name="cog" style={{ fontSize: 40 }} />
            <Text style={{ fontSize: 16, marginLeft: 20 }}>Configuracion de Usuario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem}>
            <Icon name="cog" style={{ fontSize: 40 }} />
            <Text style={{ fontSize: 16, marginLeft: 20 }}>Configuracion re Responsable</Text>
          </TouchableOpacity>
        </View>
      </Content>
    </ScrollView>
  );
}

export default Configuracion;
