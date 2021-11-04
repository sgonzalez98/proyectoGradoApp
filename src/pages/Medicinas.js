import React, { useEffect, useState } from 'react';
import {
  Button, ConfirmModal, Modal, TextBase, TopCard, Content,
} from 'components';
import {
  Image, ScrollView, StyleSheet, Text, View,
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

const imageAdress = 'https://png.pngtree.com/png-clipart/20200226/original/pngtree-medicines-red-medicine-drug-hospital-png-image_5320658.jpg';

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

const initialValues = { nombre: '', existencia: '' };

function Medicinas({
  appError, navigation, doGet, doPost, doDelete, appSuccess, appInfo, doPut,
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

  const openFormModal = async (id = null) => {
    if (id) {
      try {
        const url = `${endPoints.app.medicine.base}/${id}`;
        const data = await doGet({ url });

        initialValues.existencia = data.existence;
        initialValues.nombre = data.name;
        setState((prevState) => ({ ...prevState, idToUpdate: id, showModalForm: true }));
      } catch (error) {
        appError(error.message ? error.message : messages.crud.fail);
      }
    } else {
      setState((prevState) => ({ ...prevState, showModalForm: true }));
    }
  };

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
        data.picture = imageAdress;
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

  const deleteData = async () => {
    try {
      const url = `${endPoints.app.medicine.base}?medicineId=${state.idToDelete}`;

      await doDelete({ url });
      appInfo(messages.crud.delete);
      setState((prevState) => ({ ...prevState, idToDelete: null }));
      loadData();
    } catch (error) {
      appError(error.message ? error.message : messages.crud.fail);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TopCard title="Inventario de medicinas" iconName="capsules" />
      <Content>
        <Button
          type="warning"
          text="Crear nueva medicina"
          iconName="plus"
          onPress={() => openFormModal()}
        />
        {state.data.map((row, i) => (
          <View style={styles.card} key={String(i)}>
            <Image source={{ uri: row.picture }} style={styles.image} />
            <View style={styles.cardBody}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20 }}>{row.name}</Text>
                <Text>{`Existencia: ${row.existence}`}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button
                  text="Editar"
                  onPress={() => openFormModal(row.id)}
                  type="warning"
                  iconName="edit"
                  style={{ marginRight: 5 }}
                />
                <Button
                  text="Eliminar"
                  onPress={() => setState((prevState) => ({ ...prevState, idToDelete: row.id }))}
                  type="danger"
                  iconName="trash"
                />
              </View>
            </View>
          </View>
        ))}
      </Content>
      {Boolean(state.idToDelete) && (
        <ConfirmModal
          title="Eliminar Medicamento"
          description="¿Esta seguro de eliminar este medicamento?"
          onAccept={deleteData}
          onCancel={() => setState((prevState) => ({ ...prevState, idToDelete: null }))}
          labelAccept="Eliminar"
          labelCancel="Cancelar"
        />
      )}
      {state.showModalForm && (
      <Modal visible>
        <Text style={styles.titleForm}>{`${state.idToUpdate ? 'Actualización' : 'Creación'} de medicinas`}</Text>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={createData}
        >
          {({ handleSubmit }) => (
            <View style={{ width: '100%' }}>
              <Field
                label="Nombre"
                name="nombre"
                component={TextBase}
                style={{ marginBottom: 10 }}
              />
              <Field
                label="Existencia"
                name="existencia"
                keyboardType="numeric"
                component={TextBase}
                style={{ marginBottom: 10 }}
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
      </Modal>
      )}
    </ScrollView>
  );
}

Medicinas.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  appError: PropTypes.func.isRequired,
  appInfo: PropTypes.func.isRequired,
  doGet: PropTypes.func.isRequired,
  doPost: PropTypes.func.isRequired,
  doDelete: PropTypes.func.isRequired,
  appSuccess: PropTypes.func.isRequired,
  doPut: PropTypes.func.isRequired,
};

export default withToast(withApi(Medicinas));
