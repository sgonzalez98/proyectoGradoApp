import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { StorageService } from 'services';
import { ConfirmModal } from 'components';

const styles = StyleSheet.create({
  topcard: {
    height: 100,
    backgroundColor: '#0A99FF',
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleIcon: {
    color: 'white',
    fontSize: 30,
    marginLeft: 20,
  },
  signOutIcon: {
    color: 'white',
    fontSize: 30,
  },
  title: {
    color: 'white',
    fontSize: 26,
    marginLeft: 10,
  },
});

export default function TopCard({ iconName, title }) {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const logOut = () => {
    StorageService.removeValue('mediKitUsuarioId');
    setShowModal(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.topcard}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name={iconName} style={styles.titleIcon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{ marginRight: 20 }}>
        <Icon name="sign-out-alt" style={styles.signOutIcon} onPress={() => setShowModal(true)} />
        {showModal && (
          <ConfirmModal
            onAccept={logOut}
            onCancel={() => setShowModal(false)}
            labelAccept="Cerrar Sesión"
            labelCancel="Cancelar"
            title="Cerrar Sesión"
            description="¿Esta seguro de cerrar la sesión actual?"
          />
        )}
      </View>
    </View>
  );
}

TopCard.propTypes = {
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
