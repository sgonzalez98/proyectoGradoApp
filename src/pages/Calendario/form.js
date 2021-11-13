import React, { useEffect, useState } from 'react';
import {
  Button, TextBase, TopCard, Content, DatePicker, Picker,
} from 'components';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { Field, Formik } from 'formik';
import { withApi, withToast } from 'providers';
import * as Yup from 'yup';
import { endPoints } from 'constants';
import messages from 'constants/messages';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  card: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 15,
    flexDirection: 'row',
    shadowColor: '#7F5DF0',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  cardBody: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  titleForm: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
    marginBottom: 20,
  },
});

const initialState = {
  idToDelete: null,
  idToUpdate: null,
  showModalForm: false,
  data: [],
};

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es requerido'),
  existencia: Yup.number().required('La existencia es requerida'),
});

const initialValues = {
  desde: '',
  hasta: '',
  periodisidad: '',
  medicina: '',
  cantidad: '',
  observacion: '',
};

function CalendarioForm({
  appError, navigation, doGet, doPost, appSuccess, appInfo, doPut,
  route: { params: { id = null } = {} },
}) {
  const [state, setState] = useState(initialState);

  const loadData = async () => {
    const url = `${endPoints.app.medicine.base}/user/1`;
    const resp = await doGet({ url });
    setState((prevState) => ({ ...prevState, data: resp }));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        loadData();
      } catch (error) {
        appError(error.message ? error.message : messages.dataFetch.fail);
      }
    });

    return unsubscribe;
  }, []);

  const createData = async (values) => {
    try {
      const url = endPoints.app.medicine.base;
      const data = {
        name: values.nombre,
        existence: values.existencia,
      };

      if (state.idToUpdate) {
        data.id = state.idToUpdate;

        await doPut({ url, data });
        appInfo(messages.crud.update);
      } else {
        data.userId = 1;

        await doPost({ url, data });
        appSuccess(messages.crud.new);
      }

      setState((prevState) => ({ ...prevState, idToUpdate: null, showModalForm: false }));
      loadData();
    } catch (error) {
      appError(error.message ? error.message : messages.crud.fail);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TopCard title="Creacion de calendario" iconName="calendar-alt" />
      <Content>
        <Text style={styles.titleForm}>{`${id ? 'Actualización' : 'Creación'} de medicinas`}</Text>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={createData}
        >
          {({ handleSubmit }) => (
            <View style={{ width: '100%' }}>
              <DatePicker label="Desde" />
              <DatePicker label="Hasta" />
              <Field
                label="Periodisidad"
                name="periodisidad"
                keyboardType="numeric"
                component={TextBase}
                style={{ marginBottom: 10 }}
              />
              <Field
                label="Medicina"
                name="medicina"
                items={[]}
                component={Picker}
                style={{ marginBottom: 10 }}
              />
              <Field
                label="Cantidad medicina"
                name="cantidad"
                keyboardType="numeric"
                component={TextBase}
                style={{ marginBottom: 10 }}
              />
              <Field
                label="Observacion"
                name="observacion"
                component={TextBase}
                style={{ marginBottom: 10 }}
                multiline
                numberOfLines={3}
              />
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginTop: 10,
              }}
              >
                <Button
                  type="warning"
                  text="Cancelar"
                  iconName="exclamation-triangle"
                  style={{ width: '45%', borderRadius: 10 }}
                  onPress={() => setState((prevState) => (
                    { ...prevState, showModalForm: false }))}
                />
                <Button
                  text="Guardar"
                  iconName="save"
                  style={{ width: '45%', borderRadius: 10 }}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </Content>
    </ScrollView>
  );
}

CalendarioForm.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  route: PropTypes.oneOfType([PropTypes.object]).isRequired,
  appError: PropTypes.func.isRequired,
  appInfo: PropTypes.func.isRequired,
  doGet: PropTypes.func.isRequired,
  doPost: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  doPut: PropTypes.func.isRequired,
};

export default withToast(withApi(CalendarioForm));
