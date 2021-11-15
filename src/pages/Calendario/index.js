import React, { useEffect, useState } from 'react';
import {
  Button, ConfirmModal, TopCard, Content,
} from 'components';
import {
  Image, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { withApi, withToast } from 'providers';
import { endPoints, messages } from 'constantes';
import PropTypes from 'prop-types';
import moment from 'moment';

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
  data: [],
};

function CalendarioList({
  appError, navigation, doGet, doDelete, appInfo,
}) {
  const [state, setState] = useState(initialState);

  const loadData = async () => {
    const url = `${endPoints.app.calendar.base}/user/f2d5fd9d-0ea2-4ab0-8f3a-97443b4e8def`;
    const resp = await doGet({ url });
    setState((prevState) => ({ ...prevState, data: resp }));
  };

  useEffect(() => {
    try {
      loadData();
    } catch (error) {
      appError(error.message ? error.message : messages.dataFetch.fail);
    }
  }, []);

  const deleteData = async () => {
    try {
      const url = `${endPoints.app.calendar.base}?calendarId=${state.idToDelete}`;

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
      <TopCard title="Calendario" iconName="calendar-alt" />
      <Content>
        <Button
          type="warning"
          text="Crear nuevo calendario"
          iconName="plus"
          onPress={() => navigation.navigate('CalendarioForm')}
        />
        {state.data.map((row, i) => (
          <View style={styles.card} key={String(i)}>
            <Image source={{ uri: row.picture }} style={styles.image} />
            <View style={styles.cardBody}>
              <View style={{ flex: 1 }}>
                <Text>{`Desde: ${moment(row.dateFrom).format('YYYY-MM-DD h:mm A')}`}</Text>
                <Text>{`Hasta: ${moment(row.dateTo).format('YYYY-MM-DD h:mm A')}`}</Text>
                <Text>{`Periodicidad: cada ${row.periodicity} horas`}</Text>
                <Text>{`Medicina: ${row.medicine}`}</Text>
                <Text>{`Cantidad: ${row.amount}`}</Text>
                <Text>{`Observación: ${row.observation}`}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button
                  text="Editar"
                  onPress={() => navigation.navigate('CalendarioForm', { id: row.id })}
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
    </ScrollView>
  );
}

CalendarioList.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  appError: PropTypes.func.isRequired,
  appInfo: PropTypes.func.isRequired,
  doGet: PropTypes.func.isRequired,
  doDelete: PropTypes.func.isRequired,
};

export default withToast(withApi(CalendarioList));
