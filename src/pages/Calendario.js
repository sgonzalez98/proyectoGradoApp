import { Content, TopCard } from 'components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

function Calendario() {
  return (
    <View style={styles.container}>
      <TopCard title="Historial" iconName="clipboard-list" />
      <Content>
        <Text> Hola Calendario</Text>
      </Content>
    </View>
  );
}

export default Calendario;
