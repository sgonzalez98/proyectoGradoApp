import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import {
  ScrollView, StyleSheet, View,
} from 'react-native';
import {
  TextBase, Button, DatePicker, Picker, Content, TopCard,
} from 'components';
import { useNavigation } from '@react-navigation/native';
import { endPoints, messages } from 'constantes';
import moment from 'moment';
import { withApi, withToast } from 'providers';
import PropTypes from 'prop-types';

const initialValues = {
  fechaNacimiento: new Date(),
  telefono: '',
  nombre: '',
  clave: '',
  rol: 'Paciente',
  usuario: '',
};

const roles = [
  { value: 'PATIENT', label: 'Paciente' },
  { value: 'RESPONSIBLE', label: 'Responsable' },
];

const validationSchema = Yup.object({
  fechaNacimiento: Yup.date().required('La fecha es requerida'),
  telefono: Yup.number().required('El telefono es requerido'),
  nombre: Yup.string().required('El nombre es requerido'),
  usuario: Yup.string().required('El usuario es requerido'),
  clave: Yup.string().required('la clave es requerida'),
  rol: Yup.string().required('El rol es requerido'),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});

function Register({ doPost, appSuccess, appError }) {
  const navigation = useNavigation();

  const submitData = async (values) => {
    try {
      const url = endPoints.app.user.base;
      const data = {
        birthDate: moment(values.fechaNacimiento).format('YYYY-MM-DD HH:mm:ss'),
        cellphone: values.telefono,
        name: values.nombre,
        password: values.clave,
        role: values.rol,
        username: values.usuario,
      };

      await doPost({ url, data });
      appSuccess(messages.crud.new);
      navigation.goBack();
    } catch (error) {
      appError(error.message ? error.message : messages.crud.fail);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <TopCard title="Registro de usuarios" iconName="address-card" />
      <Content>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitData}
        >
          {({ handleSubmit, isSubmitting }) => (
            <View style={{ width: '100%' }}>
              <Field
                label="Fecha de nacimiento"
                name="fechaNacimiento"
                component={DatePicker}
              />
              <Field
                label="Telefono celular"
                name="telefono"
                component={TextBase}
                keyboardType="numeric"
                disabled={isSubmitting}
                style={{ marginTop: 10 }}
              />
              <Field
                label="Nombre"
                name="nombre"
                component={TextBase}
                style={{ marginTop: 10 }}
              />
              <Field
                label="Clave"
                name="clave"
                component={TextBase}
                secureTextEntry
                style={{ marginTop: 10 }}
              />
              <Field
                label="Usuario"
                name="usuario"
                component={TextBase}
                style={{ marginTop: 10 }}
              />
              <Field
                label="Seleccione un rol"
                name="rol"
                component={Picker}
                items={roles}
                style={{ marginTop: 10 }}
              />
              <Button
                iconName="sign-in-alt"
                text="Registrar"
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={{ marginTop: 15 }}
              />
            </View>
          )}
        </Formik>
      </Content>
    </ScrollView>
  );
}

Register.propTypes = {
  appError: PropTypes.func.isRequired,
  doPost: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
};

export default withToast(withApi(Register));
