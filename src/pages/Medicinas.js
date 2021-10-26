import React, { useEffect, useState } from 'react';
import {
  Button, ConfirmModal, Modal, TextBase,
} from 'components';
import {
  Image, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Field, Formik } from 'formik';
import { withApi, withToast } from 'providers';
import * as Yup from 'yup';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  topcard: {
    height: 100,
    backgroundColor: '#0A99FF',
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  absotuleCard: {
    backgroundColor: '#0A99FF',
    top: 100,
    height: 50,
  },
  title: {
    color: 'white',
    fontSize: 26,
    marginLeft: 10,
  },
  titleIcon: {
    color: 'white',
    fontSize: 30,
    marginLeft: 20,
  },
  cards: {
    borderTopLeftRadius: 40,
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 15,
    alignItems: 'flex-end',
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

const data = [
  { label: 'Acetaminofen', cantidad: 100 },
  { label: 'Dolex Gripa', cantidad: 20 },
  { label: 'Dolex', cantidad: 50 },
  { label: 'Hierba Buena', cantidad: 70 },
];

const initialState = {
  showModalDelete: false,
  showModalForm: false,
};

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es requerido'),
  existencia: Yup.number().required('La existencia es requerida'),
});

function Medicinas(props) {
  useEffect(() => {
    props.appInfo('Mensaje de prueba');
  }, []);
  const [state, setState] = useState(initialState);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topcard}>
        <Icon name="capsules" style={styles.titleIcon} />
        <Text style={styles.title}>Inventario de medicinas</Text>
      </View>
      <View style={{ ...StyleSheet.absoluteFillObject, ...styles.absotuleCard }} />
      <View style={styles.cards}>
        <Button
          type="warning"
          text="Crear nueva medicina"
          iconName="plus"
          onPress={() => setState((prevState) => ({ ...prevState, showModalForm: true }))}
        />
        {data.map((row, i) => (
          <View style={styles.card} key={String(i)}>
            <Image source={{ uri: imageAdress }} style={styles.image} />
            <View style={styles.cardBody}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20 }}>{row.label}</Text>
                <Text>{`Existencia: ${row.cantidad}`}</Text>
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
      </View>
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
          onSubmit={() => {}}
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
