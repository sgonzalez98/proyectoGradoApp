import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { TextBase, Button } from 'components';
import { withApi, withToast } from 'providers';
import { endPoints } from 'constantes';
import PropTypes from 'prop-types';
import { StorageService } from 'services';

const iconImage = require('../../assets/icon.png');

const { width, height } = Dimensions.get('window');
const validationSchema = Yup.object({
  user: Yup.string().required('El usuario es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardTop: {
    flex: 0.7,
    backgroundColor: '#0A99FF',
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 0.2 * height,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
  },
  cardBottom: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Login({
  navigation, appError, doGet,
}) {
  useEffect(async () => {
    const unsubscribe = await navigation.addListener('focus', async () => {
      try {
        const user = await StorageService.getValue('mediKitUsuarioId');
        if (user) {
          navigation.navigate('Drawer');
        }
      } catch (error) {
        appError(error.message || 'Error desconocido');
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const doLogin = async (values) => {
    try {
      const url = endPoints.app.user.login;
      const data = {
        password: values.password,
        username: values.user,
      };
      const resp = await doGet({ url, data });
      if (resp) {
        StorageService.setValue('mediKitUsuarioId', resp.id);
      }
      navigation.navigate('Drawer');
    } catch (error) {
      appError('Credenciales invalidas');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardTop}>
        <Image source={iconImage} style={styles.image} />
        <Text style={styles.title}>Control de Tratamientos Medicos</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#0A99FF' }} />
        <View style={styles.cardBottom}>
          <Formik
            initialValues={{ user: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={doLogin}
          >
            {({ handleSubmit, isSubmitting }) => (
              <View style={{ width: 0.9 * width }}>
                <Field
                  label="Usuario"
                  name="user"
                  component={TextBase}
                  disabled={isSubmitting}
                />
                <Field
                  label="Contraseña"
                  name="password"
                  component={TextBase}
                  secureTextEntry
                  disabled={isSubmitting}
                  style={{ marginTop: 10 }}
                />
                <Button
                  iconName="sign-in-alt"
                  text="Iniciar Sesión"
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  style={{ marginTop: 15 }}
                />
              </View>
            )}
          </Formik>
          <TouchableOpacity
            style={{ marginTop: 30 }}
            onPress={() => navigation.navigate('Register')}
          >
            <Text>No tienes una cuenta, Registrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

Login.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  appError: PropTypes.func.isRequired,
  doGet: PropTypes.func.isRequired,
};

export default withToast(withApi(Login));
