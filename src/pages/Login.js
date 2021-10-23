import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import {
  Dimensions,
  Image, StyleSheet, Text, View,
} from 'react-native';
import { TextBase, Button } from 'components';
import { useNavigation } from '@react-navigation/native';

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

export default function Login() {
  const navigation = useNavigation();

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
            onSubmit={() => navigation.navigate('Drawer')}
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
                  style={{ marginTop: 15 }}
                />
                <Button
                  iconName="sign-in-alt"
                  text="Iniciar Sesión"
                  onPress={handleSubmit}
                  // disabled={isSubmitting}
                  style={{ marginTop: 20 }}
                />
              </View>
            )}
          </Formik>
          {/* <div>Iconos diseñados por <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div> */}
        </View>
      </View>
    </View>
  );
}
