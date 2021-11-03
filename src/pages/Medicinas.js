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
  addButton: {
    position: 'absolute',
    top: -30,
    right: 40,
    backgroundColor: '#748c94',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
});

const imageAdress = 'https://png.pngtree.com/png-clipart/20200226/original/pngtree-medicines-red-medicine-drug-hospital-png-image_5320658.jpg';

const initialState = {
  showModalDelete: false,
  showModalForm: false,
  data: [],
};

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es requerido'),
  existencia: Yup.number().required('La existencia es requerida'),
});

function Medicinas({
  appError, navigation, doGet, doPost,
}) {

  const [state, setState] = useState(initialState);

  const loadData = async () => {
    const url = `${endPoints.app.medicine.base}/user/1`;
    const resp = await doGet({ url });
    setState((prevState) => ({ ...prevState, data: resp }));
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        loadData();
      } catch (error) {
        appError(error.message ? error.message : messages.crud.fail);
      }
    });

    return unsubscribe;
  }, []);

  const create = async(values, subProps) => {
    try {
      const url = endPoints.app.medicine.base;
      const data = {
        name: values.nombre,
        existence: values.existencia,
        picture: imageAdress,
        userId: 1,
      };

      await doPost({ url, data });
      setState((prevState) => ({ ...prevState, showModalForm: false}));
      loadData();
    } catch (error) {
      appError(error.message ? error.message : messages.crud.fail);
    }
  }



  return (
    <ScrollView style={styles.container}>
      <TopCard title="Inventario de medicinas" iconName="capsules" />
      <Content>
        <Button
          type="warning"
          text="Crear nueva medicina"
          iconName="plus"
          onPress={() => setState((prevState) => ({ ...prevState, showModalForm: true }))}
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
                  onPress={() => setState((prevState) => ({ ...prevState, showModalForm: true }))}
                  type="warning"
                  iconName="edit"
                  style={{ marginRight: 5 }}
                />
                <Button
                  text="Eliminar"
                  onPress={() => setState((prevState) => ({ ...prevState, showModalDelete: true }))}
                  type="danger"
                  iconName="trash"
                />
              </View>
            </View>
          </View>
        ))}
      </Content>
      {state.showModalDelete && (
        <ConfirmModal
          title="Eliminar Medicamento"
          description="¿Esta seguro de eliminar este medicamento?"
          onAccept={() => setState((prevState) => ({ ...prevState, showModalDelete: false }))}
          onCancel={() => setState((prevState) => ({ ...prevState, showModalDelete: false }))}
          labelAccept="Eliminar"
          labelCancel="Cancelar"
        />
      )}
      {state.showModalForm && (
      <Modal visible>
        <Text style={{ fontWeight: 'bold', margin: 5 }}>Creacion o actualizacion de medicinas</Text>
        <Formik
          enableReinitialize
          initialValues={{ nombre: '', existencia: '' }}
          validationSchema={validationSchema}
          onSubmit={create}
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

export default withToast(withApi(Medicinas));
