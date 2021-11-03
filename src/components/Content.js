import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  absotuleCard: {
    backgroundColor: '#0A99FF',
    top: 100,
    height: 50,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 40,
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 15,
    alignItems: 'flex-end',
  },
});

export default function Content({ children }) {
  return (
    <>
      <View style={{ ...StyleSheet.absoluteFillObject, ...styles.absotuleCard }} />
      <View style={styles.content}>
        {children}
      </View>
    </>
  );
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
};
