import React, { useEffect, useState } from 'react';
import {
  Button, TextBase, TopCard, Content, DatePicker, Picker,
} from 'components';
import {
  ScrollView, StyleSheet, View,
} from 'react-native';
import { Field, Formik } from 'formik';
import { withApi, withToast } from 'providers';
import * as Yup from 'yup';
import { endPoints, messages } from 'constantes';
import PropTypes from 'prop-types';
import moment from 'moment';
import { StorageService } from 'services';

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
  idToUpdate: null,
  medicinasList: [],
  calendar: null,
};

const validationSchema = Yup.object({
  desde: Yup.date().required('La fecha inicio es requerida'),
  hasta: Yup.date().required('La fecha fin es requerida'),
  periodisidad: Yup.number().required('La periodisidad es requerida'),
  medicina: Yup.string().required('La medicina es requerida'),
  cantidad: Yup.number().required('La cantidad de medicina es requerida'),
});

let initialValues = {
  desde: new Date(),
  hasta: new Date(),
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

  const loadMedicina = async () => {
    const userId = await StorageService.getValue('mediKitUsuarioId');
    const url = `${endPoints.app.medicine.base}/user/${userId}`;
    const resp = await doGet({ url });
    const medicinasList = resp.map((row) => ({ value: row.id, label: row.name }));
    setState((prevState) => ({ ...prevState, medicinasList }));
  };

  const findCalendar = async () => {
    const url = `${endPoints.app.calendar.base}/${id}`;
    const resp = await doGet({ url });
    initialValues = {
      desde: new Date(moment(resp.dateFrom)),
      hasta: new Date(moment(resp.dateTo)),
      periodisidad: resp.periodicity,
      medicina: resp.medicine,
      cantidad: resp.amount,
      observacion: resp.observation,
    };
    setState((prevState) => ({ ...prevState, calendar: resp }));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        loadMedicina();
        if (id) {
          findCalendar();
        }
      } catch (error) {
        appError(error.message ? error.message : messages.dataFetch.fail);
      }
    });

    return unsubscribe;
  }, []);

  const createData = async (values, subProps) => {
    try {
      const userId = await StorageService.getValue('mediKitUsuarioId');
      const url = endPoints.app.calendar.base;
      const data = {
        amount: values.cantidad,
        dateFrom: moment(values.desde).format('YYYY-MM-DD HH:mm:ss'),
        dateTo: moment(values.hasta).format('YYYY-MM-DD HH:mm:ss'),
        medicine: values.medicina,
        observation: values.observacion,
        periodicity: values.periodisidad,
        status: true,
      };

      if (id) {
        data.id = id;
        await doPut({ url, data });
        appInfo(messages.crud.update);
      } else {
        data.userId = userId;
        await doPost({ url, data });
        appSuccess(messages.crud.new);
      }
      subProps.resetForm();
      navigation.goBack();
    } catch (error) {
      appError(error.message ? error.message : messages.crud.fail);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <TopCard title={`${id ? 'Actualización' : 'Creación'} de calendario`} iconName="calendar-alt" />
      <Content style={{ paddingTop: 20 }}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={createData}
        >
          {({ handleSubmit, resetForm }) => (
            <View style={{ width: '100%' }}>
              <Field
                label="Fecha Inicio"
                name="desde"
                component={DatePicker}
                style={{ marginBottom: 10 }}
                disabled={!!id}
              />
              <Field
                label="Fecha Fin"
                name="hasta"
                component={DatePicker}
                style={{ marginBottom: 10 }}
              />
              <Field
                label="Periodisidad (Horas)"
                name="periodisidad"
                keyboardType="numeric"
                component={TextBase}
                style={{ marginBottom: 10 }}
              />
              <Field
                label="Seleccione una medicina"
                name="medicina"
                items={state.medicinasList}
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
                  onPress={() => {
                    initialValues = {
                      desde: new Date(),
                      hasta: new Date(),
                      periodisidad: '',
                      medicina: '',
                      cantidad: '',
                      observacion: '',
                    };
                    resetForm();
                    navigation.goBack();
                  }}
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
