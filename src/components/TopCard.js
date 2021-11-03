import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  topcard: {
    height: 100,
    backgroundColor: '#0A99FF',
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    color: 'white',
    fontSize: 30,
    marginLeft: 20,
  },
  title: {
    color: 'white',
    fontSize: 26,
    marginLeft: 10,
  },
});

export default function TopCard({ iconName, title }) {
  return (
    <View style={styles.topcard}>
      <Icon name={iconName} style={styles.titleIcon} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

TopCard.propTypes = {
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
